<script lang="ts">
    import { auth, db, rtdb } from "../services/firebase";
    import router from "page";
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
    let filterByClub = "Club";
    let filterClubChecked = false;
    let filterByCounty = "County";
    let filterCountyChecked = false;

    let countyTeamsChecked: boolean[] = [];
    let clubTeamsChecked: boolean[] = [];

    let x = 0;
    while (x < countyTeams.length) {
        countyTeamsChecked[x] = false;
        x++;
    }
    let y = 0;
    while (y < clubTeams.length) {
        clubTeamsChecked[y] = false;
        y++;
    }
</script>

<div class="card">
    <div class="row no-gutters">
        <div class="col-12 card-body">
            <h3>Filter Games</h3>
            <hr />
            <h3>Sport Type</h3>

            <div class="col-12 filter-label">
                <label>
                    <input type="checkbox" bind:checked={hurlingChecked} />
                    {hurling || ""}
                </label>
            </div>
            <div class="col-12 filter-label">
                <label>
                    <input type="checkbox" bind:checked={footballChecked} />
                    {football || ""}
                </label>
            </div>
            <hr />

            <h3>Club or County</h3>

            <div class="col-12 filter-label">
                <label>
                    <input type="checkbox" bind:checked={filterCountyChecked} />
                    {filterByCounty || ""}
                </label>
            </div>
            <div class="col-12 filter-label">
                <label>
                    <input type="checkbox" bind:checked={filterClubChecked} />
                    {filterByClub || ""}
                </label>
            </div>
            <hr />

            <h3>County Teams</h3>

            {#if countyTeams.length > 0}
                {#each countyTeams as team}
                    <div class="col-12 filter-label">
                        <label>
                            <input
                                type="checkbox"
                                bind:checked={countyTeamsChecked[
                                    countyTeams.indexOf(team)
                                ]}
                            />
                            {team.countyName || ""}
                        </label>
                    </div>
                {/each}
            {:else}
                <p>No County Games Today</p>
            {/if}
            <hr />
            <h3>Club Teams</h3>

            {#if aClubsCounty.length > 0}
                {#each aClubsCounty as county}
                    <div class="col-12">
                        <h4>{county}</h4>
                    </div>
                    {#if clubTeams.length > 0}
                        {#each clubTeams as team}
                            {#if team.competitionCounty === county}
                                <div class="col-12" />
                                <div class="col-12 filter-label">
                                    <label>
                                        <input
                                            type="checkbox"
                                            bind:checked={clubTeamsChecked[
                                                clubTeams.indexOf(team)
                                            ]}
                                        />
                                        {team.clubName || ""}
                                    </label>
                                </div>
                            {/if}
                        {/each}
                    {:else}
                        <p>No Club Games Today</p>
                    {/if}
                    <hr />
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    label {
        font-size: x-large;
        padding: 10px;
    }
    input {
        height: 1em;
        width: 1em;
        margin: 0px 10px;
    }
    .card {
        height: 95%;
    }
    h3 {
        margin: 20px 20px 40px 20px;
    }
    h4 {
        margin: 20px;
    }
</style>
