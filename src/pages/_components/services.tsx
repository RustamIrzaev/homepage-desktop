import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { HomepageService, ServiceData } from '../../models/service-model';
// import * as siIcons from 'simple-icons';
// import * as mdiIcons from '@mdi/js';

export default function Services({
	data,
	compactMode,
}: {
	data: HomepageService[];
	compactMode?: boolean;
}) {
	return (
		<div>
			{data?.map(item => (
				<div key={item.name} className='mb-8'>
					<h3 className='text-xl text-center font-semibold leading-6 text-slate-400 flex items-center'>
						<span className='w-full text-start'>{item.name}</span>
						<span className='text-sm text-slate-700 w-fit'>service</span>
					</h3>

					<dl className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{item?.services?.map(item =>
							compactMode ? (
								<ServiceCardCompact key={item.href} item={item} />
							) : (
								<ServiceCard key={item.href} item={item} />
							)
						)}
					</dl>
				</div>
			))}
		</div>
	);
}

function ServiceCardCompact({ item }: { item: ServiceData }) {
	return (
		<div
			key={item.href}
			className='overflow-hidden rounded-lg px-2 pb-1 pt-1 shadow shadow-black bg-gradient-to-r from-slate-700/20 to-slate-900 hover:shadow-slate-500'
		>
			<div className='flex items-center justify-between w-full'>
				<p className='ml-4 truncate text-base font-medium text-slate-100'>
					{item.name}
				</p>
				<div className='text-sm flex items-center justify-end'>
					<Link
						to={`external://${item.href}`}
						target='_blank'
						className='font-medium text-slate-400 hover:text-green-500 flex gap-x-1 items-center justify-end'
					>
						<ArrowTopRightOnSquareIcon className='h-4 w-4 text-slate-600' />{' '}
						Open
					</Link>
				</div>
			</div>
		</div>
	);
}

function ServiceCard({ item }: { item: ServiceData }) {
	// const iconPath = getIconDetails(item).iconPath;
	// const iconColor = getIconDetails(item).iconColor ?? '#ffffff';

	return (
		<div
			key={item.href}
			className='relative overflow-hidden rounded-lg px-2 pb-6 pt-2 shadow shadow-black bg-gradient-to-r from-slate-700/20 to-slate-900 hover:shadow-slate-500'
		>
			<dt>
				{/* <div className='absolute rounded-md bg-slate-400 p-3'>
					<svg
						role='img'
						viewBox='0 0 24 24'
						className={cn(`fill-[${iconColor}]`, 'h-7 w-7 fill-white')}
					>
						<path d={iconPath} />
					</svg>
				</div> */}
				<p className='ml-4 truncate text-lg font-medium text-slate-100'>
					{item.name}
				</p>
				<p className='ml-10 truncate text-sm font-medium text-slate-400 text-wrap'>
					{item.description}
				</p>
			</dt>
			<dd className='ml-16 flex items-baseline pb-4 sm:pb-7'>
				<div className='absolute inset-x-0 bottom-0 px-2 py-1 sm:px-4 bg-gradient-to-r from-slate-700/10 to-slate-900 hover:from-slate-700/20 hover:to-slate-900/10'>
					<div className='text-sm w-full'>
						<Link
							to={`external://${item.href}`}
							target='_blank'
							className='font-medium text-slate-400 hover:text-green-500 flex gap-x-1 items-center justify-end'
						>
							<ArrowTopRightOnSquareIcon className='h-4 w-4 text-slate-600' />{' '}
							Open
						</Link>
					</div>
				</div>
			</dd>
		</div>
	);
}

// function getIconDetails(item: ServiceData) {
// 	let iconPath = '';
// 	let iconColor = '#ffffff';

// 	if (item?.icon) {
// 		const provSI = item?.icon.startsWith('si-');
// 		const provMDI = item?.icon.startsWith('mdi-');
// 		const lastDash = item.icon.lastIndexOf('-#');

// 		if (lastDash !== -1) {
// 			iconColor = item.icon.substring(lastDash + 1);
// 		}

// 		if (provSI) {
// 			const name = item.icon.substring(3, lastDash);
// 			let k = '';

// 			for (const [key, value] of Object.entries(siIcons)) {
// 				if (value.slug === name.toLowerCase()) {
// 					k = key;
// 					break;
// 				}
// 			}

// 			const iconData = siIcons[k as keyof typeof siIcons];
// 			iconPath = iconData.path;
// 		} else if (provMDI) {
// 			const name = item.icon.substring(4, lastDash);
// 			let k = '';

// 			for (const [key] of Object.entries(mdiIcons)) {
// 				if (key.toLowerCase() === `mdi${name.replace('-', '').toLowerCase()}`) {
// 					k = key;
// 					break;
// 				}
// 			}

// 			const iconData = mdiIcons[k as keyof typeof mdiIcons];
// 			iconPath = iconData;
// 		}
// 	}

// 	return { iconPath, iconColor };
// }
