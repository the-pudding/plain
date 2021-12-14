<script>
  import { onMount } from "svelte";
  import _ from "lodash";

  export let standard = "";
  export let plain = "";
  export let adjustments;
  export let i;

  let mounted = false;
  let noPlain = plain === "";
  let view = "standard";
  let containerEl;
  let refs = [];
  let currentHeight = 0;
  $: marginTop = i === 0 ? 0 : adjustments[i - 1] * -1;

  const switchView = () => {
    if (view === "standard") view = "plain";
    else view = "standard";
  };

  $: view, updateAdjustments();

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
        // currentHeight = standardHeight;
        return;
      }

      const plainHeight = _.sum(Array.from(refs[1].children).map(getHeights));
      const containerHeight = containerEl.getBoundingClientRect().height;
      const standardOffset = containerHeight - standardHeight;
      const plainOffset = containerHeight - plainHeight;

      if (view === "standard") {
        adjustments[i] = standardOffset;
        // currentHeight = standardHeight;
      } else {
        adjustments[i] = plainOffset;
        // currentHeight = plainHeight;
      }
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
    class:just-standard={plain === ""}
    bind:this={containerEl}
  >
    {#if plain === ""}
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
    width: 45em;
    margin: 0 auto;
    transition: margin-top 1s;
    margin-top: var(--marginTop);
    display: flex;
    overflow: hidden;
    position: relative;
  }
  .inner {
    display: flex;
    transition: transform 1s;
  }
  .show-plain {
    transform: translate(-41%, 0%);
  }
  .show-standard {
    transform: translate(10%, 0%);
  }

  .text {
    width: 30em;
  }
  .just-standard {
    transform: translate(20%, 0%);
  }
  .just-standard p,
  .just-standard ul {
    width: 30em;
  }
  .text:hover {
    cursor: pointer;
  }
  .faded {
    opacity: 0.3;
  }
  .standard {
    margin-right: 1em;
  }
  .plain {
    color: steelblue;
  }
  ul {
    padding-left: 1em;
  }

  figure {
    height: 25vh;
    background: aquamarine;
  }
</style>
