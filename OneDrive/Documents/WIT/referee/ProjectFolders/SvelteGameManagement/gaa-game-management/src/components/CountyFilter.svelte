<script lang="ts">
    import { allGames, selectedCounties } from "../services/store";
    import { onDestroy } from "svelte";
    import { filterGames } from "../services/filterList";
    interface ThisGame {
        childKey: string;
        competitionName: string;
        teamACrest: string;
        teamAName: string;
        teamBCrest: string;
        teamBName: string;
        startTime: string;
        sportType: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }

    export let countyTeams: {
        countyId: string;
        countyName: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }[];

    let all_games: ThisGame[];
    let selected_counties: ThisGame[];
    // Subscibe to store values
    const unsubscribeSelectedCounties = selectedCounties.subscribe((value) => {
        selected_counties = value;
    });
    onDestroy(unsubscribeSelectedCounties);
    const unsubscribeAllGames = allGames.subscribe((value) => {
        all_games = value;
    });
    onDestroy(unsubscribeAllGames);
</script>

<li class="nav-item dropdown dropdown-list-header">
    <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDarkDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
        County Teams
    </a>
    <ul
        class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
        aria-labelledby="navbarDarkDropdownMenuLink"
    >
        <!--  For each county team playing today add to the list -->
        {#if countyTeams.length > 0}
            {#each countyTeams as team}
                <li>
                    <input
                        class="form-check-input dropdown-list-checkbox"
                        type="checkbox"
                        value={team.countyId}
                        id={team.countyId}
                    />
                    <label
                        class="form-check-label dropdown-list-label"
                        for={team.countyId}
                    >
                        {team.countyName}
                    </label>
                </li>
            {/each}
        {:else}
            <p>Todays Games</p>
        {/if}
    </ul>
</li>

<style>
    @media (min-width: 768px) {
        .dropdown-list-checkbox {
            height: 1em;
            width: 1em;
            margin: 20px 10px;
            padding: 12px;
        }
        .dropdown-list-header {
            font-size: x-large;
            padding: 5px 50px;
        }
        .dropdown-list-label {
            font-size: x-large;
            padding: 12px 12px 12px 0px;
        }
    }
</style>
