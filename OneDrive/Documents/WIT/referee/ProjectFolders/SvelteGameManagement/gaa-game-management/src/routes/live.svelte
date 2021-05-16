<script lang="ts">
    import { auth, db } from "../services/firebase";
    import router from "page";
    import Score from "../components/Score.svelte";
    import { onDestroy } from "svelte";

    // interface User {
    //     email: string;
    //     photoURL: string;
    //     uid: string;
    // }

    interface Score {
        teamB: string;
        teamA: string;
        teamScored: string;
        competition: string;
        player: string;
        scoreType: string;
        teamACrest: string;
        teamBCrest: string;
        teamAGoals: number;
        teamBGoals: number;
        teamAPoints: number;
        teamBPoints: number;
        timestamp: Date;
    }

    // let user: User | null;
    let scores: Score[] = [];
    let games = [];
    const unsubscribe = db.collection("Live").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                scores = [...scores, change.doc.data() as Score];
                games = [...games, change.doc.data().competition];
                setTimeout(() => {
                    if (document.getElementById("scroll-to"))
                        document
                            .getElementById("scroll-to")
                            .scrollIntoView({ behavior: "smooth" });
                }, 500);
            }
        });
    });

    onDestroy(unsubscribe);

    function logout() {
        if (auth.currentUser) {
            auth.signOut()
                .then(() => {})
                .catch((e) => {
                    throw new Error(e);
                });
        }
    }

    // If the users authentication state changes update user
    // auth.onAuthStateChanged(u => user = u);

    // $: {
    //     // if the users state changes to null redirect the user to the login page
    //     if (user === null) router.redirect("/auth?action=login&next=%2Fchat");
    // }
</script>

<!-- {#if typeof user === "undefined"}
    <p class="w3-center w3-section"><i class="fas fa-spinner w3-spin fa-3x"></i> Loading</p> -->
<!-- {:else}
    {#if user} -->
<div class="container">
    <h1>GAA Live Scores</h1>
    <p>
        Todays Live scores from all the club and county GAA Hurling and Football
        games
    </p>

    <br />
    <div class="row">
        <!-- Hide on screens smaller than medium  -->
        <div class="col d-none d-md-block">
            <!-- Filter -->
            <h1>FILTER COUNTIES AND CLUBS</h1>
        </div>
        <!-- Current Total Scores -->
        <div class="col">
            <div>
                <br />
                {#if scores.length > 0}
                    {#each scores as s (s.id)}
                        <Score {...s} />
                    {/each}
                {:else}
                    <p class="w3-center w3-text-gray">
                        Looks like no live scores are coming in yet today
                    </p>
                {/if}
                <br id="scroll-to" />

                <br />
            </div>
            <br />
        </div>
        <div class="col d-none d-md-block">
            <!-- Show all scores -->
            <h1>show scores</h1>
        </div>
    </div>
    <!-- {:else}
        <p class="w3-center w3-section">Not logged in!</p>
    {/if} -->
    <!-- {/if} -->
</div>
