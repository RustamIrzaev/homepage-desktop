import { ConfigType } from '../config';

export default function useAppConfig() {
	const get = async (key: string) => {
		return await window.configAPI.get(key);
	};

	const set = async (key: keyof ConfigType, value: string | boolean) => {
		return await window.configAPI.set(key, value);
	};

	return {
		getValue: get,
		setValue: set,
	};
}
