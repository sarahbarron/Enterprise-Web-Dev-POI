import { writable } from 'svelte/store';


export const allGames = writable([]);
export const filteredGames = writable([]);
export const hurlingChecked = writable(false);
export const footballChecked = writable(false);
export const clubChecked = writable(false);
export const countyChecked = writable(false);
export const selectedClubs = writable([]);
export const selectedCounties = writable([]);