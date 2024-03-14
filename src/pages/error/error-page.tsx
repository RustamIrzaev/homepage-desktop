import { NavLink, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	console.log(error);

	return (
		<div className='text-slate-100 pt-20'>
			<div>Something went wrong: {error.statusText || error.message}</div>
			<NavLink to='/' className='border rounded p-2 hover:bg-slate-600 pt-2'>
				Go to home
			</NavLink>
		</div>
	);
}
