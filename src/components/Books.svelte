<script>
  const data = [
    {
      img: "grapes.jpeg",
      alt: "the grapes of wrath cover",
      size: "small",
      score: 680,
      grade: "5th grade"
    },
    { img: "twilight.jpeg", alt: "twilight cover", size: "medium", score: 720, grade: "7th grade" },
    {
      img: "mouse.jpeg",
      alt: "the library mouse cover",
      size: "large",
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
      <div>({grade})</div>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    max-width: 30em;
    margin: 0 auto;
    margin-top: 4em;
    margin-bottom: 4em;
  }
  img.small {
    height: 150px;
    margin-right: 1em;
  }
  img.medium {
    height: 200px;
    margin-right: 1em;
  }
  img.large {
    height: 250px;
  }
  .book {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
  }
  .score {
    font-weight: bold;
    font-size: 22px;
  }
</style>
