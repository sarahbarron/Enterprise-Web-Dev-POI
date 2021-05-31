<script lang="ts">
    export let clubTeams: {
        clubId: string;
        clubName: string;
        competitionCounty: string;
        isAClubGame: boolean;
        isACountyGame: boolean;
    }[];
    export let aClubsCounty: string[];
</script>

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
                    <h6 class="dropdown-header dropdown-county-header">
                        {county}
                    </h6>
                </li>
                <!-- </li> -->

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
