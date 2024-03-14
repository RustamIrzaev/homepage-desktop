export {};

declare global {
	interface Window {
		configAPI: {
			get: (key: string) => keyof ConfigType | undefined;
			set: (key: keyof ConfigType, value: string | boolean) => void;
		};
	}
}
