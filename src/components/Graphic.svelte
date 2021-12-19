<script>
  import Slide from "$components/Slide.svelte";
  import Comments from "$components/Comments.svelte";
  import Books from "$components/Books.svelte";

  export let graphic;
</script>

{#if graphic.name === "steps"}
  <Comments data={graphic} />
{:else if graphic.name === "flesch" || graphic.name === "dale"}
  <Slide
    title={graphic.title}
    progression={graphic.progression}
    algorithm={graphic.name === "flesch"
      ? "Flesch-Kincaid"
      : graphic.name === "dale"
      ? "Dale-Chall"
      : null}
  />
{:else if graphic.name === "books"}
  <Books title={graphic.title} />
{/if}
