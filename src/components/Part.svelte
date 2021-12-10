<script>
  import _ from "lodash";
  import Prose from "$components/Prose.svelte";
  import Graphic from "$components/Graphic.svelte";

  export let part;
  export let chunks;
  export let title;

  let adjustments = _.times(chunks.length, _.constant(0));
</script>

<section id="part-{part}">
  <h1>{title}</h1>
  {#each chunks as { standard, plain, graphic }, i}
    <Prose {standard} {plain} bind:adjustments {i} />

    {#if graphic}
      <Graphic {graphic} />
    {/if}
  {/each}
</section>

<style>
  section {
    width: var(--column-width);
    margin: 0 auto;
  }
</style>
