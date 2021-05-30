<script lang="ts">
    import { rtdb } from "../services/firebase";
    import ListScoreSingleCard from "./ListScoreSingleCard.svelte";
    import { onMount } from "svelte";
    export let childKey: string;
    export let teamACrest: string;
    export let teamBCrest: string;
    export let teamAName: string;
    export let teamBName: string;
    let x = 0;
    interface Score {
        id: string;
        time: string;
        team: string;
        player: string;
        scoreType: string;
        crest: string;
    }
    let allScores: Score[] = [];
    onMount(async () => {
        // Create a listener for new scores
        const scoreRef = rtdb.ref(`games/${childKey}/scores`);
        var newScoreRef = scoreRef.on("child_added", (data) => {
            addScoreElement(
                data.key,
                data.val().latestTime,
                data.val().latestTeamName,
                data.val().latestScoreType,
                data.val().latestPlayer
            );
        });
    });

    let addScoreElement = async function (
        key: string,
        time: string,
        team: string,
        scoreType: string,
        player: string
    ) {
        let crest = "";
        if (team === teamAName) {
            crest = teamACrest;
        } else if (team == teamBName) {
            crest = teamBCrest;
        }
        allScores = [
            ...allScores,
            {
                id: key,
                time: time,
                team: team,
                scoreType: scoreType,
                player: player,
                crest: crest,
            },
        ];
    };
</script>

<div class="card">
    <div class="row">
        {#if allScores.length > 0}
            {#each allScores as s (s.id)}
                <ListScoreSingleCard {...s} />
            {/each}
        {:else}
            <p class="w3-center w3-text-gray">Loading todays games....</p>
        {/if}
    </div>
</div>
