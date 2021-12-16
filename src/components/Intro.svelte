<script>
  import { getContext, onMount, onDestroy } from "svelte";

  const { copy } = getContext("App");

  let side = "left";
  const interval = setInterval(() => {
    if (side === "left") side = "right";
    else side = "left";
  }, 3500);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<section id="intro">
  <div>
    <h1>{@html copy.hed}</h1>
    <div class="outer">
      <div class={`inner slide-${side}`}>
        <p class="dek">{@html copy.dekStandard}</p>
        <p class="plain-dek">{@html copy.dekPlain}</p>
      </div>
    </div>
    <p class="author">{@html copy.author}</p>
  </div>
</section>

<style>
  div {
    max-width: var(--intro-column-width);
    margin: 4rem auto;
  }
  h1 {
    font-size: 80px;
    text-align: center;
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .dek {
    color: var(--color-gray-dark);
    padding-right: 1em;
  }
  .dek,
  .plain-dek {
    font-size: var(--heading-font-size);
    text-align: center;
    width: 580px;
    margin: 0 auto;
    margin-bottom: 0rem;
    transition: opacity 500ms;
  }
  .plain-dek {
    color: var(--color-dark-blue);
    font-family: var(--font-plain);
  }
  .author {
    font-weight: bold;
    text-align: center;
    font-size: 16px;
  }

  .outer {
    width: 600px;
    margin: 0 auto;
    transition: margin-top 500ms, height 500ms;
    margin-top: var(--marginTop);
    display: flex;
    overflow: hidden;
    position: relative;
  }
  .inner {
    display: flex;
    transition: transform 1000ms;
  }
  .slide-left {
    transform: translate(56px, 0);
  }
  .slide-right {
    transform: translate(-410px, 0);
  }
  .outer:before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 2rem;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    z-index: var(--z-top);
  }

  .outer:after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 2rem;
    top: 0;
    right: 0;
    z-index: var(--z-top);
    background-image: linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  }
</style>
