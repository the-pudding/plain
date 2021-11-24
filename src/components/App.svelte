<script>
  import { onMount, setContext } from "svelte";
  import Intro from "$components/Intro.svelte";
  import Prose from "$components/Prose.svelte";
  import Footer from "$components/Footer.svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import SideBySide from "$components/SideBySide.svelte";
  import Slide from "$components/Slide.svelte";
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
        {#if graphic.name === "in-action"}
          <SideBySide data={graphic} />
        {:else if graphic.name === "characteristics"}
          <SideBySide data={graphic} pen={true} {toggle} />
        {:else if graphic.name === "translation"}
          <SideBySide data={graphic} />
        {:else if graphic.name === "steps"}
          <SideBySide data={graphic} menu={true} pen={true} />
        {:else if graphic.name === "flesch" || graphic.name === "dale"}
          <Slide
            progression={graphic.progression}
            algorithm={graphic.name === "flesch"
              ? "Flesch-Kincaid"
              : graphic.name === "dale"
              ? "Dale-Chall"
              : null}
          />
        {:else}
          <figure>
            <figcaption>graphic: {graphic.name}</figcaption>
          </figure>
        {/if}
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
