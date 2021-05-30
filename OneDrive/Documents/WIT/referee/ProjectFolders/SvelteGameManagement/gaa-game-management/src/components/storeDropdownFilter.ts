import { derived, writable, Writable } from "svelte/store";

class MyGame {
    constructor(
        public allGames: Writable<string> = writable(''),
        public games: Writable<string> = writable(''),
    ) { }

    get fullname() {
        // Use derived to access writable values and export as readonly
        return derived(
            [this.allGames, this.games],
            ([$firstName, $lastName]) => {
                return $firstName + " " + $lastName
            }
        )
    }
}
