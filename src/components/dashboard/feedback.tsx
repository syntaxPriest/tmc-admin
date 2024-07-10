import React, { useEffect, useState } from 'react';
import { BoxFlex, Line, MainWrap, PageToggleText, RandomCircle,} from '../../styles/reusable/index';
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
import commaNumber from 'comma-number';
import SelectMessageChannel from './modals/selectMessageChannel';
import { useMutation } from '@tanstack/react-query';
import { GET_FEEDBACKS, GET_MESSAGES } from '../../api/getApis';
import EmptyState from '../reusable/emptyState';
import { Paginate } from '../reusable/paginationComp';
import MessagesSkeleton from '../skeletons/messages';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateProposedMessageData } from '../../store/general/reducer';

const Feedback = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showSelectModal, setShowSelectModal] = useState(false);

    const [page, setPage] = useState<number | undefined>(1)
    const [feedbacksState, setFeedbacksState] = useState({
        page: 1,
        activeIndex: -1,
        searchQuery: "",
        feedbacks: [],
        feedbacksCount: 0,
      });
    
      const { mutateAsync, isPending } = useMutation({
        mutationFn: GET_FEEDBACKS,
        onSuccess: (data) => {
          setFeedbacksState((prev) => {
            return {
              ...prev,
              feedbacks: data?.data?.body?.feedbacks,
              feedbacksCount: data?.data?.body?.total_count,
            };
          });
        },
      });
    
      useEffect(() => {
        mutateAsync({
          offset: Number(page) - 1,
        });
      }, [page]);

    return(
        <>
            <SelectMessageChannel 
                closeFunc={() => setShowSelectModal(false)}
                openToggle={showSelectModal}
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
                                text={`Feedback ${
                                    feedbacksState?.feedbacksCount
                                      ? `(${feedbacksState?.feedbacksCount})`
                                      : ""
                                  }`}
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
                                    onClick={() => navigate("/dashboard/feedback/create")}
                                >Create New</Button>
                            </div>
                        </DashboardHeader>
                        {isPending ? (
                            <MessagesSkeleton />
                            ) : 
                            feedbacksState?.feedbacks.length > 0 
                            ? (
                        <div className="mt-5">
                            {
                                (feedbacksState?.feedbacks &&
								feedbacksState?.feedbacks.length > 0) 
                                &&
								feedbacksState?.feedbacks.map((item: any, index: number) => (
									<div
										className='w-full items-center flex justify-between gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
                                        onClick={() => {
                                            navigate(`/dashboard/feedback/response/${item.id}`)
                                        }}
									>
										<div className='w-[90%] flex flex-col cursor-pointer gap-[10px]'>
											<div className='w-[100%] flex gap-[10px]'>
												<p className='cursor-pointer font-black text-[16px] max-w-[80%]'>
                                                    {item?.feedback_questions && item?.feedback_questions.length > 0 ? item?.feedback_questions[0].question : "---"}
												</p>
                                                <div className="flex gap-[8px]">
                                                    {/* {
                                                        (item.channels && JSON.parse(item.channels).length > 0) ?
                                                            JSON.parse(item.channels).map((item:string, index:number) => ( */}
                                                                <p className="border border-[#d0d5dd] shadow-[0px_1px_2px_0px_#1018280D] py-[4px] px-[10px] rounded-[6px] text-center w-auto text-[10px] capitalize">
                                                                    {item.response_count} feedbacks
                                                                </p>
                                                            {/* ))
                                                            : null
                                                    } */}
                                                </div>
											</div> 
                                            <p 
                                                className='text-[14px] text-[#898579] font-[400]'>
                                                    {item?.event?.title} • {moment(new Date(item?.event?.time)).format('LL')} Feedback 
                                                    {/* {moment(`${item?.created_at}`).startOf('hour').fromNow()} */}
                                            </p>
                                            <p 
                                                className='text-[12px] text-[#898579] font-[400]'>
                                                    {moment(new Date(item.created_at)).format('LL')}
                                            </p>
										</div>
                                        <p className="text-[#8B6C23] text-[14px] font-[500]">View</p>
									</div>
								))}
                                {feedbacksState?.feedbacksCount > 20 && (
                                    <Paginate
                                        itemsPerPage={20}
                                        pageCount={Math.ceil(Number(feedbacksState?.feedbacksCount) / 20)}
                                        page={page}
                                        setPage={setPage}
                                        totalItems={feedbacksState?.feedbacksCount}
                                    />
                                )}
                                </div>
                        ) : (
                            <EmptyState text="There are no feedback created at the moment" />
                        )}
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default Feedback;

const pageItems = ['All', 'Debit', 'Credit',]

export const members = [
	{
        name: "Tuesday Lunch Is Back!",
        email: "olanrewaju@gmail.com",
        phoneNo: "+2349083827923",
        adminType: "Admin",
	},
    {
        name: "Tuesday Lunch Is Back!",
        email: "olanrewaju@gmail.com",
        phoneNo: "+2349083827923",
        adminType: "Admin",
	},
];
