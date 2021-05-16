<script lang="ts">
    export let teamB: string;
    export let teamA: string;
    export let teamScored: string;
    export let competition: string;
    export let player: string;
    export let scoreType: string;
    export let teamACrest: string;
    export let teamBCrest: string;
    export let teamAGoals: number;
    export let teamBGoals: number;
    export let teamAPoints: number;
    export let teamBPoints: number;
    export let timestamp: Date;
    ("https://firebasestorage.googleapis.com/v0/b/gaaref-ae25d.appspot.com/o/Limerick.jpg?alt=media&token=31bbda3e-05fa-4fe5-ac0e-d3a499e7d1a1s");

    let time = timestamp.toDate();
    let t = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
</script>

<div class="card score-card" title={`${competition} at ${time}`}>
    <div class="row no-gutters">
        <div class="col-auto card-body">
            <h5>{competition}: {teamA} V {teamB}</h5>
        </div>
    </div>
    <div class="row no-gutters">
        <div class="col-auto">
            <img
                src={teamACrest || ""}
                id="crest-A-img"
                class="img-fluid crest-img"
                alt="{teamA} GAA Crest"
            />
        </div>
        <div class="col-auto">
            <img
                src={teamBCrest || ""}
                id="crest-B-img"
                class="img-fluid card-img float-right"
                alt="{teamB} GAA Crest"
            />
        </div>
    </div>
    <div class="row no-gutters">
        <div class="col">
            <div class="card-body">
                <p>{teamAGoals} - {teamAPoints}</p>
            </div>
        </div>
        <div class="col">
            <div class="card-body">
                <p>{teamBGoals} - {teamBPoints}</p>
            </div>
        </div>
    </div>
    <div class="row no-gutters">
        <div class="col">
            Latest Score: {scoreType} - {teamScored} - {player}
        </div>
    </div>
</div>

<style>
    .crest-img {
        max-height: 100px;
        max-width: 100px;
    }
</style>
