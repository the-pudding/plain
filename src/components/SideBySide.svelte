<script>
  import { annotate } from "rough-notation";
  import inView from "$actions/inView.js";
  import { onMount } from "svelte";
  import { geoOrthographic } from "d3-geo";

  export let data;
  export let pen = false;
  export let toggle = null;
  export let menu = false;

  let mounted = false;
  const { name, before, after } = data;
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
    if (pen) {
      const boxEl = document.querySelector(`span#box-${name}`);
      boxAnno = annotate(boxEl, { type: "box", color: "red", animate: true });
      const underlineEl = document.querySelector(`span#underline-${name}`);
      underlineAnno = annotate(underlineEl, { type: "underline", color: "red", animate: true });
      const bracketEl = document.querySelector(`#${name} .bracket`);
      bracketAnno = annotate(bracketEl, { type: "bracket", color: "red", animate: true });
    }
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
      if (boxAnno.isShowing()) boxAnno.hide();
      if (underlineAnno.isShowing()) underlineAnno.hide();
      if (bracketAnno.isShowing()) bracketAnno.hide();
    }
  };
</script>

<div class="container" id={name} use:inView on:enter={showAnnotations} on:exit={hideAnnotations}>
  <div class="before">
    <h3>ORIGINAL</h3>
    <p class:fade={pen}>{@html before}</p>
  </div>
  <div class="after">
    <h3>PLAIN LANGUAGE</h3>
    {#if typeof after === "string"}
      <p class:fade={pen}>{@html after}</p>
    {:else}
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
    {/if}
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
