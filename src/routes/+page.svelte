<script>
    import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
    import { enhance } from '$app/forms';
    import Header from './Header.svelte';

    import { onMount } from 'svelte';
    import { Loader } from "@googlemaps/js-api-loader";

    // export let data;
    export let form;

    console.log("form ? ", form);


    let autocomplete;
    let address;
    let displayAddressString;
    let displayAddressComponents;
    const options = {
        componentRestrictions: { country: 'us' },
        strictBounds: false
    };

    const loader = new Loader({
            apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
            version: "weekly",
            libraries: ["places"] 
    });
    
onMount(async () => {
    initAutocomplete();
})

async function initAutocomplete() {
    try {
        loader
            .importLibrary("places")
            .then(({Autocomplete}) => {
                autocomplete = new Autocomplete(document.getElementById('streetAddress'), options);
                autocomplete.addListener('place_changed', listenerFunc);
            })
            .catch((e) => {
                console.log("e: ", e);
            });
    } catch (error) {
        console.error("error occured: ", error.message);
    }

  function listenerFunc() {
    address = autocomplete.getPlace();
    let result = JSON.stringify(address);
    let { address_components, formatted_address, photos } = address;
    displayAddressString = formatted_address;
    displayAddressComponents = address_components;
    console.log("photos: ", photos);
    console.log("formatted_address: ", formatted_address);
    console.log("address_components: ", address_components);
    // console.log("returned address: ", result);
  }
}

</script>

<div class="main-container">
    <Header />
    <main>
        {#if form?.error}
        <p>{form.error}</p>
        {/if}
        <form class="my-form" method="POST" use:enhance>
            <div class="input-cont">
                <label for="streetAddress">Street Address: </label>
                <input type="text" name="street" value={form?.street ?? ''} id="streetAddress">
            </div>
            <div class="input-cont">
                <label for="myLocality">City</label>
                <input type="text" name="locality" value={form?.locality ?? ''} id="myLocality">
            </div>
            <div class="input-cont">
                <label for="myRegion">Country</label>
                <input type="text" name="region" value={form?.region ?? ''} id="myRegion">
            </div>
            <div class="input-submit">
                <button type="submit">Get</button>
            </div>
        </form>
        <div>
            {#if displayAddressString}
                <h2>Formatted Address:</h2>
                <p>{displayAddressString}</p>
            {/if}
            {#if displayAddressComponents}
            <ul>
                <h2>Address Components:</h2>
                {#each displayAddressComponents as component}
                    <br>
                    <li>"{component.short_name}"</li>
                    <p>is a kind of: </p>
                    <p>"{component.types}"</p>
                {/each}
            </ul>
            {/if}
        </div>
        {#if form?.success}
            <p>Successfully submitted!</p>
        {/if}

    </main>
    <footer>

    </footer>
</div>

<style>
    @import "../style.css";
    .main-container {
        display: grid;
        gap: 3rem;
    }
</style>