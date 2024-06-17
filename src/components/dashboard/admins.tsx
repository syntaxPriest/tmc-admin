import React, { useEffect, useState } from 'react';
import { Line, MainWrap, PageToggleText,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardMain, RecentSection, SearchInput } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import PropertyMilestone from '../reusable/propertyMilestone';
import { PageToggleHeader } from '../../styles/reusable/index';
import { Link } from 'react-router-dom';
import BottomNavComp from '../reusable/bottomNav';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PaginationComp from '../reusable/pagination';
import { LeftCont } from '../../styles/reusable/header';
import { Button } from '../../styles/reusable';
import * as Icon from 'iconsax-react';
import commaNumber from 'comma-number';
import InviteAdmin from './modals/inviteAdmin';
import { GET_USERS } from '../../api/getApis';
import { useMutation } from '@tanstack/react-query';
import MembersSkeleton from '../skeletons/members';
import { Paginate } from '../reusable/paginationComp';
import EmptyState from '../reusable/emptyState';

const Transactions = () => {
    
    const [activePage, setActivePage] = useState('All');
	const [showInviteAdmin, setShowInvite] = useState(false);

    const [page, setPage] = useState<number | undefined>(1)

	const [usersState, setUsersState] = useState({
		page: 1,
		activeIndex: -1,
		searchQuery: "",
		users: [],
		usersCount: 0,
	})

	const {mutateAsync, isPending} = useMutation({
		mutationFn: GET_USERS,
		onSuccess: (data) => {
			setUsersState((prev) => { return {
				...prev,
				users: data?.data?.body?.users,
				usersCount: data?.data?.body?.total_count
			}})
		}
	})

	useEffect(() => {
		mutateAsync({
			offset: Number(page) - 1,
            role: 'admin'

		})
	}, [page]);

    return(
        <>
            <InviteAdmin
				openToggle={showInviteAdmin}
				closeFunc={() => setShowInvite(false)}
			/>
            <MainWrap
                top='0rem'
                width='100%'
                maxWidth='1200px'
            >
                <DashboardFlex>
                    <SideBarWidget />
                    <DashboardMain>
                        <DashboardHeader>
                            <Typography 
                                text={`Admins ${usersState?.usersCount ? `(${usersState?.usersCount})` : ''}`}
                                color='#091525'
                                fontWeight={500}
                                fontSize='24px'
                                lineHeight='17.6px'
                            />
                            <div className="flex gap-[10px] items-center justify-end">
                                <Button 
                                    color='#fff'
                                    bg='#23211D'
                                    top="0"
									onClick={() => setShowInvite(true)}
                                >Create Admin</Button>
                            </div>
                        </DashboardHeader>
                        {
							isPending ?
						<MembersSkeleton />
						:
						usersState?.users.length > 0 ?
                        <div className="mt-5">
                            {/* Table Header */}
							<div className='flex items-center mt-[2rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
                                <p className='flex-[6] text-[14px]'>Full Name</p>
                                <p className='flex-[4] text-[14px]'>Phone Number</p>
								<p className='flex-[6] text-[14px]'>Email Address</p>
                                <p className='flex-[4] text-[14px]'>Admin Type</p>
                                <p className='flex-[4] text-[14px]'></p>
							</div>
                            {usersState?.users &&
								usersState?.users.length > 0 &&
								usersState?.users.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
									>
										<div className='flex flex-[6] items-center cursor-pointer gap-[10px]'>
											<div className='w-[90%]'>
												<p className='cursor-pointer ellipse text-[14px]'>
                                                    {item.first_name} {item.last_name}
												</p>
											</div>
										</div>
										<p className='flex-[4] cursor-pointer text-[14px]'>
											{item.phone ? item.phone: '---'}
										</p>
										<div className='flex-[6] cursor-pointer text-[14px]'>
											<p className="">
                                                {item.email}
                                            </p>
										</div>
                                        <p className='flex-[4] cursor-pointer text-[14px] capitalize'>
											{item?.role ? item.role : 'N/A'}
										</p>
                                        <div className='flex-[4] cursor-pointer text-[11px] flex justify-end'>
                                            <Button 
                                                color='#23211D'
                                                bg='#F3F1EF'
                                                top="0"
                                                className='!font-[500] !text-[12px]'
                                            >
                                                {item.suspended ? "Unsuspend" : "Suspend"}
                                            </Button>
										</div>
									</div>
								))}
                                {usersState?.usersCount > 20 && (
                                    <Paginate
                                        itemsPerPage={20}
                                        pageCount={Math.ceil(Number(usersState?.usersCount) / 20)}
                                        page={page}
                                        setPage={setPage}
                                        totalItems={usersState?.usersCount}
                                    />
                                )}
                        </div>
						: 
							<EmptyState 
								text='There are no admins at the moment'
							/>
						}
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default Transactions;

const pageItems = ['All', 'Debit', 'Credit',]

export const members = [
	{
        name: "Olanrewaju Oredipe",
        email: "olanrewaju@gmail.com",
        phoneNo: "+2349083827923",
        adminType: "Admin",
	},
	{
        name: "Daniel Adewale",
        email: "adewale@gmail.com",
        phoneNo: "+234908373974",
        adminType: "Super Admin",
	},
	{
        name: "Benjamin Akindeko",
        email: "bengy@gmail.com",
        phoneNo: "+2349083827923",
        adminType: "Super Admin",
	},
    {
        name: "Samuel Adeniyi",
        email: "sadeniyi@@gmail.com",
        phoneNo: "+2349083827393",
        adminType: "Admin",
	},
    {
        name: "Victor Chukwueke",
        email: "victor@gmail.com",
        phoneNo: "+2349083827923",
        adminType: "Admin",
	},
    {
        name: "Femi Fatokun",
        email: "femi@gmail.com",
        phoneNo: "+2348034827823",
        adminType: "Super Admin",
	},
];
