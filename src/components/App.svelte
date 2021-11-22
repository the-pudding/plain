<script>
  import { setContext } from "svelte";
  import Intro from "$components/Intro.svelte";
  import Prose from "$components/Prose.svelte";
  import Footer from "$components/Footer.svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import InAction from "$components/InAction.svelte";
  import copy from "$data/doc.json";

  setContext("App", { copy });

  let toggle = "off";

  $: plainVisible = toggle === "on";

  console.log(copy);
</script>

<Intro />

<div class="toggle">
  <Toggle label="Plain Language" bind:value={toggle} />
</div>

{#each copy.parts as { part, chunks }}
  <section id="part-{part}">
    {#each chunks as { standard, plain, graphic, graphicText }}
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
      {#if graphic === "in-action"}
        <InAction text={graphicText} />
      {:else}
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

  .toggle {
    position: fixed;
    top: 1em;
    right: 1em;
  }
</style>
