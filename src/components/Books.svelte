<script>
  export let title;

  const data = [
    {
      img: "grapes.jpeg",
      alt: "the grapes of wrath cover",
      score: 680,
      grade: "5th grade"
    },
    { img: "nancy.jpeg", alt: "nancy drew cover", score: 720, grade: "7th grade" },
    {
      img: "mouse.jpeg",
      alt: "the library mouse cover",
      score: 860,
      grade: "10th grade"
    }
  ];
</script>

<div class="container">
  <h3>{title}</h3>
  <div class="books">
    {#each data as { img, alt, size, score, grade }}
      <div class="book">
        <img src={`assets/img/${img}`} {alt} class={size} />
        <div class="score">{score}</div>
        <div class="grade">({grade})</div>
      </div>
    {/each}
  </div>
</div>

<style>
  h3 {
    margin-bottom: 2.5rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    width: calc(100% - 80px);
    margin: auto;
    margin-top: 4em;
    margin-bottom: 4em;
  }
  .books {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
  img {
    height: 250px;
    margin-bottom: 0.5em;
    transition: all 500ms;
  }

  .book {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
  }
  .score {
    font-weight: bold;
    font-size: 30px;
  }
  .grade {
    font-size: 16px;
  }

  @media (max-width: 600px) {
    img {
      height: 130px;
    }
  }
</style>
