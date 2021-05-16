<script lang="ts">
    import { auth, googleAuth } from "../services/firebase";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import ErrorAlert from "./ErrorAlert.svelte";

    export let authMode: "login" | "register" = "register";
    let isAuthenticated = false;
    let err: string | null = null;

    const eventDispatch = createEventDispatcher();

    // only authenticate the user if the user is not already authenticated
    auth.onAuthStateChanged((user) => {
        isAuthenticated = !!user;
        if (user) eventDispatch("auth");
    });

    function login() {
        // again, remove "as HTMLInputElement" if using js
        const email = (document.getElementById("l-email") as HTMLInputElement)
            .value;
        const password = (
            document.getElementById("l-password") as HTMLInputElement
        ).value;

        // basic form validation
        if (!email || !password) {
            err = "Fill out all fields!";
            return;
        }
        err = "";

        // sign in using firebase
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                eventDispatch("done");
                eventDispatch("auth");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }

    function register() {
        const email = (document.getElementById("r-email") as HTMLInputElement)
            .value;
        const password = (
            document.getElementById("r-password") as HTMLInputElement
        ).value;
        const cpassword = (
            document.getElementById("r-cpassword") as HTMLInputElement
        ).value;

        // form validation
        if (!email || !password || !cpassword) {
            err = "Fill out all fields!";
            return;
        }
        if (password !== cpassword) {
            err = "Passwords don't match!";
            return;
        }
        err = "";

        // creating the user
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                eventDispatch("done");
                eventDispatch("auth");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }

    function google() {
        auth.signInWithPopup(googleAuth)
            .then(() => {
                eventDispatch("auth");
                eventDispatch("done");
            })
            .catch((e) => {
                err = `(${e.code}) ${e.message}`;
            });
    }
    function logout() {
        if (auth.currentUser) {
            auth.signOut()
                .then(() => {
                    eventDispatch("done");
                    eventDispatch("logout");
                })
                .catch((e) => {
                    throw new Error(e);
                });
        }
    }
</script>

<div class="w3-card-4" style="width: 40%; margin: 1rem auto">
    {#if !isAuthenticated}
        <div class="w3-container">
            <h2 class="w3-center">
                {authMode === "login" ? "Login" : "Register"} GAA Officials Registration
            </h2>
        </div>
        <div class="w3-container">
            <div
                class="w3-bar w3-center w3-border-bottom w3-border-gray w3-text-dark-gray"
            >
                <button
                    on:click={() => (authMode = "login")}
                    class="w3-bar-item w3-button w3-text-center {authMode ===
                        'login' && 'w3-blue'}"
                    style="width: 50%">LOGIN</button
                >
                <button
                    on:click={() => (authMode = "register")}
                    class="w3-bar-item w3-button w3-text-center {authMode ===
                        'register' && 'w3-blue'}"
                    style="width: 50%">REGISTER</button
                >
            </div>
            <!-- Email login/register forms -->
            {#if authMode === "login"}
                <form in:fade on:submit|preventDefault={login}>
                    {#if err}
                        <ErrorAlert message={err} />
                    {/if}
                    <h4>Login</h4>
                    <p>
                        <label for="l-email">Email</label>
                        <input
                            type="email"
                            class="w3-input w3-border"
                            placeholder="Enter your email"
                            id="l-email"
                        />
                    </p>
                    <p>
                        <label for="l-password">Password</label>
                        <input
                            type="password"
                            class="w3-input w3-border"
                            placeholder="Enter your password"
                            id="l-password"
                        />
                    </p>
                    <p>
                        <button type="submit" class="w3-button w3-blue"
                            >Login</button
                        >
                        <button
                            on:click={() => (authMode = "register")}
                            type="button"
                            class="w3-button w3-light-gray">Register</button
                        >
                    </p>
                </form>
            {:else}
                <form in:fade on:submit|preventDefault={register}>
                    {#if err}
                        <ErrorAlert message={err} />
                    {/if}
                    <h4>Register</h4>
                    <p>
                        <label for="r-email">Email</label>
                        <input
                            type="email"
                            class="w3-input w3-border"
                            placeholder="Enter your email"
                            id="r-email"
                        />
                    </p>
                    <p>
                        <label for="r-password">Password</label>
                        <input
                            type="password"
                            class="w3-input w3-border"
                            placeholder="Enter a password"
                            id="r-password"
                        />
                    </p>
                    <p>
                        <label for="r-cpassword">Confirm Password</label>
                        <input
                            type="password"
                            class="w3-input w3-border"
                            placeholder="Re-enter that password"
                            id="r-cpassword"
                        />
                    </p>
                    <p>
                        <button type="submit" class="w3-button w3-blue"
                            >Register</button
                        >
                        <button
                            on:click={() => (authMode = "login")}
                            type="button"
                            class="w3-button w3-light-gray">Login</button
                        >
                    </p>
                </form>
            {/if}
            <hr />
            <p>
                <button
                    class="w3-button w3-blue"
                    style="width: 100%"
                    on:click={google}
                    ><i class="fab fa-google" /> Sign in with Google</button
                >
            </p>
        </div>
    {:else}
        <div class="w3-container">
            <h2>Logged in</h2>
        </div>
        <div class="w3-container">
            <p class="w3-large w3-text-green w3-center">
                <i class="fas fa-check fa-5x" />
            </p>
            <p class="w3-center">Logged in</p>
            <p>
                <button
                    class="w3-button w3-blue"
                    style="width: 100%"
                    on:click={logout}>Log out</button
                >
            </p>
        </div>
    {/if}
</div>
