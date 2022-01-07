<script>
  export let text;
</script>

<div>
  <h3>Author's note</h3>

  {#each text as { value }}
    <p>{@html value}</p>
  {/each}
</div>

<style>
  div {
    width: var(--column-width);
    margin: auto;
    margin-top: 3em;
  }
</style>
