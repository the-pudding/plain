<script>
  import { getContext } from "svelte";
  import Prose from "$components/Prose.svelte";

  const { copy } = getContext("App");
</script>

<section id="part1">
  <Prose data={copy.part1} />
</section>
