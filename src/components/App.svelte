<script>
  import { setContext } from "svelte";
  import Intro from "$components/Intro.svelte";
  import Part from "$components/Part.svelte";
  import Footer from "$components/Footer.svelte";
  import copy from "$data/doc.json";

  setContext("App", { copy });
</script>

<Intro />

{#each copy.parts as { part, title, chunks }}
  <Part {part} {title} {chunks} />
{/each}

<Footer />

<style>
</style>
