<script>
  import _ from "lodash";
  import Prose from "$components/Prose.svelte";
  import Graphic from "$components/Graphic.svelte";

  export let part;
  export let chunks;
  export let title;

  let deepDiveOpen = false;
</script>

<section id="part-{part}">
  {#if title} <h2>{title}</h2> {/if}
  {#each chunks as { standard, plain, graphic, deepDive, subchunks, description, subtitle }, i}
    {#if graphic}
      <Graphic {graphic} />
    {:else if deepDive}
      <details on:click={() => (deepDiveOpen = !deepDiveOpen)}>
        <summary>{description}</summary>
        {#each subchunks as subchunk}
          <Prose
            standard={subchunk.standard}
            plain={subchunk.plain}
            deepDive={true}
            {deepDiveOpen}
          />
        {/each}
      </details>
    {:else}
      <Prose {standard} {plain} {subtitle} />
    {/if}
  {/each}
</section>

<style>
  section {
    max-width: 80rem;
    margin: 0 auto;
  }
  details {
    margin-top: 1.5em;
  }
  summary {
    font-weight: bold;
    width: var(--column-width);
    margin: auto;
  }
  summary:hover {
    cursor: pointer;
  }
  .invisible {
    opacity: 0;
    position: absolute;
    top: 0;
  }
  h2 {
    max-width: var(--column-width);
    margin: 0 auto;
    margin-bottom: 1rem;
    margin-top: 4rem;
  }

  @media (max-width: 800px) {
    details {
      width: calc(100% - 30px);
    }
  }
</style>
