<script lang="ts">
    import { selectedCounties } from "../services/store";
    import { onDestroy } from "svelte";
    import { filterGames } from "../services/filterList";

    interface countyTeams {
        countyId: string;
        countyName: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }
    export let countyTeams: {
        countyId: string;
        countyName: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }[];

    // Subscibe to store values
    let store_selected_counties: string[];
    const unsubscribeSelectedCounties = selectedCounties.subscribe((value) => {
        store_selected_counties = value;
    });
    onDestroy(unsubscribeSelectedCounties);

    let selected_counties: string[] = [];
    $: if (selected_counties.length >= 0) {
        selectedCounties.set(selected_counties);
        filterGames();
    }
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
                        bind:group={selected_counties}
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
