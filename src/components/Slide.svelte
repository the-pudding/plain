<script>
  import MovingText from "$components/MovingText.svelte";
  import ButtonSet from "$components/helpers/ButtonSet.svelte";
  import { tweened } from "svelte/motion";

  export let title;
  export let progression;
  export let algorithm;

  let level = 1;
  $: ({ grade, explanation } = progression.filter((d) => parseInt(d.level) === level)[0]);
  const allText = progression.map((d) => d.text);
  let explanationOpacity = tweened(0, { duration: 800, delay: 200 });

  $: level, fadeIn();
  const fadeIn = () => {
    if ($explanationOpacity === 0) $explanationOpacity = 1;
    else {
      explanationOpacity = tweened(0, { duration: 800, delay: 200 });
      $explanationOpacity = 1;
    }
  };

  const options = [
    { value: 0, label: "Easy" },
    { value: 1, label: "Medium" },
    { value: 2, label: "Hard" }
  ];
</script>

<div class="container">
  <h3>{@html title}</h3>
  <div class="buttons">
    <ButtonSet legend={"Change reading level"} {options} bind:value={level} />
  </div>
  <div class="reading-level">
    The below text is at a <span class="grade">{grade}</span>
    grade reading level according to {algorithm}
  </div>

  <MovingText text={allText} {level} {algorithm} />
  <div class="explanation" style={`--opacity: ${$explanationOpacity}`}>{@html explanation}</div>
</div>

<style>
  h3 {
    width: var(--column-width);
    margin: auto;
  }
  .reading-level {
    font-size: 0.8rem;
    margin: auto;
    margin-bottom: 1em;
  }
  .grade {
    color: var(--color-orange-dark);
    font-weight: bold;
  }
  .buttons {
    margin: auto;
    margin-top: 0.5em;
    margin-bottom: 1em;
    max-width: 500px;
  }
  .container {
    max-width: 1100px;
    width: calc(100% - 80px);
    margin: 0 auto;
    margin-top: 4em;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
  }
  .explanation {
    width: var(--column-width);
    margin: auto;
    margin-top: 2em;
    opacity: var(--opacity);
  }
</style>
