

access Autocomplete class (`google.maps.places.Autocomplete`) by calling:
```JavaScript
const {Autocomplete} = await google.maps.importLibrary("places");
```
class details: https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete

1. where are we loading the library?
To use the functionality contained in this library, first load it in the `svelte:head` special element using the `libraries` parameter in the Maps API bootstrap URL 
<script async
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&libraries=places&callback=initMap">
</script>
2. where are we initializing the class?

How do I load the Maps library if it is loaded in the svelte:head element but I need to use my apikey from .env on the server?
(seems like people are not loading it in svelte:head)

https://mapsplatform.google.com/resources/blog/more-control-loading-maps-javascript-api/

wrapper for loading googlemaps:
`npm i @googlemaps/js-api-loader`
+ Ts: `npm i -D @types/google.maps`




https://www.reddit.com/r/sveltejs/comments/1bc0vuc/comment/lfnafld/?utm_name=web3xcss

https://stackoverflow.com/questions/74806073/google-api-autocomplete-in-sveltekit/75575241#75575241

# Walkthrough
To use the pre-built autocomplete widget for Google Places Autocomplete in SvelteKit:

1. Instead of placing the script inside of a `svelte:head` element, use the [JavaScript API Loader](https://github.com/googlemaps/js-api-loader)
`npm i @googlemaps/js-api-loader`
`npm i -D @types/google.maps` for TS

2. In `+page.svelte` use `onMount` to load it with the wrapper js-api-loader
```javascript
import { onMount } from 'svelte';
import { Loader } from "@googlemaps/js-api-loader";
```

3. for this error:

  "[vite] Named export 'Loader' not found. The requested module '@googlemaps/js-api-loader' is a CommonJS module, which may not support all module.exports as named exports.
  CommonJS modules can always be imported via the default export, for example using:

  import pkg from '@googlemaps/js-api-loader';
  const {Loader} = pkg;"

change the `vite.config.js` file to:
```javascript
export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@googlemaps/js-api-loader'],
	}
});
```

4. Public access to api key for client-side
Svelte explanation of .env variables: https://osterman.io/content/how-to-use-environment-variables-in-sveltekit-processenv/

prefix the api key with "PUBLIC_" in the .env file and import it from `$env/static/public`

5. warning on `loader.loadCallback`
  The signature '(fn: (e: ErrorEvent) => void): void' of 'loader.loadCallback' is deprecated.js(6387)
  Load the Google Maps JavaScript API script with a callback.
  @deprecated — , use importLibrary() instead.

6. Order of Events:
  1. Autocomplete widget creates a text input field on your web page
  2. it supplies predictions of places in a UI pick list
  3. it returns place details in response to a `getPlace()` request

```javascript
//initialize and add autocomplete
async function initAutocomplete() {
  //request needed library
  const { Autocomplete } = await google.maps.importLibrary("places");
}
```
```javascript
//initialize autocomplete instance reference and options parameter
let autocomplete;
const options = {
  componentRestrictions: { country: 'us' },
  strictBounds: false
};

async function initAutocomplete() {
  //request needed library
  const { Autocomplete } = await google.maps.importLibrary("places");
  //new instance with input field ref and options
  autocomplete = Autocomplete(document.getElementById('autocomplete'), options);
  //use inherited addListener(eventname, handler) method on the instance
  //use 'place_changed' event from Autocomplete class documentation
  autocomplete.addListener('place_changed', listenerFunc);
}
```
```javascript
  //implement listenerFunc which calls getPlace() method on Autocomplete class
  function listenerFunc() {
    address = autocomplete.getPlace();
    let result = JSON.stringify(address);
    console.log("returned address: ", result);
  }
```
add Loader implementation from the wrapper

`Autocomplete` constructor takes 2 args: HTML `input` element of type `text`, and optional `AutocompleteOptions` argument
Todo:: add constraints to auto-complete for Seattle-specific results (better user experience!)
[google.maps.places.Autocomplete](https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete)
[google.maps.places.PlaceResult](https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult)


## Thank you:
https://stackoverflow.com/questions/74806073/google-api-autocomplete-in-sveltekit/75575241#75575241

https://www.reddit.com/r/sveltejs/comments/1bc0vuc/comment/lfnafld/?utm_name=web3xcss

https://github.com/googlemaps/js-api-loader/issues/482


Questions for Maeve:
do we want to ask for particular results using setFields() ?
https://developers.google.com/maps/documentation/javascript/reference/places-widget#Autocomplete.setFields