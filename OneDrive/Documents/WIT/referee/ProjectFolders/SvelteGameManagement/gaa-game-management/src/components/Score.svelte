<script lang="ts">
    import { onMount } from "svelte";
    import { rtdb } from "../services/firebase";
    import Accordian from "./Accordian.svelte";
    export let childKey: string;
    export let competitionName: string;
    export let teamACrest: string;
    export let teamAName: string;
    export let teamBCrest: string;
    export let teamBName: string;
    export let startTime: string;
    export let sportType: string;
    export let teamAPlayers: string[];
    export let teamBPlayers: string[];

    let teamAGoals: number;
    let teamAPoints: number;
    let teamBGoals: number;
    let teamBPoints: number;
    let latestPlayer: string;
    let latestTime: string;
    let latestScoreType: string;
    let latestTeam: string;

    latestPlayer = undefined;
    latestTime = undefined;
    latestScoreType = undefined;
    latestTeam = undefined;

    onMount(async () => {
        const latestScoreListener = rtdb
            .ref(`games/${childKey}/latest`)
            .on("value", function (snapshot) {
                var data = snapshot.val();

                if (data != null) {
                    teamAGoals = snapshot.val().teamAGoals;
                    teamBGoals = snapshot.val().teamBGoals;
                    teamAPoints = snapshot.val().teamAPoints;
                    teamBPoints = snapshot.val().teamBPoints;
                    latestPlayer = snapshot.val().latestPlayer;
                    latestScoreType = snapshot.val().latestScoreType;
                    latestTeam = snapshot.val().latestTeamName;
                    latestTime = snapshot.val().latestTime;

                    teamAGoals = teamAGoals;
                }
            });
    });
</script>

<div class="score-card" title={`${competitionName} at ${startTime}`}>
    <div class="row no-gutters">
        <div class="col-12 col-lg-6">
            <div class="row no-gutters">
                <div class="col-12">
                    <div class="row no-gutters">
                        <div class="col-12 col-lg-auto">
                            <h3>
                                ({sportType.toLocaleUpperCase()}) {competitionName}:
                            </h3>
                        </div>
                        <div class="col-12 col-lg-auto">
                            <h3>
                                {teamAName} V {teamBName}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row no-gutters">
                <div class="col-6 order-1 col-lg-3 order-lg-1">
                    <img
                        src={teamACrest || ""}
                        id="crest-A-img card-img "
                        class="img-fluid crest"
                        alt="{teamAName} GAA Crest"
                    />
                </div>
                <div class="col-6 order-2 col-lg-3 order-lg-2 score-container">
                    <div class="">
                        <p id="teamAScore" class="card-txt">
                            {teamAGoals} - {teamAPoints}
                        </p>
                    </div>
                </div>
                <div class="col-6 order-4 col-lg-3 order-lg-3 score-container">
                    <div class="">
                        <p class="card-txt">{teamBGoals} - {teamBPoints}</p>
                    </div>
                </div>
                <div class="col-6 order-3 col-lg-3 order-lg-4">
                    <img
                        src={teamBCrest || ""}
                        id="crest-B-img"
                        class="img-fluid crest float-right"
                        alt="{teamBName} GAA Crest"
                    />
                </div>
            </div>
            <div class="row cart-text no-gutters latest-score">
                <div class="col-12 bold-text">
                    {#if latestTime != undefined && latestTeam != undefined && latestPlayer != undefined && latestScoreType != undefined}
                        Latest Score:
                    {/if}
                </div>
                <div class="col-auto">
                    {#if latestTeam == teamAName}
                        <img
                            src={teamACrest || ""}
                            id="crest-A-img card-img"
                            class="img-fluid mini-crest "
                            alt="{teamAName} GAA Crest"
                        />
                    {:else if latestTeam == teamBName}
                        <img
                            src={teamBCrest || ""}
                            id="crest-A-img card-img"
                            class="img-fluid mini-crest "
                            alt="{teamAName} GAA Crest"
                        />
                    {/if}
                </div>
                <div class="col-auto">
                    {#if latestTime != undefined}{latestTime}:{/if}
                </div>
                <div class="col-auto">
                    {#if latestTeam != undefined}{latestTeam}{/if}
                </div>
                <div class="col-auto">
                    {#if latestScoreType != undefined}<span class="bold-text"
                            >{latestScoreType}</span
                        >{/if}
                </div>
                <div class="col-auto latest-player">
                    {#if latestPlayer != undefined}
                        ({latestPlayer}){/if}
                </div>
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <Accordian
                {teamAName}
                {teamBName}
                {childKey}
                {teamAPlayers}
                {teamBPlayers}
                {teamACrest}
                {teamBCrest}
            />
        </div>
    </div>
</div>
<hr />

<style>
    .crest {
        padding: 10px;
        max-height: 100px;
        max-width: 100px;
    }

    .mini-crest {
        max-height: 30px;
        max-width: 30px;
    }
    .card-txt {
        font-size: x-large;
        text-align: center;
    }

    .score-container {
        align-self: center;
    }
    h3 {
        padding: 0px 10px;
    }

    .bold-text {
        font-weight: bolder;
    }

    .latest-score {
        font-size: large;
        padding: 10px;
    }

    @media (min-width: 768px) {
        .crest {
            max-height: 150px;
            max-width: 150px;
        }
        .score-card {
            padding: 30px 30px 30px 50px;
        }
        .mini-crest {
            max-height: 50px;
            max-width: 50px;
        }
    }
</style>
