import { NavLink } from 'react-router-dom';

export default function FirstRun() {
	return (
		<div className='text-white flex-col text-center'>
			Homepage service URL not set
			<p className='mt-2'>
				Please, configure in{' '}
				<NavLink
					to='/settings'
					className='border border-slate-500 rounded bg-slate-600 p-1 hover:bg-slate-500'
				>
					Settings
				</NavLink>
			</p>
		</div>
	);
}
