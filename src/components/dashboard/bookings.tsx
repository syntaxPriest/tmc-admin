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
import BookingsInfo from './modals/booking';
import { GET_BOOKINGS } from '../../api/getApis';
import { useMutation } from '@tanstack/react-query';
import BookingsSkeleton from '../skeletons/bookings';
import EmptyState from '../reusable/emptyState';

const Bookings = () => {
    
    const [activePage, setActivePage] = useState('Upcoming');
    const [openBookingInfo, setOpenBookingInfo] = useState(false)
    const [debouncedValue, setDebouncedValue] = useState<string>("");

    const [bookingsState, setBookingsState] = useState({
      page: 1,
      activeIndex: -1,
      searchQuery: "",
      bookings: [],
      bookingsCount: 0,
    });
  
    const { mutateAsync, isPending } = useMutation({
      mutationFn: GET_BOOKINGS,
      onSuccess: (data) => {
        setBookingsState((prev) => {
          return {
            ...prev,
            bookings: data?.data?.body?.bookings,
            bookingsCount: data?.data?.body?.total_count,
          };
        });
      },
    });
  
    useEffect(() => {
      mutateAsync({
        offset: bookingsState?.page - 1,
        search: debouncedValue || undefined,
        status: activePage.toLowerCase(),
      });
    }, [activePage, debouncedValue]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBookingsState((prev) => {
        return {
          ...prev,
          searchQuery: e.target.value,
        };
      });
    };
    return(
        <>
            <BookingsInfo 
                openToggle={openBookingInfo}
                closeFunc={() => setOpenBookingInfo(false)}
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
                                text={`Bookings ${
                                    bookingsState?.bookingsCount
                                      ? `(${bookingsState?.bookingsCount})`
                                      : ""
                                  }`}
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
                                        value={bookingsState?.searchQuery}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter'){
                                                setDebouncedValue(e.currentTarget?.value);
                                            }
                                        }}
                                    />
                                </SearchInput>
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
                        {isPending ? (
                        <BookingsSkeleton />
                        ) : bookingsState?.bookings.length > 0 ? (
                        <div className="mt-5">
                            {/* Table Header */}
							<div className='flex items-end mt-[2rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
								<p className='flex-[7] text-[14px]'>Booking</p>
								<p className='flex-[3] text-[14px]'>Date</p>
								<p className='flex-[3] text-[14px]'>Time</p>
								<p className='flex-[5] text-[14px]'>Scheduled By</p>
								<p className='flex-[2] text-[14px]'>Action</p>
							</div>
                            {members &&
								members.length > 0 &&
								members.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
                                        onClick={() => setOpenBookingInfo(true)}
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
											{item?.scheduledBy ? item.scheduledBy : 'N/A'}
										</p>
										<p className='flex-[2] text-[12px] font-semibold text-[#8B6C23] cursor-pointer flex text-center'>
											View
										</p>
									</div>
								))}
                                <PaginationComp />
                                </div>
                            ) : (
                            <EmptyState text="There are no bookings at the moment" />
                            )}
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default Bookings;

const pageItems = ['Upcoming', 'Completed']

export const members = [
	{
        name: "Main Hall",
        image: "/images/hall.png",
        date: "",
		scheduledBy: "Prof. Oluwole Soyinka",
		attendees: "107",
	},
	{
        name: "Swimming Lessons",
        image: "/images/swimming-pool.png",
        date: "",
		scheduledBy: "Prof. Oluwole Soyinka",
		attendees: "58",
	},
	{
        name: "Swimming Lessons",
        image: "/images/swimming-pool.png",
        date: "",
		scheduledBy: "Prof. Oluwole Soyinka",
		attendees: "60",
	},

	{
        name: "Swimming Lessons",
        image: "/images/swimming-pool.png",
        date: "",
		scheduledBy: "Prof. Oluwole Soyinka",
		attendees: "37",
	},
	{
        name: "Swimming Lessons",
        image: "/images/swimming-pool.png",
        date: "",
		scheduledBy: "Prof. Oluwole Soyinka",
		attendees: "107",
	},
];
