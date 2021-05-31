
import {
    hurlingChecked,
    footballChecked,
    allGames,
    filteredGames,
    clubChecked,
    countyChecked,
    selectedCounties,
    selectedClubs
} from "../services/store";


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
let selected_counties: string[];
let selected_clubs: string[];
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

const unsubscribeSelectedClubs = selectedClubs.subscribe((value) => {
    selected_clubs = value;
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

    let gamesCounty = [];
    if (selected_counties.length > 0) {
        gamesCounty = games;
        let teamA_all_games = games;
        let teamB_all_games = games;
        let teamAGames = teamA_all_games.filter((f) => selected_counties.includes(f.teamAName));
        let teamBGames = teamB_all_games.filter((f) => selected_counties.includes(f.teamBName));
        gamesCounty = [...new Set(teamAGames.concat(teamBGames))];
    }

    let gamesClub = [];
    if (selected_clubs.length > 0) {
        gamesClub = games;
        let teamA_all_games = games;
        let teamB_all_games = games;
        let teamAGames = teamA_all_games.filter((f) => selected_clubs.includes(f.teamAName));
        let teamBGames = teamB_all_games.filter((f) => selected_clubs.includes(f.teamBName));
        gamesClub = [...new Set(teamAGames.concat(teamBGames))];
        console.log(`gamesClub ${gamesClub}`);
    }

    if ((gamesClub.length != 0) || gamesCounty.length != 0) {
        games = [...new Set(gamesClub.concat(gamesCounty))];
    }

    filteredGames.set(games);
    return;
}