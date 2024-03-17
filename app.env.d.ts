export {};

declare global {
	interface Window {
		configAPI: {
			get: (key: string) => keyof ConfigType | undefined | boolean | string;
			set: (key: keyof ConfigType, value: string | boolean) => void;
		};
	}
}
