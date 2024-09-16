<script>
    let name = "Get & Check Address";
    let src = "favicon.png";
</script>

<header class="site-header">
    <img class="svelte-icon" {src} alt="{src} is a yellow square with the text 'then' in the lower right corner" />
    <h1 class="site-title">{name}</h1>
</header>

<style>
    .site-header {
        align-items: flex-end;
        background-color: rgb(47, 47, 107);      
        color: rgb(205, 185, 241);
        display: flex;
    }
    .site-title {
        padding-left: 1rem;
    }
    .site-header > * {
        background-color: rgb(47, 47, 107);
    }

    .svelte-icon {
        align-self: center;
        padding: .5rem;
        max-height: 4rem;
    }
</style>