<script>
  import _ from "lodash";
  import Prose from "$components/Prose.svelte";
  import Graphic from "$components/Graphic.svelte";

  export let part;
  export let chunks;
  export let title;
</script>

<section id="part-{part}">
  <h2>{title}</h2>
  {#each chunks as { standard, plain, graphic, deepDive, subchunks, description, subtitle }, i}
    {#if deepDive}
      <details>
        <summary>{description}</summary>
        {#each subchunks as subchunk}
          <Prose standard={subchunk.standard} plain={subchunk.plain} />
        {/each}
      </details>
    {:else}
      <Prose {standard} {plain} {subtitle} />
    {/if}

    {#if graphic}
      <Graphic {graphic} />
    {/if}
  {/each}
</section>

<style>
  section {
    max-width: 80rem;
    margin: 0 auto;
  }

  summary {
    transform: translate(20%, 0%);
    width: 30em;
    font-weight: bold;
  }
  summary:hover {
    cursor: pointer;
  }
  h2 {
    max-width: var(--column-width);
    margin: 0 auto;
  }
</style>
