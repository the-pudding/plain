<script>
  import _ from "lodash";
  import Prose from "$components/Prose.svelte";
  import Graphic from "$components/Graphic.svelte";
  import { onMount } from "svelte";

  export let part;
  export let chunks;
  export let title;

  // hack to get deep dive sizes right
  onMount(() => {
    setTimeout(() => {
      document.querySelectorAll("details").forEach((d, i) => {
        d.removeAttribute("open");
      });
    }, 500);
  });
</script>

<section id="part-{part}">
  <h2>{title}</h2>
  {#each chunks as { standard, plain, graphic, deepDive, subchunks, description, subtitle }, i}
    {#if deepDive}
      <details open>
        <summary>{description}</summary>
        {#each subchunks as subchunk}
          <Prose standard={subchunk.standard} plain={subchunk.plain} deepDive={true} />
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
  details {
    font-size: 16px;
    max-width: 1100px;
    margin: auto;
    width: calc(100% - 80px);
  }
  summary {
    font-weight: bold;
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
