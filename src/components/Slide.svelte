<script>
  import Range from "$components/helpers/Range.svelte";
  export let progression;
  export let algorithm;

  let level = 1;
  $: ({ text, grade, explanation } = progression.filter((d) => parseInt(d.level) === level)[0]);
</script>

<div class="container">
  <div class="header">
    The below text is at a <div class="grade">{grade}</div>
    grade reading level according to {algorithm}
  </div>
  <div class="instructions">Slide to change reading level</div>
  <Range
    min={0}
    max={2}
    step={1}
    showTicks={true}
    bind:value={level}
    labels={["Easy", "Medium", "Hard"]}
  />
  <div class="text">{text}</div>
  <div class="explanation">{explanation}</div>
</div>

<!-- <p>{text}</p>
<p>{grade}</p>
<p>{explanation}</p>
<Range min={0} max={2} step={1} showTicks={true} bind:value={level} /> -->
<style>
  .header {
    font-size: 24px;
  }
  .grade {
    color: var(--color-orange-dark);
    font-weight: bold;
  }
  .container {
    max-width: 30em;
    margin: 0 auto;
    margin-top: 4em;
    margin-bottom: 6em;
    display: flex;
    flex-direction: column;
  }
  .instructions {
    font-style: italic;
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .text {
    background: var(--color-tan);
    padding: 20px;
  }
  .explanation {
    margin-top: 2em;
    color: var(--color-gray-dark);
  }
</style>
