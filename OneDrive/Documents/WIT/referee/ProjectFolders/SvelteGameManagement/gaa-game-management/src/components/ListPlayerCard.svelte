<script lang="ts">
    import { rtdb } from "../services/firebase";
    export let teamPlayers: string[];
    export let childKey: string;
    export let teamAorB: string;

    interface Player {
        playerId: string;
        playerName: string;
        jerseyNumber: number;
        fieldPosition: number;
        onField: boolean;
    }
    let teamPlayersDetails: Player[] = [];

    let x = 0;
    if (teamPlayers != undefined) {
        while (x < teamPlayers.length) {
            let playerId = teamPlayers[x];
            const latestScoreListener = rtdb
                .ref(`games/${childKey}/${teamAorB}/players/${playerId}`)
                .on("value", function (snapshot) {
                    var data = snapshot.val();
                    if (data != null) {
                        let playerName = snapshot.val().playerName;
                        let jerseyNumber = snapshot.val().jerseyNumber;
                        let fieldPosition = snapshot.val().fieldPosition;
                        let onField = snapshot.val().onField;

                        let player = {
                            playerId: playerId,
                            playerName: playerName,
                            jerseyNumber: jerseyNumber,
                            fieldPosition: fieldPosition,
                            onField: onField,
                        };
                        teamPlayersDetails = [...teamPlayersDetails, player];
                    }
                });
            x++;
        }
    }
</script>

<div class="card">
    <div class="card-body">
        <div class="row teamsheetHeadings">
            <div class="col-2 d-none d-md-block"><h4>Start Position</h4></div>
            <div class="col-3 d-none d-md-block"><h4>Jersey Number</h4></div>
            <div class="col-7 d-none d-md-block"><h4>Player Name</h4></div>
        </div>

        <div class="row">
            {#if teamPlayersDetails != undefined}
                {#if teamPlayersDetails.length > 0}
                    {#each teamPlayersDetails as s (s.playerId)}
                        {#if s.onField}
                            {#if s.fieldPosition != undefined}
                                <div class="col-md-2 d-none d-md-block">
                                    <p>{s.fieldPosition}</p>
                                </div>
                            {:else}
                                <div class="col-md-2 d-none d-md-block">
                                    <p>-</p>
                                </div>
                            {/if}

                            <div class="col-3"><p>{s.jerseyNumber}</p></div>
                            <div class="col-9 col-md-7">
                                <p>{s.playerName}</p>
                            </div>
                        {/if}
                    {/each}
                {:else}
                    <p class="w3-center w3-text-gray">....</p>
                {/if}
            {:else}
                <p class="w3-center w3-text-gray">....</p>
            {/if}
        </div>
        <hr />
        <div class="row">
            <div class="col-12 teamsheetHeadings"><h4>Substitutes</h4></div>
        </div>
        <div class="row">
            {#if teamPlayersDetails != undefined}
                {#if teamPlayersDetails.length > 0}
                    {#each teamPlayersDetails as s (s.playerId)}
                        {#if !s.onField}
                            {#if s.fieldPosition != undefined}
                                <div class="col-2 d-none d-md-block">
                                    <p>{s.fieldPosition}</p>
                                </div>
                            {:else}
                                <div class="col-2 d-none d-md-block">
                                    <p>-</p>
                                </div>
                            {/if}
                            <div class="col-3"><p>{s.jerseyNumber}</p></div>
                            <div class="col-9 col-md-7">
                                <p>{s.playerName}</p>
                            </div>
                        {/if}
                    {/each}
                {:else}
                    <p class="w3-center w3-text-gray">....</p>
                {/if}
            {:else}
                <p class="w3-center w3-text-gray">....</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .teamsheetHeadings {
        font-weight: bolder;
    }

    @media (min-width: 768px) {
        p {
            font-size: x-large;
        }
    }
</style>
