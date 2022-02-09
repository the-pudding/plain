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

<figure class="container">
  <figcaption class="sr-only">
    {#if algorithm === "Flesch-Kincaid"}
      An interactive showing what the Flesch-Kincaid algorithm considers a easy, medium, and hard
      sentence. The algorithm deems sentences with lower syllable counts to be easier, so when long
      multisyllabic words are added (even if they are easy words), the algorithm says it's a hard
      sentence. If we add short but obscure words, the algorithm thinks it's an easier sentence. We
      see that the Flesch-Kincaid algorithm isn't able to handle much complexity when it comes to
      assessing readability.
    {:else if algorithm === "Dale-Chall"}
      An interactive showing what the Dale-Chall algorithm considers a easy, medium, and hard
      sentence. Dale-Chall considers average sentence length along with how many difficult words are
      used, where “difficult” words are words that don't appear on the Dale-Chall list. If we add
      words that are unfamiliar (like dinosaur or dude) the algorithm says it's a difficult
      sentence. If we simply add a sentence that just contains the exclamation "Yes!", that lowers
      the average sentence length and makes the algorithm say it's an easier sentence. We see that
      the Dale-Chall algorithm isn't able to handle much complexity when it comes to assessing
      readability.
    {/if}
  </figcaption>

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
</figure>

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
