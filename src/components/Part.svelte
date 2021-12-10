<script>
  import _ from "lodash";
  import Prose from "$components/Prose.svelte";
  import Graphic from "$components/Graphic.svelte";

  export let part;
  export let chunks;

  let adjustments = _.times(chunks.length, _.constant(0));
</script>

<section id="part-{part}">
  {#each chunks as { standard, plain, graphic }, i}
    <Prose {standard} {plain} bind:adjustments {i} />

    {#if graphic}
      <Graphic {graphic} />
    {/if}
  {/each}
</section>

<style>
  .plain,
  .standard {
    display: none;
  }

  .visible {
    display: block;
  }

  figure {
    height: 25vh;
    background: aquamarine;
  }
</style>
