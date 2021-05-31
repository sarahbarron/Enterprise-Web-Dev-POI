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

let hurling: boolean;
let football: boolean;
let club: boolean;
let county: boolean;
let selected_counties: string[];
let selected_clubs: string[];
let all_games: ThisGame[];

// Subscribe to store values
hurlingChecked.subscribe((value) => { hurling = value; });
footballChecked.subscribe((value) => { football = value; });
clubChecked.subscribe((value) => { club = value; });
countyChecked.subscribe((value) => { county = value; });
allGames.subscribe((value) => { all_games = value; });
selectedCounties.subscribe((value) => { selected_counties = value; });
selectedClubs.subscribe((value) => { selected_clubs = value; });

// Filter games 
export const filterGames = async () => {
    let games: ThisGame[] = all_games;

    // filter games by store types first
    if ((hurling && football) || (!hurling && !football)) { }
    else if (hurling) {
        games = games.filter((game) => {
            return game.sportType === "hurling";
        });
    }
    else if (football) {
        games = games.filter((game) => {
            return game.sportType === "football";
        });
    }

    // Then filter by club or county 
    if ((club && county) || (!club && !county)) { }
    else if (club) {
        games = games.filter((game) => {
            return game.isAClubGame === true;
        });
    }
    else if (county) {
        games = games.filter((game) => {
            return game.isACountyGame === true;
        });
    }

    // Filter by selected counties
    let gamesCounty = [];
    let countiesFiltered: boolean = false
    if (selected_counties.length > 0) {
        gamesCounty = games;
        let teamA_all_games = games;
        let teamB_all_games = games;
        let teamAGames = teamA_all_games.filter((f) => selected_counties.includes(f.teamAName));
        let teamBGames = teamB_all_games.filter((f) => selected_counties.includes(f.teamBName));
        gamesCounty = [...new Set(teamAGames.concat(teamBGames))];
        countiesFiltered = true;
    }

    // Filter by selected clubs
    let gamesClub = [];
    let clubsFiltered: boolean = false
    if (selected_clubs.length > 0) {
        gamesClub = games;
        let teamA_all_games = games;
        let teamB_all_games = games;
        let teamAGames = teamA_all_games.filter((f) => selected_clubs.includes(f.teamAName));
        let teamBGames = teamB_all_games.filter((f) => selected_clubs.includes(f.teamBName));
        gamesClub = [...new Set(teamAGames.concat(teamBGames))];
        console.log(`gamesClub ${gamesClub}`);
        clubsFiltered = true
    }

    // if a club(s) or counties are selected concatenate the clubs and the counties filtered.
    if (clubsFiltered || countiesFiltered) {
        games = [...new Set(gamesClub.concat(gamesCounty))];
    }

    // set the filtered games in the store.
    filteredGames.set(games);
    return;
}