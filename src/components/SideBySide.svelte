<script>
  import { annotate, annotationGroup } from "rough-notation";
  import inView from "$actions/inView.js";
  import { onMount } from "svelte";
  import { selectAll, select } from "d3";

  export let data;
  export let pen = false;
  export let toggle = null;
  export let menu = false;

  let mounted = false;
  const { name, before, after, steps } = data;
  let annotations = [];

  $: toggle, redraw();
  const redraw = () => {
    hideAnnotations();
    showAnnotations();
  };

  onMount(() => {
    if (pen) {
      initAnnotations(["box", "underline"]);
    }
    mounted = true;
  });
  const initAnnotations = (types) => {
    let annos = [];
    types.forEach((type) => {
      const els = document.querySelectorAll(`span#${type}-${name}`);
      selectAll(els).classed("pen", true);

      els.forEach((el) => {
        const anno = annotate(el, { type, color: "red", animate: true });
        annos.push(anno);
      });
    });

    // bracket for list
    const bracketEl = document.querySelector(`#${name} ul`);
    select(bracketEl).classed("pen", true);
    const bracketAnno = annotate(bracketEl, { type: "bracket", color: "red", animate: true });
    annos.push(bracketAnno);

    annotations = annotationGroup(annos);
  };

  const showAnnotations = () => {
    if (mounted && pen) {
      annotations.show();
    }
  };
  const hideAnnotations = () => {
    if (mounted && pen) {
      annotations.hide();
    }
  };
</script>

<div class="container" id={name} use:inView on:enter={showAnnotations} on:exit={hideAnnotations}>
  {#if menu && steps}
    <div class="buttons">
      {#each steps as step}
        <button>{step.title}</button>
      {/each}
    </div>
  {/if}
  <div class="texts">
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
    max-width: 30em;
    margin: 0 auto;
    margin-top: 4em;
    margin-bottom: 4em;
    display: flex;
    flex-direction: column;
    font-size: 16px;
  }
  .buttons {
    margin-bottom: 1em;
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
    background: var(--color-tan);
    margin-right: 15px;
  }
  .after {
    background: var(--color-orange);
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
  :global(.pen) {
    color: rgba(40, 40, 40, 1) !important;
  }
  .fade {
    color: rgba(40, 40, 40, 0.4);
  }
</style>
