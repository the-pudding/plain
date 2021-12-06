<script>
  import _ from "lodash";
  import { usePrevious } from "svelte-previous";
  import { onMount } from "svelte";
  import { getPunctuation, wordsWithPunc, stripPunc } from "./movingText";

  export let text;
  export let level;
  export let algorithm;

  const [currentLevel, previousLevel] = usePrevious(level);
  $: $currentLevel = level;
  $: isBeginning = $previousLevel === null;
  $: level, updateWordPositions();

  const duration = 1000;
  let currentPositions;
  let allPositions;

  const allWords = _.uniq(
    text.reduce((acc, currentValue) => {
      return [...acc, ..._.words(currentValue)];
    }, [])
  );
  const isExiting = (word, level) => {
    const prev = allPositions[word][$previousLevel];
    return prev && prev.opacity === 1 && currentPositions[word].opacity < 1;
  };
  const isEntering = (word, level) => {
    const prev = allPositions[word][$previousLevel];
    return !prev || (prev.opacity === 0 && currentPositions[word].opacity === 1);
  };
  const getDelay = (word) => {
    if (isExiting(word)) return `${_.random(0, 1000)}ms`;
    else if (isEntering(word)) return `${_.random(1600, 3000)}ms`;
    else return `${_.random(600, 2000)}ms`;
  };
  const getPosition = (word) => {
    const prev = allPositions[word][$previousLevel];
    if (isExiting(word)) {
      return [prev.x, prev.y];
    }
    return [currentPositions[word].x, currentPositions[word].y];
  };
  const updateWordPositions = () => {
    if (allPositions) {
      currentPositions = allWords.reduce((acc, currentValue) => {
        const myState = allPositions[currentValue][level];
        return { ...acc, [currentValue]: myState };
      }, {});
    }
  };

  onMount(() => {
    allPositions = allWords.reduce((acc, currentValue) => {
      let data = [];

      for (let i = 0; i < 3; i++) {
        const w = _.words(text[i]);
        if (w.includes(currentValue)) {
          const el = document.querySelector(`#${algorithm}-${currentValue}-${i}`);
          data = [...data, { x: el.offsetLeft, y: el.offsetTop, opacity: 1, scale: 1 }];
        } else {
          data = [...data, { x: null, y: null, opacity: 0, scale: 0 }];
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
    {#each wordsWithPunc(text[0]) as word}
      <span id={`${algorithm}-${stripPunc(word)}-0`}>{word} </span>
    {/each}
  </div>
  <div class="text hide">
    {#each wordsWithPunc(text[1]) as word}
      <span id={`${algorithm}-${stripPunc(word)}-1`}>{word} </span>
    {/each}
  </div>
  <div class="text hide">
    {#each wordsWithPunc(text[2]) as word}
      <span id={`${algorithm}-${stripPunc(word)}-2`}>{word} </span>
    {/each}
  </div>

  {#if allPositions}
    <div class="text">
      {#each allWords as word}
        <span
          class:word={true}
          class:entering={isEntering(word, level) && !isBeginning}
          class:exiting={isExiting(word, level)}
          id={`${word}`}
          style={`--delay: ${getDelay(word)}; --duration: ${duration}ms; left: ${
            getPosition(word)[0]
          }px; top: ${getPosition(word)[1]}px; opacity: ${
            currentPositions[word].opacity
          }; transform: scale(${currentPositions[word].scale})`}
          >{word}{getPunctuation(word, level, text) ? getPunctuation(word, level, text) : ""}
        </span>
      {/each}
    </div>
  {/if}
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
    transition: all var(--duration) var(--delay);
    transform-origin: 50% 50%;
  }
  .hide {
    opacity: 0;
  }
  .entering {
    color: red;
  }
  .exiting {
  }
</style>
