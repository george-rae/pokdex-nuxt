export const loading: Ref<boolean> = ref(false);

export const screensize: { width: Ref<number>; height: Ref<number> } =
	useWindowSize();

export const isDesktop: Ref<boolean> = computed(
	() => screensize.width.value >= 1400
);
