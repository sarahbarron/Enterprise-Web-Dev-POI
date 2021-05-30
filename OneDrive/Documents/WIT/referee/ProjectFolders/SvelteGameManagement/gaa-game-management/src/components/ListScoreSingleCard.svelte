<script lang="ts">
    export let id: string;
    export let crest: string;
    export let time: string;
    export let team: string;
    export let scoreType: string;
    export let player: string;
</script>

<div {id} class="row">
    <img
        src={crest || ""}
        id="crest-A-img card-img"
        class="col-auto img-fluid mini-crest order-lg-2"
        alt="Scoring Team's Crest"
    />
    <div class="col-auto col-lg-2 order-lg-1">{time}</div>
    <div class="col-3 d-none d-md-block order-lg-3">{team}:</div>
    <div class="col col-auto col-lg-2 order-lg-4 ">
        {scoreType}
    </div>

    <div class="col-auto col-lg-3 order-lg-5">{player}</div>
</div>

<style>
    .mini-crest {
        max-height: 50px;
        max-width: 50px;
    }

    @media (min-width: 768px) {
        .row {
            font-size: x-large;
        }
    }
</style>
