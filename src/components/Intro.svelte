<script>
  import { getContext } from "svelte";
  import Prose from "$components/Prose.svelte";

  const { copy } = getContext("App");
</script>

<section id="intro">
  <div>
    <h1>{copy.hed}</h1>
    <p>{copy.dek}</p>
  </div>

  <Prose data={copy.intro} />
</section>

<style>
  div {
    max-width: var(--column-width);
    margin: 0 auto;
  }
</style>
