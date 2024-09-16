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

<<<<<<< HEAD
<div class="main-container">
    <Header />
    <main class="main-content">
=======
<div class="main-container">
    <Header />
    <main class="main-content">
>>>>>>> 3604cc0 (Cleanup files)
        {#if form?.error}
        <p>{form.error}</p>
        {/if}
        <form class="my-form" method="POST" use:enhance>
            <div class="input-cont">
                <label for="streetAddress">Street Address: </label>
                <input type="text" name="street" value={form?.street ?? ''} id="streetAddress" required>
                <input type="text" name="street" value={form?.street ?? ''} id="streetAddress" required>
            </div>
            <!-- <div class="input-submit">
                <button type="submit">Get</button>
            </div> -->
        </form>
        <div>
<<<<<<< HEAD
            <h2>data returned from the request</h2>
=======
            {#if displayAddressString}
                <h2>Formatted Address:</h2>
                <p>{displayAddressString}</p>
            {/if}
            <!-- {#if displayAddressComponents}
>>>>>>> 3604cc0 (Cleanup files)
            <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </ul>
<<<<<<< HEAD
        </div>
        {#if form?.success}
            <p>Successfully submitted!</p>
        {/if}
=======
            {/if} -->
            <!-- keeping this^ for reference -->
        </div>

>>>>>>> 3604cc0 (Cleanup files)
    </main>
    <footer>

    </footer>
</div>
<<<<<<< HEAD
=======

<style>
    @import "../style.css";
    .main-container {
        color: darkblue;
        display: grid;
        gap: 3rem;
    }
    .main-content{
        display: grid;
        gap: 1rem;
        justify-content: center;
    }
    .my-form {
        display: grid;
        gap: 1rem;
    }

    input {
        background-color: aliceblue;
        border-radius: .1rem;
        padding: .3rem;
    }
    .input-submit > * {
        align-self: center;
        background-color: rgb(222, 197, 233);
        cursor: pointer;
        padding: .3rem;
    }  

    .input-submit > *:hover {
        background-color: pink;
    }
</style>
>>>>>>> 3604cc0 (Cleanup files)

<style>
    @import "../style.css";
    .main-container {
        color: darkblue;
        display: grid;
        gap: 3rem;
    }
    .main-content{
        display: grid;
        gap: 1rem;
        justify-content: center;
    }
    .my-form {
        display: grid;
        gap: 1rem;
    }

    input {
        background-color: aliceblue;
        border-radius: .1rem;
        padding: .3rem;
    }
    .input-submit > * {
        align-self: center;
        background-color: rgb(222, 197, 233);
        cursor: pointer;
        padding: .3rem;
    }  

    .input-submit > *:hover {
        background-color: pink;
    }
</style>

<style>
    @import "../style.css";
    .main-container {
        color: darkblue;
        display: grid;
        gap: 3rem;
    }
    .main-content{
        padding: .3rem;
        display: grid;
        gap: 1rem;
        justify-content: center;
    }
    .my-form {
        display: grid;
        gap: 1rem;
    }

    input {
        background-color: aliceblue;
        border-radius: .1rem;
        padding: .3rem;
    }
    .input-submit > * {
        align-self: center;
        background-color: rgb(222, 197, 233);
        cursor: pointer;
        padding: .3rem;
    }  

    .input-submit > *:hover {
        background-color: pink;
    }
</style>