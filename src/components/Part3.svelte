<script>
  import { getContext } from "svelte";
  import Prose from "$components/Prose.svelte";

  const { copy } = getContext("App");
</script>

<section id="part3">
  <Prose data={copy.part3} />
</section>
