<script>
  import { onMount, tick } from "svelte";
  import _ from "lodash";
  import tap from "$svg/tap.svg";
  import swipe from "$svg/swipe.svg";
  import { select, selectAll } from "d3";
  import { toggle } from "$stores/misc.js";
  import viewport from "$stores/viewport.js";

  export let standard = "";
  export let plain = "";
  export let subtitle;
  export let deepDive = false;
  export let deepDiveOpen = false;

  let mounted = false;
  $: noPlain = plain === "";
  let view = "standard";
  let outerEl;
  let refs = [];
  let currentHeight = 0;

  $: $toggle, toggleChange();
  $: view, updateHeights();
  $: $viewport, updateHeights();
  $: if (deepDiveOpen) updateDeep();

  // hacky way to get deep dives to have their full height
  const updateDeep = async () => {
    setTimeout(updateHeights, 10);
  };

  const toggleChange = () => {
    if ($toggle === "on") {
      view = "plain";
    } else if ($toggle === "off") {
      view = "standard";
    }
  };

  const switchView = () => {
    if (view === "standard") view = "plain";
    else view = "standard";
  };

  const getHeights = (d) => {
    const heightWithoutMargin = d.getBoundingClientRect().height;
    const formatPx = (str) => parseFloat(str.replace("px"));
    const margin =
      formatPx(window.getComputedStyle(d).getPropertyValue("margin-top")) +
      formatPx(window.getComputedStyle(d).getPropertyValue("margin-bottom"));
    return heightWithoutMargin + margin;
  };

  const updateHeights = () => {
    if (mounted && !noPlain) {
      const standardHeight = _.sum(Array.from(refs[0].children).map(getHeights));
      const plainHeight = _.sum(Array.from(refs[1].children).map(getHeights));

      if (view === "standard") currentHeight = standardHeight;
      else if (view === "plain") currentHeight = plainHeight;

      select(outerEl).style("height", `${currentHeight}px`);
    }
  };

  const placeIcons = () => {
    selectAll("span.tap-icon").html(tap);
    // selectAll("span#swipe-icon").html(swipe);
  };

  const instructions = (text, mobile, mounted) => {
    if (mounted) {
      placeIcons();
      if (mobile) return text.replace("Click", "Tap").replace("click", "tap");
      return text;
    }
    return text;
  };

  onMount(async () => {
    mounted = true;

    await tick();
    updateHeights();
    placeIcons();
  });
</script>

<div class:outer={true} class:no-plain={noPlain} class:deep-dive={deepDive} bind:this={outerEl}>
  <div
    class:inner={true}
    class:show-plain={view === "plain" && !noPlain}
    class:show-standard={view === "standard" && !noPlain}
  >
    {#if subtitle}
      <h3 class="text">{subtitle}</h3>
    {:else if noPlain}
      {#each standard as { type, value }}
        {#if type === "text"}
          <p>{@html instructions(value, $viewport.width < 800, mounted)}</p>
        {:else if type === "list"}
          <ul>
            {#each value as v}
              <li>{@html v}</li>
            {/each}
          </ul>
        {/if}
      {/each}
    {:else}
      {#each ["standard", "plain"] as v, i}
        <button
          style={`--maxHeight: ${currentHeight}px`}
          class={`text ${v}`}
          class:faded={view !== v}
          on:click={() => {
            if (view !== v) switchView();
          }}
          bind:this={refs[i]}
        >
          {#each v === "standard" ? standard : plain as { type, value }}
            {#if type === "text"}
              <p>{@html value}</p>
            {:else if type === "list"}
              <ul>
                {#each value as v}
                  <li>{@html v}</li>
                {/each}
              </ul>
            {/if}
          {/each}
        </button>
      {/each}
    {/if}
  </div>
</div>

<style>
  .outer {
    width: calc(var(--column-width) * 1.6);
    margin: 0 auto;
    transition: margin-top 500ms, height 500ms;
    margin-top: var(--marginTop);
    display: flex;
    overflow: hidden;
    position: relative;
  }

  .outer.no-plain {
    width: var(--column-width);
  }

  .outer.no-plain .show-standard {
    transform: none;
  }

  .outer.no-plain:before,
  .outer.no-plain:after {
    display: none;
  }

  .outer:before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 2rem;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    z-index: var(--z-top);
  }

  .outer:after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 2rem;
    top: 0;
    right: 0;
    z-index: var(--z-top);
    background-image: linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .inner {
    display: flex;
    transition: transform 500ms;
  }

  .show-plain {
    transform: translate(-35%, 0%);
  }
  .show-standard {
    transform: translate(15%, 0%);
  }

  .text {
    width: var(--column-width);
    transition: opacity 500ms;

    /* removing <button> styling */
    background: none;
    padding: 0;
    text-align: left;
    display: flex;
    flex-direction: column;
  }
  .text:focus {
    box-shadow: none;
    background: #f4f7f9;
    border-radius: 0px;
    outline: 2px solid var(--color-focus);
  }
  .text:hover {
    cursor: auto;
  }

  .faded:hover {
    cursor: pointer;
  }
  .faded {
    opacity: 0.3;
    max-height: var(--maxHeight);
    overflow: hidden;
  }
  .faded:after {
    content: "";
    display: block;
    position: absolute;
    height: 10rem;
    width: 50%;
    bottom: 0;
    z-index: var(--z-top);
    background-image: linear-gradient(top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  }
  .standard,
  .plain {
    padding: 0 0.3em 0 0.3em;
  }
  .plain,
  :global(.plain-style) {
    color: var(--color-dark-blue);
    font-family: var(--font-plain);
    font-size: var(--font-size-plain);
  }
  h3 {
    margin-top: 2em;
  }

  @media (max-width: 800px) {
    .outer {
      width: 100vw;
    }
    .outer.deep-dive {
      transform: translate(-15px, 0);
    }

    .show-plain {
      transform: translate(-55vw, 0);
    }
    .show-standard {
      transform: translate(15vw, 0);
    }
    .standard {
      padding-right: 0.6em;
    }
  }
</style>
