<script>
  import { getContext } from "svelte";
  import Prose from "$components/Prose.svelte";

  const { copy } = getContext("App");
</script>

<section id="part2">
  <Prose data={copy.part2} />
</section>
