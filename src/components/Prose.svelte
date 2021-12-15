<script>
  import { onMount } from "svelte";
  import _ from "lodash";
  import tap from "$svg/tap.svg";
  import swipe from "$svg/swipe.svg";
  import { select } from "d3";

  export let standard = "";
  export let plain = "";
  export let adjustments;
  export let i;
  export let subtitle;

  // console.log({ i, standard, plain, subtitle });

  let mounted = false;
  $: noPlain = plain === "";
  let view = "standard";
  let containerEl;
  let refs = [];
  let currentHeight = 0;
  $: marginTop = i === 0 ? 0 : adjustments[i - 1] * -1;

  const switchView = () => {
    if (view === "standard") view = "plain";
    else view = "standard";
  };

  // $: view, updateAdjustments();
  $: console.log({ adjustments });

  const updateAdjustments = () => {
    if (mounted && refs.length > 0) {
      const getHeights = (d) => {
        const heightWithoutMargin = d.getBoundingClientRect().height;
        const formatPx = (str) => parseFloat(str.replace("px"));
        const margin =
          formatPx(window.getComputedStyle(d).getPropertyValue("margin-top")) +
          formatPx(window.getComputedStyle(d).getPropertyValue("margin-bottom"));
        return heightWithoutMargin + margin;
      };
      const standardHeight = _.sum(Array.from(refs[0].children).map(getHeights));

      if (noPlain) {
        adjustments[i] = 0;
        return;
      }

      const plainHeight = _.sum(Array.from(refs[1].children).map(getHeights));
      const containerHeight = containerEl.getBoundingClientRect().height;
      const standardOffset = containerHeight - standardHeight;
      const plainOffset = containerHeight - plainHeight;

      if (view === "standard") {
        adjustments[i] = standardOffset;
        currentHeight = standardHeight;
      } else {
        adjustments[i] = plainOffset;
        currentHeight = plainHeight;
      }
    }
  };

  const placeIcons = () => {
    select("span#tap-icon").html(tap);
    select("span#swipe-icon").html(swipe);
  };

  onMount(() => {
    mounted = true;
    updateAdjustments();
    placeIcons();
  });
</script>

<div class="outer" class:no-plain={noPlain} style={`--marginTop: ${marginTop}px`}>
  <div
    class:inner={true}
    class:show-plain={view === "plain"}
    class:show-standard={view === "standard"}
    class:no-plain={noPlain}
    bind:this={containerEl}
  >
    {#if noPlain && !subtitle}
      {#each standard as { type, value }}
        {#if type === "text"}
          <p class="text">{@html value}</p>
        {:else if type === "list"}
          <ul class="text">
            {#each value as v}
              <li>{@html v}</li>
            {/each}
          </ul>
        {/if}
      {/each}
    {:else if noPlain && subtitle}
      <h2 class="text">{subtitle}</h2>
    {:else}
      {#each ["standard", "plain"] as v, i}
        <div
          style={`--maxHeight: ${currentHeight}px`}
          class={`text ${v}`}
          class:faded={view !== v}
          on:click={switchView}
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
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .outer {
    width: calc(var(--column-width) * 1.4);
    margin: 0 auto;
    transition: margin-top 500ms;
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
    width: 5rem;
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
    width: 5rem;
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
    transform: translate(-40%, 0%);
  }
  .show-standard {
    transform: translate(10%, 0%);
  }

  .text {
    width: var(--column-width);
  }

  h2 {
    transform: translate(-6%, 0%);
  }
  /* .inner.no-plain p,
  .inner.no-plain ul {
    width: 30em;
  } */
  .standard:hover,
  .plain:hover {
    cursor: pointer;
  }
  .faded {
    opacity: 0.3;
    max-height: var(--maxHeight);
    overflow: hidden;
  }
  .standard {
    padding-right: 1em;
  }
  .plain {
    color: var(--color-dark-blue);
    font-family: var(--font-plain);
    font-size: var(--font-size-plain);
  }
  ul {
    padding-left: 1em;
  }

  figure {
    height: 25vh;
    background: aquamarine;
  }
</style>
