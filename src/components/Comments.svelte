<script>
  import { onMount } from "svelte";
  import _ from "lodash";
  import variables from "$data/variables.json";

  export let data;

  const colors = [
    variables.color["comment-red"],
    variables.color["comment-orange"],
    variables.color["comment-yellow"],
    variables.color["comment-green"],
    variables.color["comment-blue"],
    variables.color["comment-purple"]
  ];

  const { before, after } = data;
  let mounted = false;
  let step = null;
  let hoveredStep = null;
  $: description = step !== null ? data.steps[step].description : null;

  $: hoveredStep, hoverChange();
  const hoverChange = () => {
    if (mounted) {
      document.querySelectorAll(".translation-step").forEach((d, i) => {
        const num = parseInt(d.id.replace(/^\D+/g, ""));
        if (hoveredStep !== null) {
          if (num !== hoveredStep) {
            d.classList.add("fade");
          } else {
            d.classList.remove("fade");
          }
        } else {
          d.classList.remove("fade");
        }
      });

      document.querySelectorAll(".after-step").forEach((d, i) => {
        const num = parseInt(d.id.replace(/^\D+/g, ""));
        if (hoveredStep !== null) {
          if (num !== hoveredStep) {
            d.classList.add("fade");
            d.style.outline = "none";
          } else {
            d.classList.remove("fade");
            d.style.outline = `3px solid ${colors[i]}`;
          }
        } else {
          d.classList.remove("fade");
          d.style.outline = "none";
        }
      });
    }
  };

  const onMouseEnter = (e) => {
    const num = parseInt(e.target.id.replace(/^\D+/g, ""));
    hoveredStep = num;
  };
  const onMouseLeave = (e) => {
    hoveredStep = null;
  };

  onMount(() => {
    mounted = true;
    document.querySelectorAll(".translation-step").forEach((d, i) => {
      d.addEventListener("click", onClick);
      d.addEventListener("mouseenter", onMouseEnter);
      d.addEventListener("mouseleave", onMouseLeave);
      d.style.background = colors[i];
    });
  });

  const onClick = (e) => {
    const num = parseInt(e.target.id.replace(/^\D+/g, ""));
    step = num;
  };
</script>

<div class="container">
  <div class="texts">
    <div class="before">
      <h3>ORIGINAL</h3>
      <p>{@html before}</p>
    </div>
    <div class="after">
      <h3>PLAIN LANGUAGE</h3>
      <p>{@html after}</p>
    </div>
  </div>
  <div class="description" class:show-description={!!description}>
    <div class="description-inner">{@html description}</div>
  </div>
</div>

<style>
  .container {
    max-width: 1100px;
    width: calc(100% - 80px);
    margin: 0 auto;
    margin-top: 3rem;
    margin-bottom: 4em;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .texts {
    display: flex;
  }
  .before,
  .after {
    padding: 20px;
    flex: 1;
  }
  .before {
    border: 1px solid lightgrey;
    margin-right: 15px;
  }
  .after {
    border: 1px solid lightgrey;
  }
  .after p {
    font-family: var(--font-plain);
    font-size: var(--font-size-plain);
  }
  p {
    margin: 0;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .description {
    color: var(--color-gray-dark);
    font-style: italic;
    display: flex;
    align-items: flex-start;
    opacity: 0;
    margin-bottom: 1em;
    margin-top: 2rem;
  }
  .show-description {
    opacity: 1;
  }
  :global(.fade) {
    opacity: 0.2;
  }
  :global(.translation-step:hover) {
    cursor: pointer;
  }
</style>
