<script>
  import { getContext } from "svelte";

  const { copy } = getContext("App");
</script>

<section id="intro">
  <div>
    <h1>{copy.hed}</h1>
    <p>{copy.dek}</p>
  </div>
</section>

<style>
  div {
    max-width: var(--column-width);
    margin: 0 auto;
  }
</style>
