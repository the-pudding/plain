<script>
  import { onMount, setContext } from "svelte";
  import Intro from "$components/Intro.svelte";
  import Part from "$components/Part.svelte";
  import Toggle from "$components/helpers/Toggle.svelte";
  import Credits from "$components/Credits.svelte";
  import Footer from "$components/Footer.svelte";
  import copy from "$data/doc.json";
  import { toggle } from "$stores/misc.js";

  let toggleState = "off";

  $: toggleState, changeView();
  const changeView = () => {
    toggle.set(toggleState);
  };

  let keyCode;
  const handleKeydown = (event) => {
    keyCode = event.keyCode;

    if (keyCode === 80) {
      if (toggleState === "on") {
        toggle.set("off");
        toggleState = "off";
      } else {
        toggle.set("on");
        toggleState = "on";
      }
    }
  };

  $: console.log({ copy });

  setContext("App", { copy });
</script>

<svelte:window on:keydown={handleKeydown} />

<Intro />

<div class="toggle">
  <Toggle label="Plain Language" bind:value={toggleState} />
</div>

{#each copy.parts as { part, title, chunks }}
  <Part {part} {title} {chunks} />
{/each}

<Credits text={copy.credits} />

<Footer />

<style>
  .toggle {
    position: fixed;
    top: 1em;
    right: 1em;
    background: white;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  :global(span#swipe-icon, span#tap-icon) {
    margin-right: 0.7rem;
  }

  @media (max-width: 600px) {
    .toggle {
      top: 0.25em;
      right: 0.25em;
    }
  }
</style>
