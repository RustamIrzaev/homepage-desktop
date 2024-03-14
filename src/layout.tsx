import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from './utils/tw-utils';

const navigation = [
	{ name: 'Dashboard', href: '/' },
	{ name: 'Settings', href: '/settings' },
];

export default function Layout() {
	const { pathname } = useLocation();

	return (
		<>
			<div className='min-h-full'>
				{/* <div id='mover' className='h-[26px] bg-slate-900/80'></div> */}
				<Disclosure
					as='nav'
					className='bg-slate-800 sticky z-50 top-0 shadow-sm shadow-black/15'
				>
					{({ open }) => (
						<>
							<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
								<div className='flex h-10 items-center justify-between'>
									<div className='flex items-center'>
										<div className='flex-shrink-0'>
											<NavLink
												to='/'
												className={cn(
													'text-lg font-semibold leading-6 text-slate-300 collapse'
													// open ? 'collapse' : 'visible'
												)}
											>
												<img
													className='h-8 w-8'
													src='/assets/laptop_image.png'
													alt='HomePage Desktop'
												/>
											</NavLink>
										</div>
										<div className='hidden md:block'>
											<div className='ml-10 flex items-baseline space-x-4'>
												{navigation.map(item => (
													<NavLink
														to={item.href}
														key={item.name}
														className={({ isActive }) =>
															cn(
																isActive
																	? 'bg-gray-900 text-white'
																	: 'text-gray-300 hover:bg-gray-700 hover:text-white',
																'rounded-md px-3 py-1 text-sm font-medium'
															)
														}
													>
														{item.name}
													</NavLink>
												))}
											</div>
										</div>
									</div>

									<span className='md:hidden text-lg font-semibold leading-6 text-center text-slate-300'>
										{open
											? 'Menu'
											: navigation.find(item => item.href === pathname)?.name}
									</span>

									<div className='-mr-1 flex md:hidden'>
										<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-1 text-gray-400 hover:bg-gray-700 hover:text-white'>
											<span className='absolute -inset-0.5' />
											{open ? (
												<XMarkIcon className='block h-6 w-6 text-white' />
											) : (
												<Bars3Icon className='block h-6 w-6' />
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className='md:hidden'>
								{({ close }) => (
									<div className='space-y-1 px-2 pb-3 pt-2 sm:px-3 space-x-3 flex justify-evenly items-baseline'>
										{navigation.map(item => (
											<NavLink
												to={item.href}
												key={item.name}
												className={({ isActive }) =>
													cn(
														isActive
															? 'bg-slate-900 text-white'
															: 'text-slate-400 hover:bg-slate-700 hover:text-white',
														'w-full rounded-md px-3 py-2 text-base font-medium text-center'
													)
												}
												onClick={() => close()}
											>
												{item.name}
											</NavLink>
										))}
									</div>
								)}
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>

				<main className='bg-slate-800'>
					<div className='mx-auto max-w-7xl py-4 px-2 sm:px-6 lg:px-8'>
						<Outlet />
					</div>
				</main>
			</div>
		</>
	);
}
