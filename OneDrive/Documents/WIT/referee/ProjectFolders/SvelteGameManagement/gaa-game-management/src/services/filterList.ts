import { selectedCounties } from './store';
import { hurlingChecked, footballChecked, allGames, filteredGames, clubChecked, countyChecked } from "../services/store";


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
};
interface clubTeams {
    clubId: string;
    clubName: string;
    competitionCounty: string;
    isAClubGame: boolean;
    isACountyGame: boolean;
}[];
interface countyTeams {
    countyId: string;
    countyName: string;
    isAClubGame: boolean;
    isACountyGame: boolean;
}[];

let hurling: boolean;
let football: boolean;
let club: boolean;
let county: boolean;
let selected_counties: countyTeams[];
let all_games: ThisGame[];

const unsubscribeHurlingChecked = hurlingChecked.subscribe((value) => {
    hurling = value;
});
const unsubscribeFootballChecked = footballChecked.subscribe((value) => {
    football = value;
});
const unsubscribeClubChecked = clubChecked.subscribe((value) => {
    club = value;
});
const unsubscribeCountyChecked = countyChecked.subscribe((value) => {
    county = value;

});
const unsubscribeAllGames = allGames.subscribe((value) => {
    all_games = value;

});

const unsubscribeSelectedCounties = selectedCounties.subscribe((value) => {
    selected_counties = value;
});



export const filterGames = async () => {
    let games: ThisGame[] = all_games;
    if ((hurling && football) || (!hurling && !football)) { }
    else if (hurling) {
        games = all_games.filter((game) => {
            return game.sportType === "hurling";
        });
    }
    else if (football) {
        games = all_games.filter((game) => {
            return game.sportType === "football";
        });
    }

    if ((club && county) || (!club && !county)) { }
    else if (club) {
        games = all_games.filter((game) => {
            return game.isAClubGame === true;
        });
    }
    else if (county) {
        games = all_games.filter((game) => {
            return game.isACountyGame === true;
        });
    }

    filteredGames.set(games);
    return;
}