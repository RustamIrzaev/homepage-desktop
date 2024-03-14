export interface HomepageBookmark {
	name: string;
	bookmarks: BookmarkData[];
}

export interface BookmarkData {
	name: string;
	href: string;
	icon?: string;
}
