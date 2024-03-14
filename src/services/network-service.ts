import { HomepageBookmark } from '../models/bookmark-model';
import { HomepageService } from '../models/service-model';

export async function loadServices(url: string) {
	const response = await fetch(`${url}/api/services`);
	const data = await response.json();
	return data as HomepageService[];
}

export async function loadBookmarks(url: string) {
	const response = await fetch(`${url}/api/bookmarks`);
	const data = await response.json();
	return data as HomepageBookmark[];
}
