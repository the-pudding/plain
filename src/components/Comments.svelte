<script>
  import { onMount } from "svelte";
  import _ from "lodash";
  import Icon from "$components/helpers/Icon.svelte";
  import variables from "$data/variables.json";
  import { select } from "d3";

  export let data;

  const colors = [
    variables.color["comment-red"],
    variables.color["comment-orange"],
    variables.color["comment-yellow"],
    variables.color["comment-green"],
    variables.color["comment-blue"],
    variables.color["comment-purple"]
  ];
  const positions = [
    { top: "36%", left: "8%" },
    { top: "36%", left: "24%" },
    { top: "44%", left: "16%" },
    { top: "54%", left: "16%" },
    { top: "63%", left: "16%" },
    { top: "30%", left: "16%" }
  ];

  const { before, after } = data;
  let step = null;
  $: description = step !== null ? data.steps[step].description : null;

  onMount(() => {
    document
      .querySelectorAll(".translation-step")
      .forEach((d) => d.addEventListener("click", onClick));

    document
      .querySelectorAll(".translation-step")
      .forEach((d, i) => (d.style.background = colors[i]));
  });

  const onClick = (e) => {
    const num = e.target.id.replace(/^\D+/g, "");
    step = parseInt(num);

    document.querySelectorAll(".tooltip").forEach((d) => {
      d.style.border = `3px solid ${colors[step]}`;
      d.style.top = step !== null ? positions[step].top : 0;
      d.style.left = step !== null ? positions[step].left : 0;
    });

    document.querySelectorAll(".close").forEach((d) => {
      d.style.border = `3px solid ${colors[step]}`;
    });
  };
</script>

<div class="container">
  <div class="tooltip" class:view-tooltip={step !== null}>
    {description}
    <div class="close" on:click={() => (step = null)}><Icon name="x" /></div>
  </div>
  <div class="texts">
    <div class="before">
      <h3>ORIGINAL</h3>
      <p>{@html before}</p>
    </div>
    <div class="after">
      <h3>PLAIN LANGUAGE</h3>
      {#if typeof after === "string"}
        <p>{@html after}</p>
      {:else}
        {#each after as { type, value }}
          {#if type === "text"}
            <p>{@html value}</p>
          {:else if type === "list"}
            <ul>
              {#each value as v}
                <li>{@html v}</li>
              {/each}
            </ul>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: var(--column-width);
    margin: 0 auto;
    margin-top: 4em;
    margin-bottom: 4em;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    position: relative;
  }
  .tooltip {
    display: none;
    position: absolute;
    width: 70%;
    top: var(--top);
    left: var(--left);
    background: white;
    padding: 18px;
    box-shadow: 0 0 10px lightgrey;
    border-radius: 10px;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1em;
    font-size: 1em;
    -webkit-transform: translate(50%, -50%);
    transform: translate(50%, -50%);
    padding: 0.25em;
    pointer-events: all;
    background: #f5f1f1;
  }
  .close:hover {
    cursor: pointer;
  }
  .view-tooltip {
    display: block;
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
  ul {
    padding-left: 20px;
  }
  p {
    margin: 0;
  }
  h3 {
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .description {
    color: var(--color-gray-dark);
    font-style: italic;
    margin-top: 1em;
  }
  :global(.translation-step:hover) {
    cursor: pointer;
    font-weight: bold;
  }
</style>
