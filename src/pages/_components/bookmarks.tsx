import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { BookmarkData, HomepageBookmark } from '../../models/bookmark-model';

export default function Bookmarks({ data }: { data: HomepageBookmark[] }) {
	return (
		<div>
			{data.map(item => (
				<div key={item.name} className='mb-3'>
					<h3 className='text-xl text-center font-semibold leading-6 text-slate-400 flex items-center'>
						<span className='w-full text-start'>{item.name}</span>
						<span className='text-sm text-slate-700 w-fit'>bookmark</span>
					</h3>

					<dl className='mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
						{item?.bookmarks?.map(item => (
							<BookmarkCard key={item.href} item={item} />
						))}
					</dl>
				</div>
			))}
		</div>
	);
}

function BookmarkCard({ item }: { item: BookmarkData }) {
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
		// <div
		// 	key={item.href}
		// 	className='relative overflow-hidden rounded-lg px-2 pb-4 pt-1 shadow shadow-black sm:px-6 sm:pt-6 bg-gradient-to-r from-slate-700/20 to-slate-900 hover:shadow-slate-500'
		// >
		// 	<p className='ml-4 truncate text-lg font-medium text-slate-100'>
		// 		{item.name}
		// 	</p>
		// 	<div className='absolute inset-x-0 bottom-0 px-2 py-1 sm:px-4 bg-gradient-to-r from-slate-700/10 to-slate-900 hover:from-slate-700/20 hover:to-slate-900/10'>
		// 		<div className='text-sm w-full'>
		// 			<Link
		// 				to={`external://${item.href}`}
		// 				target='_blank'
		// 				className='font-medium text-slate-400 hover:text-green-500 flex gap-x-1 items-center justify-end'
		// 			>
		// 				<ArrowTopRightOnSquareIcon className='h-4 w-4 text-slate-600' />{' '}
		// 				Open
		// 			</Link>
		// 		</div>
		// 	</div>
		// 	<div className='flex items-baseline pb-4 sm:pb-7'>
		// 		<div className='absolute inset-x-0 bottom-0 px-2 py-1 sm:px-4 bg-gradient-to-r from-slate-700/10 to-slate-900 hover:from-slate-700/20 hover:to-slate-900/10'>
		// 			<div className='text-sm w-full'>
		// 				<Link
		// 					to={`external://${item.href}`}
		// 					target='_blank'
		// 					className='font-medium text-slate-400 hover:text-green-500 flex gap-x-1 items-center justify-end'
		// 				>
		// 					<ArrowTopRightOnSquareIcon className='h-4 w-4 text-slate-600' />{' '}
		// 					Open
		// 				</Link>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}
