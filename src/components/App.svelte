<script>
  import { setContext } from "svelte";
  import Intro from "$components/Intro.svelte";
  import Prose from "$components/Prose.svelte";
  import Footer from "$components/Footer.svelte";
  import copy from "$data/doc.json";

  setContext("App", { copy });

  let plainVisible = false;
</script>

<Intro />

{#each copy.parts as { part, chunks }}
  <section id="part-{part}">
    {#each chunks as { standard, plain, graphic }}
      <div class="standard" class:visible={!plainVisible}>
        {#if standard}
          <Prose data={standard} />
        {/if}
      </div>
      <div class="plain" class:visible={plainVisible}>
        {#if plain}
          <Prose data={plain} />
        {/if}
      </div>
      {#if graphic}
        <figure>
          <figcaption>graphic: {graphic}</figcaption>
        </figure>
      {/if}
    {/each}
  </section>
{/each}

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
