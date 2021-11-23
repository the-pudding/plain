<script>
  import { annotate } from "rough-notation";
  import inView from "$actions/inView.js";
  import { onMount } from "svelte";

  export let data;
  export let pen = false;
  export let toggle = null;

  let mounted = false;
  const before = data.before;
  const after = data.after;
  let boxAnno;
  let underlineAnno;
  let bracketAnno;

  $: toggle, redraw();
  const redraw = () => {
    hideAnnotations();
    showAnnotations();
  };

  onMount(() => {
    mounted = true;
    const boxEl = document.querySelector("span.box");
    boxAnno = annotate(boxEl, { type: "box", color: "red", animate: true });
    const underlineEl = document.querySelector("span.underline");
    underlineAnno = annotate(underlineEl, { type: "underline", color: "red", animate: true });
    const bracketEl = document.querySelector(".bracket");
    bracketAnno = annotate(bracketEl, { type: "bracket", color: "red", animate: true });
  });

  const showAnnotations = () => {
    if (mounted && pen) {
      boxAnno.show();
      underlineAnno.show();
      bracketAnno.show();
    }
  };
  const hideAnnotations = () => {
    if (mounted && pen) {
      boxAnno.hide();
      underlineAnno.hide();
      bracketAnno.hide();
    }
  };
</script>

<div class="container" use:inView on:enter={showAnnotations} on:exit={hideAnnotations}>
  <div class="before">
    <h3>ORIGINAL</h3>
    <p class:fade={pen}>{@html before}</p>
  </div>
  <div class="after">
    <h3>PLAIN LANGUAGE</h3>
    {#each after as { type, value }}
      {#if type === "text"}
        <p class:fade={pen}>{@html value}</p>
      {:else if type === "list"}
        <ul class:bracket={pen} class:fade={pen}>
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
    margin-top: 4em;
    margin-bottom: 4em;
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
  :global(span) {
    color: rgba(40, 40, 40, 1);
  }
  .fade {
    color: rgba(40, 40, 40, 0.4);
  }
</style>
