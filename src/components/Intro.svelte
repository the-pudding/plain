<script>
  import { getContext, onDestroy } from "svelte";

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
  <div class="container">
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
  .container {
    max-width: 60rem;
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
    font-size: 30px;
    text-align: center;
    width: var(--column-width);
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
    width: calc(var(--column-width) * 1.6);
    margin: 0 auto;
    transition: margin-top 500ms, height 500ms;
    margin-top: var(--marginTop);
    display: flex;
    overflow: hidden;
    position: relative;
  }
  .inner {
    display: flex;
    transition: transform 700ms;
    margin: 4rem auto;
  }
  .slide-left {
    transform: translate(15%, 0);
  }
  .slide-right {
    transform: translate(-35%, 0);
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

  @media (max-width: 600px) {
    h1 {
      font-size: 60px;
    }
    .dek,
    .plain-dek {
      font-size: 20px;
    }
  }
  @media (max-width: 800px) {
    .outer {
      width: 100vw;
    }
    .slide-left {
      transform: translate(15vw, 0);
    }
    .slide-right {
      transform: translate(-55vw, 0);
    }
  }
</style>
