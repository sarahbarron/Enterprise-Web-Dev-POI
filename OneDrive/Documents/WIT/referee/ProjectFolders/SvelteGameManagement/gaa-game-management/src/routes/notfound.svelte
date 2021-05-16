<script lang="ts">
    export let params = { msg: "" };
</script>

<h1>404</h1>
<p>Not found</p>
<p>
    {params.msg || "The page you were looking for was not found."}<br />
    <a href="/">Home</a>
</p>
<p>Hello world</p>
