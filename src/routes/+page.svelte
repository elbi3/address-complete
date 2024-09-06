<script>
    import { enhance } from '$app/forms';
    // export let data;
    let name = "Get & Check Address";
    let src = "then-logo.png";
    export let form;
    console.log("form ? ", form);
</script>

<div class="body">
    <header>
        <img src={src} alt="{src} is a yellow square with the text 'then' in the lower right corner" />
        <h1>{name}</h1>
    </header>
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
            <h2>data returned from the request</h2>
            <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </ul>
        </div>
        {#if form?.success}
            <p>Successfully submitted!</p>
        {/if}
    </main>
    <footer>

    </footer>
</div>
