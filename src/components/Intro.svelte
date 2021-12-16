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
    max-width: var(--intro-column-width);
    margin: 4rem auto;
  }
  h1 {
    font-size: 80px;
    text-align: center;
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .dek {
    color: var(--color-gray-dark);
    font-size: var(--heading-font-size);
    text-align: center;
    max-width: 590px;
    margin: 0 auto;
    margin-bottom: 0rem;
  }
  .author {
    font-weight: bold;
    text-align: center;
    font-size: 16px;
  }
</style>
