export interface HomepageService {
	name: string;
	services: ServiceData[];
}

export interface ServiceData {
	name: string;
	href: string;
	description?: string;
	icon?: string;
}
