<script>
  import { getContext } from "svelte";

  const { copy } = getContext("App");
</script>

<section id="intro">
  <div>
    <h1>{copy.hed}</h1>
    <p class="dek">{copy.dek}</p>
    <p class="author">{copy.author}</p>
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
