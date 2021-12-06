<script>
  import { slide } from "svelte/transition";

  export let options;
  export let value;
</script>

{#each options as option}
  <div class="container">
    <div
      class:header={true}
      class:closed={value !== option.value}
      class:selected={value === option.value}
      on:click={() => (value = option.value)}
    >
      {option.label}
    </div>
    {#if option.value === value}
      <div class="bottom" transition:slide={{ duration: 500 }}>
        {option.description}
      </div>
    {/if}
  </div>
{/each}

<style>
  .container {
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
  }
  .header {
    background-color: rgba(246, 198, 114, 0.55);
    padding: 5px 10px 5px 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .header:hover {
    cursor: pointer;
  }
  .selected {
    /* font-weight: bold; */
  }
  .closed {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: white;
    border: 1px solid var(--color-gray-light);
  }
  .bottom {
    background-color: rgba(246, 198, 114, 0.22);
    padding: 5px 10px 5px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
