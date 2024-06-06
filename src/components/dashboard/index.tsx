import React, { useEffect, useState } from 'react';
import { Line, MainWrap,} from '../../styles/reusable/index';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import SideBarWidget from '../reusable/sidebar';
import { CardGrid, DashboardCard, DashboardFlex, DashboardHeader, DashboardMain, RecentSection } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import { DocumentDuplicateIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import CopiedNotifier from '../reusable/clipboard';
import { copyText } from '../../utils/copyText';
import PropertyMilestone from '../reusable/propertyMilestone';
import BottomNavComp from '../reusable/bottomNav';
import { events } from './events';
import { useMutation } from '@tanstack/react-query';
import { GET_EVENTS } from '../../api/getApis';
import EmptyState from '../reusable/emptyState';
import EventsSkeleton from '../skeletons/events';
import classNames from 'classnames';

const DashboardIndex = () => {

    const navigate = useNavigate();
    const {user} = useCurrentUser();

    const [eventsState, setEventsState] = useState({
        page: 1,
        activeIndex: -1,
        searchQuery: "",
        events: [],
        eventsCount: 0,
    });
    
    const { mutateAsync, isPending:gettingEvents } = useMutation({
        mutationFn: GET_EVENTS,
        onSuccess: (data) => {
            setEventsState((prev) => {
            return {
                ...prev,
                events: data?.data?.body?.events,
                eventsCount: data?.data?.body?.total_count,
            };
            });
        },
    });
    
    useEffect(() => {
        mutateAsync({
            offset: 0,
            status: 'upcoming',
        });
    }, []);

    return(
        <>
            <MainWrap
                top='0rem'
                width='100%'
                maxWidth='1200px'
                onClick={() => {
                    setEventsState((prev) => { return {
                        ...prev,
                        activeIndex: -1
                    }})
                }}
            >
                <DashboardFlex>
                    <SideBarWidget />
                    <DashboardMain>
                        <DashboardHeader>
                            <Typography 
                                text={`Welcome ${user?.first_name}!`}
                                color='#091525'
                                fontWeight={500}
                                fontSize='24px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <div className="grid grid-cols-4 gap-[24px] my-[2rem]">
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">250</h3>
                                <p className='text-[12px] text-[#898579]'>Members</p>
                            </div>
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">5</h3>
                                <p className='text-[12px] text-[#898579]'>Upcoming Events</p>
                            </div>
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">17</h3>
                                <p className='text-[12px] text-[#898579]'>Scheduled Bookings</p>
                            </div>
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">217</h3>
                                <p className='text-[12px] text-[#898579]'>Available Products</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-[24px] my-[2rem]">
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">&#8358;3,421,563</h3>
                                <p className='text-[12px] text-[#898579]'>Total Transaction Value</p>
                            </div>
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">&#8358;1,332,054</h3>
                                <p className='text-[12px] text-[#898579]'>Total Bar Account Balance</p>
                            </div>
                        </div>
                        <div className="border rounded-[8px]">
                            <div className="py-5 px-4 flex items-center justify-between font-[500] text-[14px] border-b">
                                <p>Upcoming Events</p>
                                <p className='text-[var(--primary-color)]'>View All</p>
                            </div>
                            <div className="">
                            {gettingEvents ? (
                                <div className="px-4">
                                    <EventsSkeleton />
                                </div>
                                ) : eventsState?.events.length > 0 ? (
                                <div className="">
                                    {/* Table Header */}
                                    <div className='flex items-end mt-[1rem] py-2 border-b gap-[10px] font-[500] text-[#23211D] px-4'>
                                        <p className='flex-[7] text-[14px]'>Event</p>
                                        <p className='flex-[3] text-[14px]'>Date</p>
                                        <p className='flex-[3] text-[14px]'>Time</p>
                                        <p className='flex-[5] text-[14px]'>Location</p>
                                        <p className='flex-[2] text-[14px]'>Attendees</p>
                                        <p className='flex-[1] text-[14px]'></p>
                                    </div>
                                    {eventsState.events &&
                                        eventsState.events.length > 0 &&
                                        eventsState.events.map((item: any, index: number) => (
                                            <div
                                                className={classNames("flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C] relative px-4", index === eventsState.events.length - 1 ? "border-none" : "" )}
                                                onClick={() => navigate(`/dashboard/event/${item.id}`)}
                                            >
                                                <div className="flex flex-[7] items-center cursor-pointer gap-[10px]">
                                                    <img
                                                    src={item.cover ? item?.cover : "/images/dummy.jpeg"}
                                                    className="w-[35px] h-[35px] rounded-[6px]"
                                                    alt="user"
                                                    />
                                                    <div className="w-[90%]">
                                                    <h3 className="font-medium text-[14px] cursor-pointer">
                                                        {item.title}
                                                    </h3>
                                                    </div>
                                                </div>
                                                <p className="flex-[3] cursor-pointer text-[14px]">
                                                    {`${new Date(item.time).toDateString()}`}
                                                </p>
                                                <p className="flex-[3] cursor-pointer text-[14px]">
                                                    {`${new Date(item.time).toLocaleTimeString()}`}
                                                </p>
                                                <p className="flex-[5] cursor-pointer text-[14px]">
                                                    {item?.location ? item.location : "N/A"}
                                                </p>
                                                <p className="flex-[2] cursor-pointer text-[14px] capitalize">
                                                    {item.expected_number_of_attendees ? item.expected_number_of_attendees : "---"}
                                                </p>
                                                <p className="flex-[1] text-[14px] flex justify-end text-right">
                                                    <EllipsisVerticalIcon
                                                    className='w-6 h-6 mr-[10px]'
                                                    color='#70897B'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEventsState((prev) => { return {
                                                        ...prev,
                                                        activeIndex: eventsState?.activeIndex === index ? -1 : index
                                                        }})
                                                    }}
                                                    />
                                                </p>
                                                {
                                                    eventsState?.activeIndex === index && (
                                                    <div className="w-[120px] absolute top-[3.5rem] right-0 rounded-[10px] text-[14px] text-[#898579] border shadow-[0px_4px_8px_0px_#0000001A] bg-[#fff] text-center z-[1]">
                                                        <p className="py-[8px] px-[10px] border-b">
                                                        View
                                                        </p>
                                                        <p className="py-[8px] px-[10px] border-b">
                                                        Edit
                                                        </p>
                                                    </div>
                                                    )
                                                }
                                            </div>
                                    ))}
                                </div>
                                ) : (
                                    <EmptyState text="There are no upcoming events at the moment" />
                                  )}
                            </div>
                        </div>
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default DashboardIndex;