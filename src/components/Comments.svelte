<script>
  import { onMount } from "svelte";

  export let data;

  const { before, after } = data;
  let step = null;
  $: description = step !== null ? data.steps[step].description : null;

  $: console.log({ step, data });

  onMount(() => {
    const highlights = document
      .querySelectorAll(".translation-step")
      .forEach((d) => d.addEventListener("click", onClick));
  });

  const onClick = (e) => {
    const num = e.target.id.replace(/^\D+/g, "");
    step = parseInt(num);
  };
</script>

<div class="container">
  <div class="tooltip" class:view-tooltip={step !== null}>{description}</div>
  <div class="texts">
    <div class="before">
      <h3>ORIGINAL</h3>
      <p>{@html before}</p>
    </div>
    <div class="after">
      <h3>PLAIN LANGUAGE</h3>
      {#if typeof after === "string"}
        <p>{@html after}</p>
      {:else}
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
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: var(--column-width);
    margin: 0 auto;
    margin-top: 4em;
    margin-bottom: 4em;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    position: relative;
  }
  .tooltip {
    display: none;
    position: absolute;
    width: 70%;
    top: 50%;
    left: 15%;
    border: 1px solid lightgrey;
    background: white;
    padding: 20px;
  }
  .view-tooltip {
    display: block;
  }
  .texts {
    display: flex;
  }
  .before,
  .after {
    padding: 20px;
    flex: 1;
  }
  .before {
    /* background: var(--color-tan); */
    border: 1px solid lightgrey;
    margin-right: 15px;
  }
  .after {
    border: 1px solid lightgrey;
    /* background: var(--color-orange); */
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
  .description {
    color: var(--color-gray-dark);
    font-style: italic;
    margin-top: 1em;
  }
  :global(.translation-step) {
    background: rgb(245, 232, 177);
  }
</style>
