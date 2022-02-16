<script>
  export let label;
  export let style = "inner";
  export let options = ["on", "off"];
  export let value = options[0];

  $: checked = value === options[0];

  const id = `toggle-${Math.floor(Math.random() * 1000000)}`;

  const handleClick = (event) => {
    const target = event.target;
    const state = target.getAttribute("aria-checked");
    checked = state === "true" ? false : true;
    value = checked ? options[0] : options[1];
  };
</script>

<p class="sr-only">
  The following is a toggle that allows you to change whether the text is standard or translated
  into plain language. Press the p key at any time to switch between standard and plain language
  versions of the article. If you are using a screen reader, you will need to disable your the quick
  navigation keyboard commands in order for the P key to function.
</p>

<div class="toggle toggle--{style}">
  <span class="label" {id}>{label}</span>
  <button role="switch" aria-checked={checked} aria-labelledby={id} on:click={handleClick}>
    {#if style === "inner"}
      <span>{options[0]}</span>
      <span>{options[1]}</span>
    {/if}
  </button>
</div>
<div aria-hidden={true} class="use-keyboard plain-style">(Or use the "p" key)</div>

<style>
  .use-keyboard {
    font-size: 13px;
    margin-top: 0.5em;
  }

  .toggle button,
  .label {
    font-family: inherit;
    font-size: 1em;
  }

  .toggle--inner [role="switch"][aria-checked="true"] :first-child,
  [role="switch"][aria-checked="false"] :last-child {
    display: inline-block;
    border-radius: 4px;
    background: var(--color-off-black);
    color: var(--color-off-white);
  }

  .toggle--inner button {
    padding: 0.5em;
    background-color: var(--color-white);
    border: 2px solid var(--color-off-black);
  }

  .toggle--inner button span {
    user-select: none;
    pointer-events: none;
    display: inline-block;
    line-height: 1;
    padding: 0.25em;
  }

  .toggle--inner button:focus {
    box-shadow: 0 0 4px 0 var(--color-focus);
  }

  .toggle--slider {
    display: flex;
    align-items: center;
  }

  .toggle--slider button {
    width: 3.5em;
    height: 2em;
    position: relative;
    margin-left: 0.5em;
    background: var(--color-gray-light);
  }

  .toggle--slider button:focus {
    box-shadow: 0 0px 4px var(--color-focus);
  }

  .toggle--slider button::before {
    content: "";
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    background: var(--color-white);
    border-radius: 4px;
    top: 0.25em;
    right: 1.75em;
  }

  .toggle--slider button[aria-checked="true"] {
    background-color: var(--color-off-black);
  }

  .toggle--slider button[aria-checked="true"]::before {
    transform: translateX(1.5em);
  }

  .toggle--slider button:focus {
    box-shadow: 0 0 4px 0 var(--color-focus);
  }

  @media (max-width: 600px) {
    .toggle--inner {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    button {
      width: 65px;
    }
    .label {
      margin-bottom: 0.5em;
    }
    .toggle button,
    .label {
      font-size: 0.8em;
    }
  }
</style>
