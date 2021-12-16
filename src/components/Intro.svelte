<script>
  import { annotate } from "rough-notation";
  import { getContext, onMount } from "svelte";

  const { copy } = getContext("App");

  // onMount(() => {
  //   const el = document.querySelector("span#circle-header");
  //   const annotation = annotate(el, { type: "circle", color: "red", animate: true });
  //   annotation.show();
  // });
</script>

<section id="intro">
  <div>
    <h1>{@html copy.hed}</h1>
    <p class="dek">{@html copy.dek}</p>
    <p class="author">{@html copy.author}</p>
  </div>
</section>

<style>
  div {
    max-width: var(--column-width);
    margin: 0 auto;
  }
  h1 {
    font-size: 3em;
  }
  .dek {
    color: var(--color-gray-dark);
  }
  .author {
    font-weight: bold;
  }
</style>
