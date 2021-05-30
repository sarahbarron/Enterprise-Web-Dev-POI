<script lang="ts">
  import ListPlayerCard from "./ListPlayerCard.svelte";
  import ListScoreCard from "./ListScoreCard.svelte";
  export let teamAName: string;
  export let teamBName: string;
  export let teamAPlayers: string[];
  export let teamBPlayers: string[];
  export let childKey: string;
  export let teamACrest: string;
  export let teamBCrest: string;
</script>

<div class="accordion" id="accordion-{childKey}">
  <div class="accordion-item">
    <h2 class="accordion-header" id="header-score-{childKey}">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-score-{childKey}"
        aria-expanded="false"
        aria-controls="collapse-score-{childKey}"
      >
        Show All Scores
      </button>
    </h2>
    <div
      id="collapse-score-{childKey}"
      class="accordion-collapse collapse"
      aria-labelledby="header-score-{childKey}"
      data-bs-parent="#accordion-{childKey}"
    >
      <div class="accordion-body">
        <ListScoreCard
          {teamACrest}
          {teamBCrest}
          {childKey}
          {teamAName}
          {teamBName}
        />
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="heading-teamsheet-{childKey}-{teamAName}">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-teamsheet-{childKey}-{teamAName}"
        aria-expanded="false"
        aria-controls="collapse-teamsheet-{childKey}-{teamAName}"
      >
        Show {teamAName} Team Sheet
      </button>
    </h2>
    <div
      id="collapse-teamsheet-{childKey}-{teamAName}"
      class="accordion-collapse collapse"
      aria-labelledby="heading-teamsheet-{childKey}-{teamAName}"
      data-bs-parent="#accordion-{childKey}"
    >
      <div class="accordion-body">
        <ListPlayerCard
          teamPlayers={teamAPlayers}
          {childKey}
          teamAorB="teamA"
        />
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="heading-teamsheet-{childKey}-{teamBName}">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapse-{childKey}-{teamBName}"
        aria-expanded="false"
        aria-controls="collapse-{childKey}-{teamBName}"
      >
        Show {teamBName} Team Sheet
      </button>
    </h2>
    <div
      id="collapse-{childKey}-{teamBName}"
      class="accordion-collapse collapse"
      aria-labelledby="heading-teamsheet-{childKey}-{teamBName}"
      data-bs-parent="#accordion-{childKey}"
    >
      <ListPlayerCard teamPlayers={teamBPlayers} {childKey} teamAorB="teamB" />
    </div>
  </div>
</div>

<style>
  button {
    font-size: x-large;
  }
</style>
