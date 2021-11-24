<script>
  import { annotate, annotationGroup } from "rough-notation";
  import inView from "$actions/inView.js";
  import ButtonSet from "$components/helpers/ButtonSet.svelte";
  import { onMount } from "svelte";
  import { selectAll, select, range } from "d3";

  export let data;
  export let pen = false;
  export let toggle = null;
  export let menu = false;

  let mounted = false;
  let step = 0;
  const { name, before, after, steps } = data;
  let annotations = [];
  const annotationTypes = ["box", "strike-through", "underline", "highlight"];
  const annotationSpecs = { color: "red", animate: true, multiline: true };
  const buttonSetOptions = steps
    ? range(steps.length).map((i) => ({ value: i, label: steps[i].title }))
    : null;

  $: step, advanceStep();
  const advanceStep = () => {
    if (mounted) {
      hideAnnotations();

      // transfer fade
      annotationTypes.forEach((type) => {
        const els = document.querySelectorAll(`[id^=${type}-${name}]`);
        selectAll(els).classed("pen", false);
      });

      initAnnotations();
      showAnnotations();
    }
  };

  $: toggle, redraw();
  const redraw = () => {
    hideAnnotations();
    showAnnotations();
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

  onMount(() => {
    if (pen) {
      initAnnotations();
    }
    mounted = true;
  });
  const initAnnotations = () => {
    let annos = [];
    if (!menu) {
      annotationTypes.forEach((type) => {
        const els = document.querySelectorAll(`span#${type}-${name}`);
        selectAll(els).classed("pen", true);

        els.forEach((el) => {
          const anno = annotate(el, { type, ...annotationSpecs });
          annos.push(anno);
        });
      });

      // bracket for list
      const bracketEl = document.querySelector(`#${name} ul`);
      if (bracketEl) {
        select(bracketEl).classed("pen", true);
        const bracketAnno = annotate(bracketEl, { type: "bracket", color: "red", animate: true });
        annos.push(bracketAnno);
      }
    } else {
      annotationTypes.forEach((type) => {
        const els = document.querySelectorAll(`span#${type}-${name}-${step}`);
        selectAll(els).classed("pen", true);

        els.forEach((el) => {
          const anno = annotate(el, { type, ...annotationSpecs });
          annos.push(anno);
        });
      });
    }
    annotations = annotationGroup(annos);
  };
</script>

<div class="container" id={name} use:inView on:enter={showAnnotations} on:exit={hideAnnotations}>
  {#if menu && buttonSetOptions}
    <div class="buttons">
      <ButtonSet options={buttonSetOptions} bind:value={step} />
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

  {#if steps}<div class="description">{steps[step].description}</div> {/if}
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
  .description {
    color: var(--color-gray-dark);
    font-style: italic;
  }
</style>
