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

	const { data: urlValue, isFetching: isConfigLoading } = useQuery({
		queryKey: ['config-data'],
		queryFn: async () => await getValue('url'),
	});

	const { data: servicesData, isFetching: isServicesFetching } = useQuery({
		queryKey: ['service-data'],
		queryFn: () => loadServices(urlValue as string),
		enabled: !!urlValue,
	});

	const { data: bookmarksData, isFetching: isBookmarksFetching } = useQuery({
		queryKey: ['bookmarks-data'],
		queryFn: () => loadBookmarks(urlValue as string),
		enabled: !!urlValue,
	});

	if (isConfigLoading || isServicesFetching || isBookmarksFetching) {
		return <div></div>;
	}

	if (!urlValue) {
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
				<Services data={servicesData} />
			)}

			{(currentFilter === 'All' || currentFilter === 'Bookmarks') && (
				<Bookmarks data={bookmarksData} />
			)}
		</>
	);
}
