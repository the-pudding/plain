<script>
  import { onMount } from "svelte";
  import _ from "lodash";

  export let standard;
  export let plain;
  export let adjustments;
  export let i;

  let mounted = false;
  let view = "standard";
  let containerEl;
  let refs = [];
  $: marginTop = i === 0 ? 0 : adjustments[i - 1] * -1;

  const switchView = () => {
    if (view === "standard") view = "plain";
    else view = "standard";
  };

  $: view, updateAdjustments();

  const updateAdjustments = () => {
    if (mounted) {
      const getHeights = (d) => {
        const heightWithoutMargin = d.getBoundingClientRect().height;
        const formatPx = (str) => parseFloat(str.replace("px"));
        const margin =
          formatPx(window.getComputedStyle(d).getPropertyValue("margin-top")) +
          formatPx(window.getComputedStyle(d).getPropertyValue("margin-bottom"));
        return heightWithoutMargin + margin;
      };

      const standardHeight = _.sum(Array.from(refs[0].children).map(getHeights));
      const plainHeight = _.sum(Array.from(refs[1].children).map(getHeights));
      const containerHeight = containerEl.getBoundingClientRect().height;
      const standardOffset = containerHeight - standardHeight;
      const plainOffset = containerHeight - plainHeight;

      if (view === "standard") adjustments[i] = standardOffset;
      else adjustments[i] = plainOffset;
    }
  };

  onMount(() => {
    mounted = true;
    updateAdjustments();
  });
</script>

<div class="outer" style={`--marginTop: ${marginTop}px`}>
  <div
    class:inner={true}
    class:show-plain={view === "plain"}
    class:show-standard={view === "standard"}
    bind:this={containerEl}
  >
    {#each ["standard", "plain"] as v, i}
      <div class={`text ${v}`} on:click={switchView} bind:this={refs[i]}>
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
  </div>
</div>

<style>
  .outer {
    width: 30em;
    margin: 0 auto;
    margin-top: var(--marginTop);
    display: flex;
    overflow: hidden;
  }
  .inner {
    display: flex;
  }
  .show-plain {
    transform: translate(-50%, 0%);
  }
  .show-standard {
    transform: translate(0%, 0%);
  }

  .text {
    width: 30em;
  }
  .standard {
    background: steelblue;
  }
  .plain {
    background: gold;
  }

  ul {
    padding-left: 1em;
  }

  figure {
    height: 25vh;
    background: aquamarine;
  }
</style>
