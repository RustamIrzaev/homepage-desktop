import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAppConfig from '../hooks/use-app-config';
import { loadBookmarks, loadServices } from '../services/network-service';
import Bookmarks from './_components/bookmarks';
import DashboardFilter from './_components/dashboard-filter';
import FirstRun from './_components/first-run';
import Services from './_components/services';

const filters = ['All', 'Services', 'Bookmarks'];

export default function Dashboard() {
	const { getValue } = useAppConfig();
	const [currentFilter, setCurrentFilter] = useState(filters[0]);

	const { data: config, isFetching: isConfigLoading } = useQuery({
		queryKey: ['config-data'],
		queryFn: async () => {
			const url = await getValue('url');
			const compactMode = await getValue('compactMode');

			return { url, compactMode };
		},
	});

	const { data: servicesData, isFetching: isServicesFetching } = useQuery({
		queryKey: ['service-data'],
		queryFn: () => loadServices(config.url as string),
		enabled: !!config,
	});

	const { data: bookmarksData, isFetching: isBookmarksFetching } = useQuery({
		queryKey: ['bookmarks-data'],
		queryFn: () => loadBookmarks(config.url as string),
		enabled: !!config,
	});

	if (isConfigLoading || isServicesFetching || isBookmarksFetching) {
		return <div></div>;
	}

	if (!config || !config.url) {
		return <FirstRun />;
	}

	function filterChanged(f: string) {
		setCurrentFilter(f);
	}

	return (
		<>
			<DashboardFilter
				filters={filters}
				currentFilter={currentFilter}
				filterChanged={filterChanged}
			/>

			{(currentFilter === 'All' || currentFilter === 'Services') && (
				<Services data={servicesData} compactMode={!!config.compactMode} />
			)}

			{(currentFilter === 'All' || currentFilter === 'Bookmarks') && (
				<Bookmarks data={bookmarksData} />
			)}
		</>
	);
}
