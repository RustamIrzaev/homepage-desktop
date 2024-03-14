import { Switch } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAppConfig from '../hooks/use-app-config';
import { cn } from '../utils/tw-utils';

export default function Settings() {
	const { getValue, setValue } = useAppConfig();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [homepageUrl, setHomepageUrl] = useState('');
	const [showTrayIcon, setShowTrayIcon] = useState<boolean | undefined>(false);
	const [isProcessing, setIsProcessing] = useState(false);

	const { isFetching: isConfigLoading } = useQuery({
		queryKey: ['config-data'],
		queryFn: async () => {
			const url = await getValue('url');
			setHomepageUrl(url?.toString() || '');

			const showIcon = await getValue('showTrayIcon');
			setShowTrayIcon(!!showIcon);

			return url;
		},
	});

	if (isConfigLoading) {
		return <div>Loading...</div>;
	}

	function urlInputChange(e: { target: { value: SetStateAction<string> } }) {
		setHomepageUrl(e.target.value);
	}

	function changeTrayIcon() {
		setShowTrayIcon(!showTrayIcon);
		setValue('showTrayIcon', !showTrayIcon);
	}

	async function testUrlAndSave() {
		setIsProcessing(true);
		setError('');
		setSuccess('');

		try {
			const fullUrl = `${homepageUrl}/api/services`;
			const result = await fetch(fullUrl);
			await result.json();
			await setValue('url', homepageUrl);
			setSuccess('URL is valid. Saved');
		} catch (e) {
			console.error('Error fetching url', e);
			setError("Can't fetch the URL");
		} finally {
			setIsProcessing(false);
		}
	}

	return (
		<>
			<div>
				<label
					htmlFor='url'
					className='block font-medium leading-6 text-slate-200'
				>
					Homepage dashboard URL
				</label>
				<div className='relative mt-2 rounded-md shadow-sm'>
					<input
						type='url'
						name='url'
						id='url'
						disabled={isProcessing}
						className={cn(
							'block w-full rounded-md border-0 py-1.5 pr-10 text-sm sm:leading-6 placeholder:text-slate-400 bg-slate-100 disabled:cursor-not-allowed',
							error ? 'text-red-600 placeholder:text-red-300' : ''
						)}
						placeholder='http://192.168.100.1:3000'
						onChange={urlInputChange}
						value={homepageUrl}
					/>
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
						{error && (
							<ExclamationCircleIcon className='h-5 w-5 text-red-500' />
						)}
					</div>
				</div>
				{error && (
					<p className='mt-2 text-sm text-red-500' id='url-error'>
						{error}
					</p>
				)}
				{success && (
					<p className='mt-2 text-sm text-green-500' id='url-error'>
						{success}
					</p>
				)}
				<div className='mt-2 flex justify-center'>
					<button
						className='w-full text-center text-sm bg-slate-800 rounded p-1 border border-slate-400 text-slate-100 hover:bg-slate-700 disabled:cursor-not-allowed'
						// className='bg-slate-500 rounded p-1 border border-slate-400 text-slate-100 hover:bg-slate-600 w-3/4 disabled:cursor-not-allowed'
						disabled={isProcessing}
						onClick={testUrlAndSave}
					>
						Test
					</button>
				</div>

				<Switch.Group as='div' className='flex items-center mt-8 gap-x-4'>
					<Switch.Label as='span' className='font-medium'>
						<span className='font-medium text-slate-200'>Show Tray Icon</span>{' '}
					</Switch.Label>
					<Switch
						checked={showTrayIcon}
						onChange={changeTrayIcon}
						className={cn(
							showTrayIcon ? 'bg-slate-700' : 'bg-slate-400',
							'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
						)}
					>
						<span className='sr-only'>Use setting</span>
						<span
							className={cn(
								showTrayIcon ? 'translate-x-5' : 'translate-x-0',
								'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out'
							)}
						>
							<span
								className={cn(
									showTrayIcon
										? 'opacity-0 duration-100 ease-out'
										: 'opacity-100 duration-200 ease-in',
									'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
								)}
							>
								<svg
									className='h-3 w-3 text-red-400'
									fill='none'
									viewBox='0 0 12 12'
								>
									<path
										d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
										stroke='currentColor'
										strokeWidth={2}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</span>
							<span
								className={cn(
									showTrayIcon
										? 'opacity-100 duration-200 ease-in'
										: 'opacity-0 duration-100 ease-out',
									'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
								)}
							>
								<svg
									className='h-3 w-3 text-green-600'
									fill='currentColor'
									viewBox='0 0 12 12'
								>
									<path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
								</svg>
							</span>
						</span>
					</Switch>
				</Switch.Group>
			</div>

			<div className='flex-col flex justify-end mt-14'>
				<NavLink
					to='/'
					className='w-full text-center text-sm bg-slate-800 rounded p-1 border border-slate-400 text-slate-100 hover:bg-slate-700 disabled:cursor-not-allowed'
				>
					Back to Home
				</NavLink>
				<span className='text-xs text-slate-700 mt-2'>
					* Settings saves automatically
				</span>
			</div>

			<div className='bottom-1 absolute'>
				<div className='text-sm text-slate-500'>
					New version and sources -{' '}
					<Link
						to='external://https://github.com/RustamIrzaev/homepage-desktop'
						target='_blank'
						className='text-slate-300 hover:text-slate-400'
					>
						Github
					</Link>
				</div>
				{/* <div className='text-sm text-slate-600 mt-2'>
					You can get homepage from{' '}
					<Link
						to='external://https://gethomepage.dev/latest/'
						target='_blank'
						className='text-slate-500 hover:text-slate-400'
					>
						gethomepage.dev
					</Link>
				</div> */}
				<div className='text-sm text-slate-700 mt-1'>
					Icon(s) by{' '}
					<Link
						to='external://https://www.flaticon.com/free-icons/computer'
						target='_blank'
						className='text-slate-700/90 hover:text-slate-600/90'
					>
						Freepik - Flaticon
					</Link>
				</div>
			</div>
		</>
	);
}
