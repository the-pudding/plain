<script>
  import _ from "lodash";
  import { usePrevious } from "svelte-previous";
  import { onMount } from "svelte";

  export let text;
  export let level;
  export let algorithm;

  const [currentLevel, previousLevel] = usePrevious(level);
  $: $currentLevel = level;

  const words = _.uniq(
    text.reduce((acc, currentValue) => {
      return [...acc, ..._.words(currentValue)];
    }, [])
  );
  let currentPositions;
  let allPositions;

  $: level, updateWordPositions();
  const updateWordPositions = () => {
    if (allPositions) {
      currentPositions = words.reduce((acc, currentValue) => {
        const myState = allPositions[currentValue][level];
        return { ...acc, [currentValue]: myState };
      }, {});
    }
  };

  onMount(() => {
    allPositions = words.reduce((acc, currentValue) => {
      let data = [];

      for (let i = 0; i < 3; i++) {
        const w = _.words(text[i]);
        if (w.includes(currentValue)) {
          const el = document.querySelector(`#${algorithm}-${currentValue}-${i}`);
          data = [...data, { x: el.offsetLeft, y: el.offsetTop, opacity: 1 }];
        } else {
          data = [...data, { x: undefined, y: undefined, opacity: 0 }];
        }
      }

      return { ...acc, [currentValue]: data };
    }, {});

    updateWordPositions();
  });
</script>

<div class="container">
  <div class="spacer">{text[1]}</div>
  <div class="text hide">
    {#each _.words(text[0]) as word}
      <span id={`${algorithm}-${word}-0`}>{word} </span>
    {/each}
  </div>
  <div class="text hide">
    {#each _.words(text[1]) as word}
      <span id={`${algorithm}-${word}-1`}>{word} </span>
    {/each}
  </div>
  <div class="text hide">
    {#each _.words(text[2]) as word}
      <span id={`${algorithm}-${word}-2`}>{word} </span>
    {/each}
  </div>

  <div class="text">
    {#each _.keys(currentPositions) as word}
      <span
        class="word"
        id={`${word}`}
        style={`opacity: ${currentPositions[word].opacity}; left: ${currentPositions[word].x}px; top: ${currentPositions[word].y}px`}
        >{word}
      </span>
    {/each}
  </div>
</div>

<style>
  .container {
    position: relative;
    font-size: 26px;
    background: var(--color-tan);
  }
  .spacer {
    padding: 20px;
    opacity: 0;
  }
  .text {
    position: absolute;
    top: 0;
    padding: 20px;
    max-width: 30em;
  }
  .word {
    position: absolute;
    transition: opacity 2s, top 2s, left 2s;
  }
  .hide {
    opacity: 0;
  }
</style>
