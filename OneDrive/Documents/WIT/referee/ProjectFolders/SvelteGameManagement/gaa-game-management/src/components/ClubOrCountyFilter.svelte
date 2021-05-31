<script lang="ts">
    import { clubChecked, countyChecked, allGames } from "../services/store";
    import { onDestroy } from "svelte";
    import { filterGames } from "../services/filterList";
    let clubX: boolean;
    let countyX: boolean;

    // Subscibe to store values
    const unsubscribeClubChecked = clubChecked.subscribe((value) => {
        clubX = value;
    });
    onDestroy(unsubscribeClubChecked);

    const unsubscribeCountyChecked = countyChecked.subscribe((value) => {
        countyX = value;
    });
    onDestroy(unsubscribeCountyChecked);

    $: if (clubX || !clubX) {
        clubChecked.set(clubX);
        filterGames();
    }

    $: if (countyX || !countyX) {
        countyChecked.set(countyX);
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
                bind:checked={clubX}
            />
            <label
                class="form-check-label dropdown-list-label"
                for="clubChecked"
            >
                Club
            </label>
        </li>
        <li>
            <input
                class="form-check-input dropdown-list-checkbox"
                type="checkbox"
                value="county"
                id="countyChecked"
                bind:checked={countyX}
            />
            <label
                class="form-check-label dropdown-list-label"
                for="countyChecked"
            >
                County
            </label>
        </li>
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
