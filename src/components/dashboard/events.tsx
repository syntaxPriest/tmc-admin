import React, { useState } from 'react';
import { Line, MainWrap, PageToggleText,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardMain, RecentSection, SearchInput } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import PropertyMilestone from '../reusable/propertyMilestone';
import { PageToggleHeader } from '../../styles/reusable/index';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import BottomNavComp from '../reusable/bottomNav';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PaginationComp from '../reusable/pagination';
import { LeftCont } from '../../styles/reusable/header';
import { Button } from '../../styles/reusable';
import * as Icon from 'iconsax-react';

const Events = () => {
    
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('Upcoming');

    return(
        <>
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
                                text='Events (234)'
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
                                <Link
                                    to={'/dashboard/events/create'}
                                >
                                    <Button 
                                        color='#fff'
                                        bg='#23211D'
                                        top="0"
                                    >
                                        Create Event
                                    </Button>
                                </Link>
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
								<p className='flex-[7] text-[14px]'>Event</p>
								<p className='flex-[3] text-[14px]'>Date</p>
								<p className='flex-[3] text-[14px]'>Time</p>
								<p className='flex-[5] text-[14px]'>Location</p>
                                <p className='flex-[2] text-[14px]'>Attendees</p>
								<p className='flex-[1] text-[14px]'></p>
							</div>
                            {events &&
								events.length > 0 &&
								events.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
                                        onClick={() => navigate(`/dashboard/event/${index + 1}`)}
									>
										<div className='flex flex-[7] items-center cursor-pointer gap-[10px]'>
											<img
												src={item.image}
                                                className="w-[35px] h-[35px]"
												alt='user'
											/>
											<div className='w-[90%]'>
												<h3 className='font-medium text-[14px] cursor-pointer'>
													{item.name}
												</h3>
											</div>
										</div>
										<p className='flex-[3] cursor-pointer text-[14px]'>
											{`${new Date().toDateString()}`}
										</p>
										<p className='flex-[3] cursor-pointer text-[14px]'>
											{`${new Date().toLocaleTimeString()}`}
										</p>
										<p className='flex-[5] cursor-pointer text-[14px]'>
											{item?.location ? item.location : 'N/A'}
										</p>
										<p className='flex-[2] cursor-pointer text-[14px] capitalize'>
											{item.attendees ? item.attendees : "---"}
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

export default Events;

const pageItems = ['Upcoming', 'Ongoing', 'Completed']

export const events = [
	{
        name: "Karaoke & Games with Alali VI",
        image: "/images/karaoke.png",
        date: "",
		location: "Club Main Hall",
		attendees: "107",
	},
	{
        name: "Tuesday Lunch",
        image: "/icons/cutlery.png",
        date: "",
		location: "Club Main Hall",
		attendees: "58",
	},
	{
        name: "Annual General Meeting",
        image: "/icons/date.png",
        date: "",
		location: "Club Main Hall",
		attendees: "60",
	},

	{
        name: "Meeting with the President",
        image: "/icons/cutlery.png",
        date: "",
		location: "Club Main Hall",
		attendees: "37",
	},
	{
        name: "Tuesday Lunch",
        image: "/icons/date.png",
        date: "",
		location: "Club Main Hall",
		attendees: "107",
	},
];
