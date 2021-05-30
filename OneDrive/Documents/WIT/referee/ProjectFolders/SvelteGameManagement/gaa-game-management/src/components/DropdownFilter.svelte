<script lang="ts">
    import { auth, db, rtdb } from "../services/firebase";
    export let countyTeams: {
        countyId: string;
        countyName: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }[];
    export let clubTeams: {
        clubId: string;
        clubName: string;
        competitionCounty: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }[];
    export let aClubsCounty: string[];

    let hurling = "Hurling";
    let hurlingChecked = false;
    let football = "Football";
    let footballChecked = false;
    let filterByClub = "Club Games";
    let filterClubChecked = false;
    let filterByCounty = "County Games";
    let filterCountyChecked = false;

    let countyTeamsChecked: boolean[] = [];
    let clubTeamsChecked: boolean[] = [];
</script>

<nav id="dropdown-filter" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">FILTER RESULTS</span>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
                <!-- Sport Type Drop Down -->
                <li class="nav-item dropdown dropdown-list-header">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDarkDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Sport Type
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                        aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                        <li>
                            <input
                                class="form-check-input dropdown-list-checkbox"
                                type="checkbox"
                                value="hurling"
                                id="hurlingChecked"
                            />
                            <label
                                class="form-check-label dropdown-list-label"
                                for="hurlingChecked"
                            >
                                {hurling}
                            </label>
                        </li>
                        <li>
                            <input
                                class="form-check-input dropdown-list-checkbox"
                                type="checkbox"
                                value="football"
                                id="footballChecked"
                            />
                            <label
                                class="form-check-label dropdown-list-label"
                                for="footballChecked"
                            >
                                {football}
                            </label>
                        </li>
                    </ul>
                </li>

                <!-- Club Or County Dropdown -->
                <li class="nav-item dropdown dropdown-list-header">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDarkDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Club Or County
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                        aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                        <li>
                            <input
                                class="form-check-input dropdown-list-checkbox"
                                type="checkbox"
                                value="club"
                                id="clubChecked"
                            />
                            <label
                                class="form-check-label dropdown-list-label"
                                for="clubChecked"
                            >
                                {filterByClub}
                            </label>
                        </li>
                        <li>
                            <input
                                class="form-check-input dropdown-list-checkbox"
                                type="checkbox"
                                value="county"
                                id="countyChecked"
                            />
                            <label
                                class="form-check-label dropdown-list-label"
                                for="countyChecked"
                            >
                                {filterByCounty}
                            </label>
                        </li>
                    </ul>
                </li>

                <!-- County Teams DropDown -->
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
                <!-- Club Teams  -->
                <li class="nav-item dropdown dropdown-list-header">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdownClubTeams"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Club Teams
                    </a>
                    <ul
                        class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                        aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                        <!-- For Each Club Team playing today add them to the list -->
                        {#if aClubsCounty.length > 0}
                            {#each aClubsCounty as county}
                                <li>
                                    <!-- svelte-ignore a11y-invalid-attribute -->
                                    <a class="dropdown-item" href="#">
                                        <h6
                                            class="dropdown-header dropdown-county-header"
                                        >
                                            {county}
                                        </h6>
                                    </a>
                                    <!-- </li> -->
                                    <ul
                                        class="dropdown-menu dropdown-submenu dropdown-submenu-right"
                                    >
                                        {#if clubTeams.length > 0}
                                            {#each clubTeams as team}
                                                {#if team.competitionCounty === county}
                                                    <li>
                                                        <input
                                                            class="form-check-input dropdown-list-checkbox"
                                                            type="checkbox"
                                                            value={team.clubName}
                                                            id={team.clubId}
                                                        />
                                                        <label
                                                            class="form-check-label dropdown-list-label"
                                                            for={team.clubId}
                                                        >
                                                            {team.clubName}
                                                        </label>
                                                    </li>
                                                {/if}
                                            {/each}
                                        {/if}
                                        <li><hr class="dropdown-divider" /></li>
                                    </ul>
                                </li>
                            {/each}
                        {:else}
                            <p>Todays Games</p>
                        {/if}
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>

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

        .dropdown-county-header {
            font-size: large;
        }
        #dropdown-filter {
            padding: 0px 50px;
        }
    }
</style>
