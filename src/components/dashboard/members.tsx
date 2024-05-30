import React, { useState } from 'react';
import { Line, MainWrap, PageToggleText,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardMain, RecentSection, SearchInput } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import PropertyMilestone from '../reusable/propertyMilestone';
import { PageToggleHeader } from '../../styles/reusable/index';
import { Link, useNavigate } from 'react-router-dom';
import BottomNavComp from '../reusable/bottomNav';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PaginationComp from '../reusable/pagination';
import { LeftCont } from '../../styles/reusable/header';
import { Button } from '../../styles/reusable';
import * as Icon from 'iconsax-react';
import InviteMembers from './modals/inviteMembers';

const Members = () => {
    
	const navigate = useNavigate();
    const [activePage, setActivePage] = useState('All');
	const [showInviteMember, setShowInvite] = useState(false) 

    return(
        <>
			<InviteMembers 
				openToggle={showInviteMember}
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
                                text='Members (234)'
                                color='#091525'
                                fontWeight={500}
                                fontSize='24px'
                                lineHeight='17.6px'
                            />
                            <div className="flex gap-[10px] items-center justify-end">
                                <SearchInput>
                                    <i>
                                        <Icon.SearchNormal1 size={18} />
                                    </i>
                                    <input 
                                        placeholder='Search'
                                    />
                                </SearchInput>
                                <Button 
                                    color='#fff'
                                    bg='#23211D'
                                    top="0"
									onClick={() => setShowInvite(true)}
                                >Invite Member</Button>
                            </div>
                        </DashboardHeader>
                        <div className="flex justify-between items-center">
                            <PageToggleHeader>
                                {
                                    pageItems.map((item, index) => (
                                        <PageToggleText 
                                            key={index}
                                            active={item === activePage}
                                            onClick={() => setActivePage(item)}
                                        >
                                            {item}
                                        </PageToggleText>
                                    ))
                                }
                            </PageToggleHeader>
                            <div className="flex items-center gap-[8px]">
                                <p className="text-[14px] text-[#091525] font-medium">Filter by:</p>
                                <input 
                                    type="date" 
                                    className="w-[10rem] py-2 px-3 text-[14px] rounded-[8px] !border !border-[1px] !border-[#E5DFD9]"
                                    style={{
                                        border: "1px solid #E5DFD9"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            {/* Table Header */}
							<div className='flex items-end mt-[2rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
								<p className='flex-[6] text-[14px]'>Member</p>
								<p className='flex-[2] text-[14px]'>ID No.</p>
								<p className='flex-[3] text-[14px]'>Phone Number</p>
								<p className='flex-[3] text-[14px]'>Date Joined</p>
								<p className='flex-[2] text-[14px]'>Type</p>
                                <p className='flex-[3] text-[14px]'>Last Login</p>
								<p className='flex-[1] text-[14px]'></p>
							</div>
                            {members &&
								members.length > 0 &&
								members.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
										onClick={() => navigate(`/dashboard/member/${index + 1}`)}
									>
										<div className='flex flex-[6] items-center cursor-pointer gap-[10px]'>
											<img
												src='/images/Avatar1.png'
                                                className="w-[35px] h-[35px]"
												alt='user'
											/>
											<div className='w-[90%]'>
												<h3 className='font-medium text-[14px] cursor-pointer'>
													{item.firstName} {item.lastName}
												</h3>
												<p className='font-light cursor-pointer text-[12px] text-[#70897B]'>
													{item.email ? item.email : "N/A"}
												</p>
											</div>
										</div>
										<p className='flex-[2] cursor-pointer text-[14px] ellipse w-[3rem]'>
											{item.id ? item.id : "N/A"}
										</p>
										<p className='flex-[3] cursor-pointer text-[14px]'>
											{item.phoneNo ? item.phoneNo : "N/A"}
										</p>
										<p className='flex-[3] cursor-pointer text-[14px]'>
											{`${new Date().toDateString()}`}
										</p>
										<p className='flex-[2] cursor-pointer text-[14px] capitalize'>
											{item.type ? item.type : "---"}
										</p>
                                        <p className='flex-[3] cursor-pointer text-[14px] capitalize'>
											{`${new Date().toDateString()}`}
										</p>
										<p className='flex-[1] text-[14px] flex justify-end text-right'>
											<EllipsisVerticalIcon
												className='w-6 h-6 mr-[10px]'
												color='#70897B'
											/>
										</p>
									</div>
								))}
                                <PaginationComp />
                        </div>
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default Members;

const pageItems = ['All', 'Suspended', 'Deleted']

export const members = [
	{
        firstName: "Daniel",
		lastName: "Adewale",
        email: "daniel@gmail.com",
		phoneNo: "08012345678",
        dateJoined: "",
		id: "129304",
		type: "Ordinary",
		lastLogin: "",
	},
	{
        firstName: "Benjamin",
		lastName: "Akindeko",
		email: "daniel@gmail.com",
		phoneNo: "08012345678",
        dateJoined: "",
		id: "137368",
		type: "Ordinary",
		lastLogin: "",
	},
	{
        firstName: "Victor",
		lastName: "Chukwueke",
		email: "daniel@gmail.com",
		phoneNo: "08012345678",
        dateJoined: "",
		id: "836283",
		type: "Ordinary",
		lastLogin: "",
	},

	{
        firstName: "Samuel",
		lastName: "Adeniyi",
		email: "daniel@gmail.com",
		phoneNo: "08012345678",
        dateJoined: "",
		id: "098638",
		type: "Ordinary",
		lastLogin: "",
	},

	{
        firstName: "Femi",
		lastName: "Fatokun",
		email: "daniel@gmail.com",
		phoneNo: "08012345678",
        dateJoined: "",
		id: "012736",
		type: "Ordinary",
		lastLogin: "",
	},
];
