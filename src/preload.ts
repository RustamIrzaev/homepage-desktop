import { contextBridge, ipcRenderer } from 'electron';
import { ConfigType } from './config';

contextBridge.exposeInMainWorld('configAPI', {
	get: (key: string) => ipcRenderer.invoke('config:get', key),
	set: (key: string, value: keyof ConfigType) =>
		ipcRenderer.invoke('config:set', key, value),
});
