<script>
  const data = [
    {
      img: "grapes.jpeg",
      alt: "the grapes of wrath cover",
      score: 680,
      grade: "5th grade"
    },
    { img: "twilight.jpeg", alt: "twilight cover", score: 720, grade: "7th grade" },
    {
      img: "mouse.jpeg",
      alt: "the library mouse cover",
      score: 860,
      grade: "10th grade"
    }
  ];
</script>

<div class="container">
  {#each data as { img, alt, size, score, grade }}
    <div class="book">
      <img src={`assets/img/${img}`} {alt} class={size} />
      <div class="score">{score}</div>
      <div class="grade">({grade})</div>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    justify-content: space-evenly;
    max-width: 1100px;
    width: calc(100% - 80px);
    margin: auto;
    margin-top: 4em;
    margin-bottom: 4em;
  }

  img {
    height: 250px;
    margin-bottom: 0.5em;
    transform: scale(1);
    transition: all 500ms;
  }
  img:hover {
    transform: scale(1.2);
    margin-bottom: 2em;
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
</style>
