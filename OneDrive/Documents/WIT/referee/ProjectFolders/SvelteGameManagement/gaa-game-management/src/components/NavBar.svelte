<script lang="ts">
    import ClubOrCountyFilter from "./ClubOrCountyFilter.svelte";
    import CountyFilter from "./CountyFilter.svelte";
    import SportTypeFilter from "./SportTypeFilter.svelte";
    import ClubFilter from "./ClubFilter.svelte";
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
                <SportTypeFilter />
                <!-- Club Or County Dropdown -->

                <ClubOrCountyFilter />

                <!-- County Teams DropDown -->
                <CountyFilter {countyTeams} />
                <ClubFilter {clubTeams} {aClubsCounty} />
            </ul>
        </div>
    </div>
</nav>

<style>
    @media (min-width: 768px) {
        #dropdown-filter {
            padding: 0px 50px;
        }
    }
</style>
