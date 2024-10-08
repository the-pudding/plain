<script>
  import Prose from "$components/Prose.svelte";
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
  const placeholder =
    "Click the <span class=highlight>highlighted</span> text to see Rebecca's comments.";

  const { before, after, title } = data;
  let mounted = false;
  let step = null;
  let inContainer = false;
  let hoveredStep = null;
  let selectedColor = "white";
  $: description = step !== null ? data.steps[step].description : placeholder;
  $: descriptionPlain = step !== null ? data.steps[step]["description-plain"] : placeholder;

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
  const onMouseLeave = () => {
    if (!inContainer) {
      hoveredStep = null;
    }
  };
  const enterContainer = () => {
    inContainer = true;
  };
  const exitContainer = () => {
    inContainer = false;
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
    selectedColor = colors[num];
  };
</script>

<figure>
  <figcaption class="sr-only">
    An example of translating text from standard to plain language where you can select Rebecca's
    comments to learn more about her translation process.
  </figcaption>

  <h3>{title}</h3>

  <div class="container">
    <div class="texts">
      <div class="before" on:mouseenter={enterContainer} on:mouseleave={exitContainer}>
        <p class="head">ORIGINAL</p>
        <p>{@html before}</p>
      </div>
      <div class="after">
        <p class="head">PLAIN LANGUAGE</p>
        <p class="plain-style">{@html after}</p>
      </div>
    </div>

    <div class="description-title" style={`--color: ${selectedColor}`}>Rebecca's comments</div>

    <!-- <div
    class="description"
    class:show-description={!!description}
    style={`--color: ${selectedColor}`}
  >
    <div class="description-title">Rebecca's comments</div>
    <div class="description-inner">{@html description}</div>
  </div> -->
  </div>
  <Prose
    standard={[{ type: "text", value: description }]}
    plain={[{ type: "text", value: descriptionPlain }]}
  />
</figure>

<style>
  .container {
    max-width: 1100px;
    width: calc(100% - 80px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .head {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  h3 {
    width: var(--column-width);
    margin: auto;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
  .texts {
    display: flex;
    margin-bottom: 1.5em;
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
  .description-title {
    font-size: 1.4rem;
    margin-bottom: 10px;
    font-weight: bold;
    border-bottom: 4px solid var(--color);
    width: var(--column-width);
    margin: auto;
  }
  :global(.fade) {
    opacity: 0.2;
  }
  :global(.translation-step) {
    text-decoration: none;
    color: var(--color-fg);
  }
  :global(.translation-step:hover) {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .container {
      width: calc(100% - 30px);
    }
    .texts {
      font-size: 14px;
      flex-direction: column;
    }
    .before {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
</style>
