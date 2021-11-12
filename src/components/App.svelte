<script>
  import { setContext } from "svelte";
  import Intro from "$components/Intro.svelte";
  import Part1 from "$components/Part1.svelte";
  import Part2 from "$components/Part2.svelte";
  import Part3 from "$components/Part3.svelte";
  import Footer from "$components/Footer.svelte";
  import copy from "$data/doc.json";

  setContext("App", { copy });
</script>

<Intro />
<Part1 />
<Part2 />
<Part3 />
<!-- <Footer /> -->
