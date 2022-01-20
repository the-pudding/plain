<script>
  export let text;
</script>

<div>
  <h3>Authors' note</h3>

  {#each text as { type, value }}
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
    width: var(--column-width);
    margin: auto;
    margin-top: 3em;
  }
</style>
