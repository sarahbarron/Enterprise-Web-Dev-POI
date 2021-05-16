<script lang="ts">
	import router from "page";
	import Auth from "./routes/auth.svelte";
	import Index from "./routes/index.svelte";
	import Live from "./routes/live.svelte";
	import NotFound from "./routes/notfound.svelte";
	import { queryString } from "./services/util";

	let page;
	let params = {};
	let qs = {};

	router("/", () => (page = Index));
	router("/live", () => (page = Live));
	router(
		"/404/:msg",
		(ctx: { params: {}; querystring: string }, next) => {
			params = ctx.params;
			next();
		},
		() => (page = NotFound)
	);
	router(
		"/auth",
		(ctx, next) => {
			qs = queryString(ctx.querystring);
			next();
		},
		() => (page = Auth)
	);
	router("/login", () => router.redirect("/auth"));
	router("/register", () => router.redirect("/auth"));

	router("/*", () => (page = NotFound));
	router.start();

	// function queryString(unparsed) {
	// 	const separated = unparsed.replace("?", "").split("&");
	// 	if (!separated) return {};

	// 	const query = {};
	// 	for (let item of separated) {
	// 		const x = item.split("=");
	// 		query[x[0]] = x[1];
	// 	}
	// 	return query;
	// }
</script>

<svelte:component this={page} {params} {qs} />
