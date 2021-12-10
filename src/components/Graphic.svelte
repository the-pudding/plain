<script>
  import SideBySide from "$components/SideBySide.svelte";
  import Slide from "$components/Slide.svelte";
  import Comments from "$components/Comments.svelte";
  import Books from "$components/Books.svelte";

  export let graphic;
</script>

{#if graphic.name === "in-action"}
  <SideBySide data={graphic} />
{:else if graphic.name === "characteristics"}
  <SideBySide data={graphic} pen={true} />
{:else if graphic.name === "translation"}
  <SideBySide data={graphic} />
{:else if graphic.name === "steps"}
  <Comments data={graphic} />
{:else if graphic.name === "flesch" || graphic.name === "dale"}
  <Slide
    progression={graphic.progression}
    algorithm={graphic.name === "flesch"
      ? "Flesch-Kincaid"
      : graphic.name === "dale"
      ? "Dale-Chall"
      : null}
  />
{:else if graphic.name === "books"}
  <Books />
{/if}
