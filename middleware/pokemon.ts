import { useDetailsStore } from "~/stores/details";

export default defineNuxtRouteMiddleware(async (to) => {
	const { name } = to.params;
	const details = useDetailsStore();

	await details
		.fetchDetails(name as string)
		.then(() => (loading.value = false));
});
