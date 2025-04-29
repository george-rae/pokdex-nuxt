export const loading: Ref<boolean> = ref(false);

export const screensize: { width: Ref<number>; height: Ref<number> } =
	useWindowSize();

export const isDesktop: Ref<boolean> = computed(
	() => screensize.width.value >= 1400
);

export const menuOpen: Ref<boolean> = ref(false);

const prefDark = window.matchMedia("prefers-color-scheme: dark").matches;
export const themeDark: Ref<boolean> = ref(prefDark);
