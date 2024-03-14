export default function DashboardFilter({
	filters,
	currentFilter,
	filterChanged,
}: {
	filters: string[];
	currentFilter: string;
	filterChanged: (f: string) => void;
}) {
	return (
		<div className='flex justify-end -mt-2 mb-3'>
			<select
				id='tabs'
				name='tabs'
				className='block w-fit rounded-lg bg-slate-900/10 border-slate-800 text-slate-300 h-10 focus:border-slate-800 focus:ring-slate-800'
				defaultValue={currentFilter}
				onChange={e => filterChanged(e.target.value)}
			>
				{filters.map(filter => (
					<option key={filter}>{filter}</option>
				))}
			</select>
		</div>
	);
}
