<script>
  export let text;

  const before = text[0].before;
  const after = text[0].after;
</script>

<div class="container">
  <div class="before">
    <h3>ORIGINAL</h3>
    <p>{@html before}</p>
  </div>
  <div class="after">
    <h3>PLAIN LANGUAGE</h3>
    {#each after as { type, value }}
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
</div>

<style>
  .container {
    max-width: 30em;
    margin: 0 auto;
    display: flex;
    font-size: 16px;
  }
  .before,
  .after {
    padding: 20px;
    flex: 1;
  }
  .before {
    background: #f4e7d7;
    margin-right: 15px;
  }
  .after {
    background: #f6c672;
  }
  ul {
    padding-left: 20px;
  }
  p {
    margin: 0;
  }
  h3 {
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
</style>
