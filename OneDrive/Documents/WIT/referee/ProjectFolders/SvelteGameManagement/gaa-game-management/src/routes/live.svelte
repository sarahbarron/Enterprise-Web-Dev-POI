<script lang="ts">
    import { auth, db, rtdb } from "../services/firebase";
    import router from "page";
    import Score from "../components/Score.svelte";
    import Filter from "../components/Filter.svelte";
    import DropdownFilter from "../components/DropdownFilter.svelte";
    import { onMount } from "svelte";

    interface ThisGame {
        childKey: string;
        competitionName: string;
        teamACrest: string;
        teamAName: string;
        teamBCrest: string;
        teamBName: string;
        startTime: string;
        sportType: string;
    }

    interface CountyTeam {
        countyId: string;
        countyName: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }
    interface ClubTeam {
        clubId: string;
        clubName: string;
        competitionCounty: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }

    // let user: User | null;`

    let games: ThisGame[] = [];
    let countyTeams: CountyTeam[] = [];
    let clubTeams: ClubTeam[] = [];
    let aClubsCounty: string[] = [];
    let teamAPlayers: string[] = [];
    let teamBPlayers: string[] = [];

    onMount(async () => {
        const getGames = rtdb.ref(`games/`).once("value", function (snapshot) {
            var data = snapshot.val();
            if (data != null) {
                snapshot.forEach((childSnapshot) => {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    var competitionName =
                        childSnapshot.val().competition.competitionName;
                    var teamAName = childSnapshot.val().teamA.teamName;
                    var teamACrest = childSnapshot.val().teamA.crest;
                    var teamBName = childSnapshot.val().teamB.teamName;
                    var teamBCrest = childSnapshot.val().teamB.crest;
                    var startTime = childSnapshot.val().times.startTime;
                    var clubIdA = childSnapshot.val().teamA.clubId;
                    var clubIdB = childSnapshot.val().teamB.clubId;
                    var countyIdA = childSnapshot.val().teamA.countyId;
                    var countyIdB = childSnapshot.val().teamB.countyId;
                    var sportType = childSnapshot.val().sportType;
                    var isACountyGame = childSnapshot.val().isACountyGame;
                    var isAClubGame = childSnapshot.val().isAClubGame;
                    var teamATeamSheet = childSnapshot.val().teamA.players;
                    var teamBTeamSheet = childSnapshot.val().teamB.players;
                    var competitionCounty =
                        childSnapshot.val().competition.competitionCounty;
                    if (teamATeamSheet != undefined) {
                        for (let player in teamATeamSheet) {
                            teamAPlayers = [...teamAPlayers, player];
                        }
                    }
                    if (teamBTeamSheet != undefined) {
                        for (let player in teamBTeamSheet) {
                            teamBPlayers = [...teamBPlayers, player];
                        }
                    }
                    //  If the Game is a club game add Team As club details
                    if (clubIdA != undefined) {
                        if (!clubTeams.includes(teamAName)) {
                            var club = {
                                clubId: clubIdA,
                                clubName: teamAName,
                                competitionCounty: competitionCounty,
                                isAClubGame: isAClubGame,
                                isACountyGame: isACountyGame,
                            };

                            clubTeams = [...clubTeams, club];

                            // Add the clubs county to the array of clubs counties
                            // if its not there already
                            if (!aClubsCounty.includes(competitionCounty)) {
                                aClubsCounty = [
                                    ...aClubsCounty,
                                    competitionCounty,
                                ];
                            }
                        }
                    }
                    // If the game is a county game add team As county team details
                    else if (countyIdA != undefined) {
                        if (
                            !countyTeams.some((p) => p.countyId === countyIdA)
                        ) {
                            var county = {
                                countyId: countyIdA,
                                countyName: countyIdA,
                                isAClubGame: isAClubGame,
                                isACountyGame: isACountyGame,
                            };
                            countyTeams = [...countyTeams, county];
                        }
                    }

                    // if the game is a club game add Team Bs club details
                    if (clubIdB != undefined) {
                        if (!clubTeams.includes(teamBName)) {
                            var club = {
                                clubId: clubIdB,
                                clubName: teamBName,
                                competitionCounty: competitionCounty,
                                isAClubGame: isAClubGame,
                                isACountyGame: isACountyGame,
                            };
                            clubTeams = [...clubTeams, club];

                            // add the clubs county to an array
                            if (!aClubsCounty.includes(competitionCounty)) {
                                aClubsCounty = [
                                    ...aClubsCounty,
                                    competitionCounty,
                                ];
                            }
                        }
                    }
                    // If the game is a county game add Team Bs county details
                    else if (countyIdB != undefined) {
                        if (
                            !countyTeams.some((p) => p.countyId === countyIdB)
                        ) {
                            var county = {
                                countyId: countyIdB,
                                countyName: countyIdB,
                                isAClubGame: isAClubGame,
                                isACountyGame: isACountyGame,
                            };
                            countyTeams = [...countyTeams, county];
                        }
                    }
                    var game = {
                        childKey: childKey,
                        competitionName: competitionName,
                        teamACrest: teamACrest,
                        teamAName: teamAName,
                        teamBCrest: teamBCrest,
                        teamBName: teamBName,
                        startTime: startTime,
                        sportType: sportType,
                    };
                    games = [...games, game];
                });

                countyTeams.sort(
                    (first, second) =>
                        0 - (first.countyName > second.countyName ? -1 : 1)
                );
                clubTeams.sort(
                    (first, second) =>
                        0 - (first.clubName > second.clubName ? -1 : 1)
                );
                aClubsCounty.sort();
            }
        });
    });
</script>

<div class="container-fluid">
    <h1>GAA Live Scores</h1>
    <h2>
        Todays live scores from all Irish Club and County GAA Hurling and
        Football games
    </h2>

    <br />
    <DropdownFilter {countyTeams} {clubTeams} {aClubsCounty} />
    <div class="row">
        <!-- Current Total Scores -->
        <div class="col-12">
            <div>
                {#if games.length > 0}
                    {#each games as s (s.childKey)}
                        <Score {...s} {teamAPlayers} {teamBPlayers} />
                    {/each}
                {:else}
                    <p class="w3-center w3-text-gray">
                        Loading todays games....
                    </p>
                {/if}
                <br id="scroll-to" />

                <br />
            </div>
            <br />
        </div>
    </div>
</div>

<style>
    h1 {
        text-align: center;
        font-size: 50px;
    }
    h2 {
        text-align: center;
        font-size: 20px;
    }
    @media (min-width: 768px) {
        h1 {
            font-size: 100px;
        }
        h2 {
            font-size: xx-large;
        }
    }
</style>
