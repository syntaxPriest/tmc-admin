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
import { GET_MESSAGES } from '../../api/getApis';
import EmptyState from '../reusable/emptyState';
import { Paginate } from '../reusable/paginationComp';
import MessagesSkeleton from '../skeletons/messages';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateProposedMessageData } from '../../store/general/reducer';
import AskYesOrNo from './modals/askYesOrNo';
import { enqueueSnackbar } from 'notistack';
import { DELETE_MESSAGE } from '../../api/action';

const Messaging = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedMessage, setSelectedMessage] = useState<any>()
    const [showSelectModal, setShowSelectModal] = useState(false);
    const [askDelete, setAskDelete] = useState(false);
    const [page, setPage] = useState<number | undefined>(1)
    const [messagesState, setMessagesState] = useState({
        page: 1,
        activeIndex: -1,
        searchQuery: "",
        messages: [],
        messagesCount: 0,
      });
    
      const { mutateAsync, isPending } = useMutation({
        mutationFn: GET_MESSAGES,
        onSuccess: (data) => {
          setMessagesState((prev) => {
            return {
              ...prev,
              messages: data?.data?.body?.messages,
              messagesCount: data?.data?.body?.total_count,
            };
          });
        },
      });
    

    const { mutateAsync: deleting_action, isPending: isDeleting } = useMutation({
        mutationFn: DELETE_MESSAGE,
        onSuccess: (data) => {
          enqueueSnackbar({
            variant: 'success',
            message: "You have deleted this message successfully!"
          })
          setAskDelete(false);
          mutateAsync({
            offset: Number(page) - 1,
        });
        },
    });

    useEffect(() => {
        mutateAsync({
            offset: Number(page) - 1,
        });
        dispatch(updateProposedMessageData(null))
    }, [page]);

    return(
        <>
            <AskYesOrNo 
                openToggle={askDelete}
                headerText={`Delete Message`}
                question={`Are you sure you want to delete this message?`}
                declineText="Cancel"
                actionText={`Delete`}
                yesAction={() => deleting_action({
                    id: selectedMessage?.id
                })}
                noAction={() => setAskDelete(false)}
                actionInProgress={isDeleting}
            />
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
                        <DashboardHeader
                            className="sm:!flex-row sm:!items-center"
                        >
                            <Typography 
                                text={`Messages ${
                                    messagesState?.messagesCount
                                      ? `(${messagesState?.messagesCount})`
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
                                    onClick={() => setShowSelectModal(true)}
                                >Create New</Button>
                            </div>
                        </DashboardHeader>
                        {isPending ? (
                            <MessagesSkeleton />
                            ) : messagesState?.messages.length > 0 ? (
                        <div className="mt-5">
                            {messagesState?.messages &&
								messagesState?.messages.length > 0 &&
								messagesState?.messages.map((item: any, index: number) => (
                                    <>
									<div
										className='w-full flex justify-between gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
                                        onClick={() => {
                                            dispatch(updateProposedMessageData({
                                                message: item.message,
                                                headline: item.headline
                                            }))
                                            navigate(`/dashboard/messaging/preview?type=view&id=${item.id}`)
                                        }}
									>
										<div className='w-[90%] sm:w-[70%] flex flex-col cursor-pointer gap-[10px]'>
											<div className='w-[100%] flex gap-[10px]'>
												<p className='cursor-pointer font-black text-[16px] max-w-[80%]'>
                                                    {item.headline}
												</p>
                                                <div className="flex gap-[8px] sm:hidden">
                                                    {
                                                        (item.channels && JSON.parse(item.channels).length > 0) ?
                                                            JSON.parse(item.channels).map((item:string, index:number) => (
                                                                <p className="border border-[#d0d5dd] shadow-[0px_1px_2px_0px_#1018280D] py-[4px] px-[10px] rounded-[6px] text-center w-auto text-[10px] capitalize">
                                                                    {item.replace("_", " ")}
                                                                </p>
                                                            ))
                                                            : null
                                                    }
                                                </div>
											</div>
                                            <p 
                                                className='text-[14px] font-[300] ellipse'
                                                dangerouslySetInnerHTML={{__html: `${item.message}`}}
                                            ></p>    
                                            <p className='text-[12px] text-[#898579] font-[400]'>{item?.number_of_receivers} Recipients • {moment(`${item?.created_at}`).startOf('hour').fromNow()}</p>
										</div>
                                        <BoxFlex
                                            width='auto'
                                        >
                                            <RandomCircle
                                                bg='#FDF0F0'
                                                size='32px'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAskDelete(true);
                                                    setSelectedMessage(item)
                                                }}
                                            >
                                                <Icon.Trash size={16} color='#D23B3B' />
                                            </RandomCircle>
                                            <RandomCircle
                                                bg='#F9F4F0'
                                                size='32px'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch(updateProposedMessageData({
                                                        id: item.id,
                                                        message: item.message,
                                                        headline: item.headline,
                                                        receivers: JSON.parse(item.receivers)
                                                    }))
                                                    navigate(`/dashboard/messaging/create?type=edit&id=${item.id}`)
                                                }}
                                            >
                                                <Icon.Edit size={16} color='#8B6C23' />
                                            </RandomCircle>
                                        </BoxFlex>
									</div>
                                    </>
								))}
                                {messagesState?.messagesCount > 20 && (
                                    <Paginate
                                        itemsPerPage={20}
                                        pageCount={Math.ceil(Number(messagesState?.messagesCount) / 20)}
                                        page={page}
                                        setPage={setPage}
                                        totalItems={messagesState?.messagesCount}
                                    />
                                )}
                                </div>
                        ) : (
                            <EmptyState text="There are no messages at the moment" />
                        )}
                    </DashboardMain>
                </DashboardFlex>
            </MainWrap>
        </>
    )
}

export default Messaging;

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
