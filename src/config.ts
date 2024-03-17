import electron from 'electron';
import fs from 'fs';
import path from 'path';

const configName = 'homepage-desktop-app.json';

export type Version = 'v1';

export type ConfigType = {
	url: string;
	showTrayIcon: boolean;
	compactMode: boolean;
	version: Version;
};

function defaultConfig(): ConfigType {
	return {
		url: '',
		showTrayIcon: true,
		compactMode: false,
		version: 'v1',
	};
}

export default class Store {
	private userDataPath = electron.app.getPath('userData');
	private path = path.join(this.userDataPath, configName);
	private data: ConfigType = defaultConfig();

	init() {
		try {
			const data = fs.readFileSync(this.path).toString();
			this.data = JSON.parse(data);
		} catch (e) {
			console.error(e);
		}

		console.log('config loaded', this.data);
	}

	get(key: string) {
		return this.data[key as keyof ConfigType];
	}

	set(key: keyof ConfigType, value: string | boolean | Version) {
		if (key == 'version') return;

		this.data[key] = value;

		try {
			const data = JSON.stringify(this.data);
			fs.writeFileSync(this.path, data);
		} catch (e) {
			console.error(e);
		}
	}
}
