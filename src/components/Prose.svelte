<script>
  export let data;
</script>

<div>
  {#each data as { type, value }}
    {#if type === "text"}
      <p>{@html value}</p>
    {:else if type === "list"}
      <ul>
        {#each value as v}
          <li>{@html v}</li>
        {/each}
      </ul>
    {/if}
  {/each}
</div>

<style>
  div {
    max-width: 30em;
    margin: 0 auto;
  }

  ul {
    padding-left: 1em;
  }

  figure {
    height: 25vh;
    background: aquamarine;
  }
</style>
