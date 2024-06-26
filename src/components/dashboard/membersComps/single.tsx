import React, { ChangeEvent, useEffect, useState } from 'react';
import { BoxFlex, Line, MainWrap, PageListItem, PageListItemWrap, PageToggleText, RandomCircle,} from '../../../styles/reusable/index';
import SideBarWidget from '../../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardInner, DashboardMain, ProfileBoxWrap, ProgressBar } from './../style';
import QuickActionWidget from '../../reusable/quickaction';
import Typography from '../../reusable/typography';
import { PageToggleHeader, IconFlex, ButtonFlex } from '../../../styles/reusable/index';
import * as Icon from 'react-feather';
import * as IconSax from "iconsax-react";
import { Button } from '../../../styles/reusable';
import { useNavigate, useParams } from 'react-router-dom';
import { InputWrap, InputField, AuthBacknav } from '../../../styles/authentication/index';
import EditProfile from './../edit-profile';
import BottomNavComp from '../../reusable/bottomNav';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser } from '../../../store/user/reducer';
import { clearState } from '../../../store/properties/reducer';
import { useCurrentUser } from '../../../store/user/useCurrentUser';
import { removeAfterLogout } from '../../../api/instance';
import TransactionCard from '../TransactionCard';
import { useMutation } from '@tanstack/react-query';
import { GET_BOOKINGS, GET_EVENTS, GET_SINGLE_USERS, GET_TRANSACTIONS, GET_USER_WALLET } from '../../../api/getApis';
import PageSpinner from '../../reusable/Spinner/Spinner';
import { User } from '../../../utils/types';
import { DELETE_USER, EDIT_USER, SUSPEND_UNSUSPEND_ACTION } from '../../../api/action';
import { enqueueSnackbar } from 'notistack';
import { Spinner } from '../../reusable/spinner';
import AskYesOrNo from '../modals/askYesOrNo';
import EmptyState from '../../reusable/emptyState';
import { Paginate } from '../../reusable/paginationComp';
import TransactionSkeleton from '../../skeletons/transaction/transaction';
import commaNumber from 'comma-number';
import moment from 'moment';
import { getCdnLink } from '../../../utils/imageParser';

interface userStateProps {
    data: User,
    wallet: any,
    transactions: any,
    transactionsCount: number,
    events: any,
    eventsCount: number,
    bookings: any,
    bookingsCount: number,
}

const MemberProfile = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const [actionType, setActiontype] = useState("")
    const cookieUtils = useCookies();
    const currentUser = useCurrentUser().user;

    const [transactionType, setTransactionType] = useState("")
    const [eventPage, setEventPage] = useState<number | undefined>(1)
    const [transactionPage, setTransactionPage] = useState<number | undefined>(1)
    const [bookingPage, setBookingPage] = useState<number | undefined>(1)
    const [askSuspend, setAskSuspend] = useState(false)
    const [askDelete, setAskDelete] = useState(false)
    const [activePage, setActivePage] = useState('Overview');
    const [showPassword, setShowPassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const logoutUser = async () => {
        await cookieUtils[2]('userToken', undefined);
        dispatch(setUser(null));
        dispatch(clearState());
        removeAfterLogout();
        window.location.href = '/login';
    };

    const [userState, setUserState] = useState<userStateProps>({
        data: {},
        wallet: {},
        transactions: {},
        transactionsCount: 0,
        events: {},
        eventsCount: 0,
        bookings: {},
        bookingsCount: 0
    });

    const [mutableUser, setMutableUser] = useState<User>();
    const [isSuspended, setIsSuspended] = useState()
    
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const { id, value } = e.target;
    
        setMutableUser((prev) => {
          return {
            ...prev,
            [id]: value,
          };
        });
      };

    const { mutateAsync, isPending } = useMutation({
        mutationFn: GET_SINGLE_USERS
        ,
        onSuccess: (data) => {
          setUserState((prev) => {
            return {
              ...prev,
              data: data?.data?.body?.user,
            };
          });
          setMutableUser((prev) => {
            return {
              user_id: data?.data?.body?.user.id,
              title: data?.data?.body?.user?.title,
              first_name: data?.data?.body?.user?.first_name,
              last_name: data?.data?.body?.user?.last_name,
              email: data?.data?.body?.user?.email,
              phone: data?.data?.body?.user?.phone,
              middle_name: data?.data?.body?.user?.middle_name ? data?.data?.body?.user?.middle_name : undefined,
            };
          });
          setIsSuspended(data?.data?.body?.user?.suspended)
        },
    });

    // GET USER WALLET
    const { mutateAsync: getUserWallet, isPending: isGettingUserWallet } = useMutation({
        mutationFn: GET_USER_WALLET
        ,
        onSuccess: (data) => {
          setUserState((prev) => {
            return {
              ...prev,
              wallet: data?.data?.body?.wallet,
            };
          });
        },
    });

    // GET TRANSACTIONS UNDER A USER
    const { mutateAsync: getUserTransactions, isPending: isGettingUserTransactions } = useMutation({
        mutationFn: GET_TRANSACTIONS
        ,
        onSuccess: (data) => {
          setUserState((prev) => {
            return {
              ...prev,
              transactions: data?.data?.body?.transactions,
              transactionsCount: data?.data?.body?.total_count,
            };
          });
        },
    });

    // GET EVENTS UNDER A USER
    const { mutateAsync: getUserEvents, isPending: isGettingUserEvents } = useMutation({
        mutationFn: GET_EVENTS,
        onSuccess: (data) => {
          setUserState((prev) => {
            return {
              ...prev,
              events: data?.data?.body?.events,
              eventsCount: data?.data?.body?.total_count,
            };
          });
        },
    });

    // GET BOOKINGS UNDER A USER
    const { mutateAsync: getUserBookings, isPending: isGettingUserBookings } = useMutation({
        mutationFn: GET_BOOKINGS,
        onSuccess: (data) => {
          setUserState((prev) => {
            return {
              ...prev,
              bookings: data?.data?.body?.bookings,
              bookingsCount: data?.data?.body?.total_count,
            };
          });
        },
    });

    // EDIT USER INFORMATION
    const { mutateAsync:editUser, isPending:isEditing } = useMutation({
        mutationFn: EDIT_USER,
        onSuccess: (data) => {
          enqueueSnackbar({
            variant: 'success',
            message: 'Save changes made successfully!'
          })
        },
    });

    const { mutateAsync: suspend_action, isPending: isSuspending } = useMutation({
        mutationFn: SUSPEND_UNSUSPEND_ACTION,
        onSuccess: (data) => {
          enqueueSnackbar({
            variant: 'success',
            message: `${isSuspended ? "You have suspended this user successfully!" : "You have reverted suspension on this user successfully!"}`
          })
          if (id){
            mutateAsync({
                user_id: id,
            });
          }
          setAskSuspend(false)
        },
    });

    const { mutateAsync: deleting_action, isPending: isDeleting } = useMutation({
        mutationFn: DELETE_USER,
        onSuccess: (data) => {
          enqueueSnackbar({
            variant: 'success',
            message: "You have deleted this member's account successfully!"
          })
          navigate('/dashboard/members')
        },
    });

    useEffect(() => {
        if (id){
            mutateAsync({
                user_id: id,
            });
        }
      }, [id]);

      useEffect(() => {
        if (id){
            getUserWallet({
                user_id: Number(id),
            });
        }
      }, [id]);

      useEffect(() => {
        if (id){
            getUserTransactions({
                user_id: id,
                offset: Number(transactionPage) - 1,
                type: transactionType !== '' ? transactionType.toLowerCase() : undefined
            })
        }
      }, [id, transactionPage, transactionType]);

      useEffect(() => {
        if (id){
            getUserEvents({
                user_id: id,
                offset: Number(eventPage) - 1,
                status: 'upcoming'
            })
        }
      }, [id, eventPage]);

      useEffect(() => {
        if (id){
            getUserBookings({
                user_id: id,
                offset: Number(bookingPage) - 1,
                status: 'upcoming'
            })
        }
      }, [id, eventPage]);

    return(
        <>
            {/* FOR SUSPENSION */}
            <AskYesOrNo 
                openToggle={askSuspend}
                headerText={`${isSuspended ? "Unsuspend User" : "Suspend User"}`}
                question={`Are you sure you want to ${isSuspended ? "unsuspend" : "suspend"} this user?`}
                declineText="Cancel"
                actionText={`${isSuspended ? "Unsuspend" : "Suspend"}`}
                yesAction={() => suspend_action({
                    user_id: mutableUser?.user_id
                })}
                noAction={() => setAskSuspend(false)}
                actionInProgress={isSuspending}
            />
            {/* FOR DELETION */}
            <AskYesOrNo 
                openToggle={askDelete}
                headerText={`Delete Member Account`}
                question={`Are you sure you want to delete this member's account?`}
                declineText="Cancel"
                actionText={`Delete`}
                yesAction={() => deleting_action({
                    user_id: mutableUser?.user_id
                })}
                noAction={() => setAskDelete(false)}
                actionInProgress={isDeleting}
            />
            <MainWrap
                top='0rem'
                width='100%'
                maxWidth='1200px'
            >
                <DashboardFlex>
                    <SideBarWidget />
                    <DashboardMain>
                    {
                        isPending ?
                        <div className="h-[80vh] flex items-center justify-center">
                            <PageSpinner
                                // className="border-[#000]"
                                size={"lg"}
                            />
                        </div>
                        :
                        <>
                        <AuthBacknav
                            onClick={() => navigate(-1)}
                        >
                            <Icon.ArrowLeft 
                                color='#8796AD' 
                                size={20}
                            />
                            <p>Back</p>
                        </AuthBacknav>
                        <div className="flex items-center justify-between py-8 border-b border-[#E1E1E1]">
                            <BoxFlex
                                width='60%'
                                gap="16px"
                                vAlign='center'
                            >
                                <RandomCircle
                                    size='64px'
                                >
                                    <img 
                                        src='/images/avatar1.png'
                                        alt='User'
                                    />
                                </RandomCircle>
                                <div 
                                    className='w-[80%]'
                                >
                                    <Typography 
                                        text={`${userState?.data?.first_name} ${userState?.data?.last_name}`}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <div className="bg-[#FCF9F2] text-[12px] py-[4px] px-[12px] rounded-[300px] text-center w-[12rem] inline-block flex gap-[4px] items-center">
                                        <img src="/icons/Medal.png" className='w-[25px]' alt="Medal" />
                                        {userState?.data?.membership_type}
                                    </div>
                                </div>
                            </BoxFlex>
                            <div className="flex gap-[10px]">
                                <Button
                                    bg='#F3F1EF'
                                    color='#23211D'
                                    type='button'
                                    width='auto'
                                    top='0'
                                    disabled
                                >
                                    Export
                                </Button>
                                <Button
                                    bg='#23211D'
                                    color='#fff'
                                    type='button'
                                    width='auto'
                                    top='0'
                                    onClick={() => {
                                        if (actionType !== 'edit'){
                                            setActiontype('edit')
                                        }else {
                                            editUser({
                                                ...mutableUser,
                                                middle_name: mutableUser?.middle_name ? mutableUser?.middle_name : undefined
                                            })
                                        }
                                    }}
                                >
                                    {isEditing ? <Spinner /> : actionType === 'edit' ? 'Save Changes' : 'Edit profile'}
                                </Button>
                            </div>
                        </div>
                        <PageToggleHeader
                            hAlign='start'
                            className='!mt-6'
                        >
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
                            {
                                activePage === 'Overview' ?
                                    <>
                                        
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <ProfileBoxWrap
                                                className='!m-0 !w-full !max-w-full !p-0'
                                            >
                                                <InputWrap>
                                                    <InputField width='32%'>
                                                        <p>Title</p>
                                                        <input 
                                                            id="title"
                                                            onChange={handleChange}
                                                            placeholder='Enter Title'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            disabled={actionType !== 'edit'}
                                                            value={mutableUser?.title}
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>First Name</p>
                                                        <input 
                                                            id="first_name"
                                                            onChange={handleChange}
                                                            placeholder='Enter First Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            disabled={actionType !== 'edit'}
                                                            value={mutableUser?.first_name}
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Middle Name</p>
                                                        <input 
                                                            id="middle_name"
                                                            onChange={handleChange}
                                                            placeholder='Enter Middle Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            disabled={actionType !== 'edit'}
                                                            value={mutableUser?.middle_name}
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Last Name</p>
                                                        <input 
                                                            id="last_name"
                                                            onChange={handleChange}
                                                            placeholder='Enter Last Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            disabled={actionType !== 'edit'}
                                                            value={mutableUser?.last_name}
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Email Address</p>
                                                        <input 
                                                            placeholder='Enter Email Address'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            disabled
                                                            value={mutableUser?.email}
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Phone Number</p>
                                                        <input 
                                                            id="phone"
                                                            onChange={handleChange}
                                                            placeholder='Enter Phone Number'
                                                            autoComplete="off"
                                                            type="number"
                                                            required
                                                            disabled={actionType !== 'edit'}
                                                            value={mutableUser?.phone}
                                                        />
                                                    </InputField>
                                                </InputWrap>
                                            </ProfileBoxWrap>
                                            <div className="border-t py-[2rem] mt-[2rem]">
                                                <div className="flex items-center justify-between">
                                                    <div className='w-[40%]'>
                                                        <h3 className="font-[500]">Delete Member</h3>
                                                        <p className="font-[400] text-[12px] text-[#898579] pt-1">By deleting this Member, you are receding this member’s access from this app.</p>
                                                    </div>
                                                    <Button
                                                        bg='#FFF5F5'
                                                        color='#D23B3B'
                                                        type='button'
                                                        width='auto'
                                                        top='0'
                                                        onClick={() => setAskDelete(true)}
                                                    >
                                                        Delete Member
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="border-t py-[2rem]">
                                                <div className="flex items-center justify-between">
                                                    <div className='w-[40%]'>
                                                        <h3 className="font-[500]">Suspend Member</h3>
                                                        <p className="font-[400] text-[12px] text-[#898579] pt-1">By suspending this Member, the member will be unable to have access to his Member.</p>
                                                    </div>
                                                    <Button
                                                        bg='#F3F1EF'
                                                        color='#23211D'
                                                        type='button'
                                                        width='auto'
                                                        top='0'
                                                        onClick={() => setAskSuspend(true)}
                                                    >
                                                        {isSuspended ? "Unsuspend" : "Suspend"} Member
                                                    </Button>
                                                </div>
                                            </div>
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Transactions' ?
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <div className="flex items-start justify-between">
                                            {isGettingUserWallet ? (
                                                <div className="h-[80vh] flex items-center justify-center">
                                                    <PageSpinner
                                                    // className="border-[#000]"
                                                    size={"lg"}
                                                    />
                                                </div>
                                                ) :
                                                <div className="w-[40%] border rounded-[10px] p-[20px]">
                                                    <div>
                                                        <Typography 
                                                            text='Bar Account Balance'
                                                            color='#898579'
                                                            fontWeight={400}
                                                            fontSize='16px'
                                                            lineHeight='14px'
                                                        />
                                                        <Typography 
                                                            text={`₦${commaNumber(userState?.wallet?.balance)}`}
                                                            color='#1B2229'
                                                            fontWeight={700}
                                                            fontSize='22px'
                                                            lineHeight='14px'
                                                            margin='0.7rem 0 0 0'
                                                        />
                                                    </div>
                                                    <ProgressBar>
                                                        <progress value={Number(userState?.wallet?.total_spent_this_year)} max={100000}></progress>
                                                    </ProgressBar>
                                                    <BoxFlex
                                                        margin='0.3rem 0 0 0'
                                                        gap='5px'
                                                    >
                                                        <Typography 
                                                            text='₦100,000.00'
                                                            fontWeight={500}
                                                            fontSize='14px'
                                                            lineHeight='14px'
                                                        />
                                                        <Typography 
                                                            text={`minimum spend`}
                                                            color='#898579'
                                                            fontWeight={500}
                                                            fontSize='14px'
                                                            lineHeight='14px'
                                                        />
                                                    </BoxFlex>
                                                    <div className="border-t py-[1rem] mt-[1rem]">
                                                        <div className=''>
                                                            <p className="font-[400] text-[12px] text-[#898579]">Minimum spend reset date</p>
                                                            <h3 className="font-[500] pt-1">Jan 1, {new Date().getFullYear() + 1}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="border-t py-[1rem]">
                                                        <div className=''>
                                                            <p className="font-[400] text-[12px] text-[#898579]">Minimum Balanced Reached </p>
                                                            <h3 className="font-[500] pt-1">{Number(userState?.wallet?.total_spent_this_year) > 100000 ? "Yes" : "No"}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="border-t py-[1rem]">
                                                        <div className=''>
                                                            <p className="font-[400] text-[12px] text-[#898579]">Total transaction value</p>
                                                            <h3 className="font-[500] pt-1">₦{commaNumber(Number(userState?.wallet?.total_spent))}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                                <div className="border-r h-[25rem]"></div>
                                                <div className="w-[45%]">
                                                    <div>
                                                        <div className="flex justify-between items-center gap-[8px]">
                                                            <p className="text-[14px] text-[#091525] font-medium">Filter by:</p>
                                                            <select
                                                                className="w-[10rem] py-2 px-3 text-[14px] rounded-[8px] !border !border-[1px] !border-[#E5DFD9]"
                                                                style={{
                                                                    border: "1px solid #E5DFD9"
                                                                }}
                                                                value={transactionType}
                                                                onChange={(e) => {
                                                                    setTransactionType(e.target.value)
                                                                }}
                                                            >
                                                                <option value="">All</option>
                                                                <option value="credit">Credit</option>
                                                                <option value="debit">Debit</option>
                                                            </select>
                                                        </div>
                                                        <div className="mt-[1rem]">
                                                            {
                                                                isGettingUserTransactions ? 
                                                                    <TransactionSkeleton />
                                                                    :
                                                                (userState && userState?.transactions && userState?.transactions.length > 0) ? 
                                                                    <div>
                                                                        {
                                                                            userState?.transactions.map((item:any, index:number) => (
                                                                                <TransactionCard 
                                                                                    key={index}
                                                                                    amount={item?.amount}
                                                                                    date={item.created_at}
                                                                                    description={item.desc}
                                                                                    type={item.type}
                                                                                />
                                                                            ))
                                                                        }
                                                                        {userState?.transactionsCount > 20 && (
                                                                            <Paginate
                                                                                itemsPerPage={20}
                                                                                pageCount={Math.ceil(Number(userState?.transactionsCount) / 20)}
                                                                                page={transactionPage}
                                                                                setPage={setTransactionPage}
                                                                                totalItems={userState?.transactionsCount}
                                                                            />
                                                                        )}
                                                                    </div> : 
                                                                    <EmptyState 
                                                                        text='No transactions yet'
                                                                    />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                       
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Events' &&
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            {
                                                isGettingUserEvents ? 
                                                    <TransactionSkeleton />
                                                    :
                                                (userState && userState?.events && userState?.events.length > 0) ? 
                                                    <div>
                                                        <div className="grid grid-cols-2 gap-[20px]">
                                                            {
                                                                userState?.events.map((item:any, index:number) => (
                                                                    <div 
                                                                        key={index}
                                                                        className="border rounded-[10px] p-[16px]"
                                                                    >
                                                                        <h3 className='font-black'>{item?.title ? item.title : 'N/A'}</h3>
                                                                        <div className="flex justify-between items-center mt-4">
                                                                            <div className="w-[70%]">
                                                                                <div className="flex items-center gap-[8px] pb-3">
                                                                                    <IconSax.Calendar color='#0FA3A3' />
                                                                                    <p className="text-[12px]">{moment(item.time).format('LL')}</p>
                                                                                </div>
                                                                                <div className="flex items-center gap-[8px] pb-3">
                                                                                    <IconSax.Clock color='#D525AE' />
                                                                                    <p className="text-[12px]">{moment(item.time).format('LT')}</p>
                                                                                </div>
                                                                                <div className="flex items-center gap-[8px] pb-3">
                                                                                    <IconSax.Location color='#67B109' />
                                                                                    <p className="text-[12px]">{item.location ? item.location : 'N/A'}</p>
                                                                                </div>
                                                                            </div>
                                                                            <img 
                                                                                src={item.cover ? `${getCdnLink(`${item?.cover}`, 'event')}` : "/images/dummy.jpeg"} 
                                                                                alt="Cover" 
                                                                                className="w-[80px] h-[80px] object-cover rounded-[8px]" 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        {userState?.eventsCount > 20 && (
                                                            <Paginate
                                                                itemsPerPage={20}
                                                                pageCount={Math.ceil(Number(userState?.eventsCount) / 20)}
                                                                page={eventPage}
                                                                setPage={setEventPage}
                                                                totalItems={userState?.eventsCount}
                                                            />
                                                        )}
                                                    </div> : 
                                                    <EmptyState 
                                                        text='No upcoming event registered yet'
                                                    />
                                            }
                                        </DashboardInner>
                                    </>
                            }
                            {
                                activePage === 'Bookings' &&
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            {
                                                isGettingUserBookings ? 
                                                    <TransactionSkeleton />
                                                    :
                                                (userState && userState?.bookings && userState?.bookings.length > 0) ? 
                                                    <div>
                                                        <div className="grid grid-cols-2 gap-[20px]">
                                                            {
                                                                userState?.bookings.map((item:any, index:number) => (
                                                                    <div 
                                                                        key={index}
                                                                        className="border rounded-[10px] p-[16px]"
                                                                    >
                                                                        <h3 className='font-black'>{item?.product?.title ? item?.product?.title : 'N/A'}</h3>
                                                                        <div className="flex justify-between items-center mt-4">
                                                                            <div className="w-[70%]">
                                                                                <div className="flex items-center gap-[8px] pb-3">
                                                                                    <IconSax.Calendar color='#0FA3A3' />
                                                                                    <p className="text-[12px]">{moment(item.start_date).format('LL')}</p>
                                                                                </div>
                                                                                <div className="flex items-center gap-[8px] pb-3">
                                                                                    <IconSax.Clock color='#D525AE' />
                                                                                    <p className="text-[12px]">{item.time}</p>
                                                                                </div>
                                                                                <div className="flex items-center gap-[8px] pb-3">
                                                                                    <IconSax.Category color='#67B109' />
                                                                                    <p className="text-[12px] capitalize">{item?.product?.category}</p>
                                                                                </div>
                                                                            </div>
                                                                            <img 
                                                                                src={item?.product?.cover ? `${getCdnLink(`${item?.product?.cover}`, 'inventory')}` : "/images/dummy.jpeg"} 
                                                                                alt="Cover" 
                                                                                className="w-[80px] h-[80px] object-cover rounded-[8px]" 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        {userState?.bookingsCount > 20 && (
                                                            <Paginate
                                                                itemsPerPage={20}
                                                                pageCount={Math.ceil(Number(userState?.bookingsCount) / 20)}
                                                                page={bookingPage}
                                                                setPage={setBookingPage}
                                                                totalItems={userState?.bookingsCount}
                                                            />
                                                        )}
                                                    </div> : 
                                                    <EmptyState 
                                                        text='No bookings yet'
                                                    />
                                            }
                                        </DashboardInner>
                                    </>
                            }
                            {
                                activePage === 'Subscription' ?
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="w-[40%] rounded-[10px] p-[20px] text-center">
                                                    <div>
                                                        <img src="/icons/Medal.png" className='w-[60px] h-[60px] block mx-auto' alt="Medal" />
                                                        <Typography 
                                                            text='Ordinary Membership'
                                                            color='#1B2229'
                                                            fontWeight={500}
                                                            fontSize='18px'
                                                            lineHeight='14px'
                                                            align='center'
                                                            margin='1rem 0 0 0'
                                                        />
                                                        <Typography 
                                                            text='Member since 12 May, 2024'
                                                            color='#898579'
                                                            fontWeight={400}
                                                            fontSize='14px'
                                                            lineHeight='14px'
                                                            align='center'
                                                            margin='0.7rem 0 0 0'
                                                        />
                                                        <Button
                                                            bg='#23211D'
                                                            color='#fff'
                                                            type='button'
                                                            width='auto'
                                                            top='0'
                                                            className='!my-4 !mx-auto'
                                                        >
                                                            Renew Subcription
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center justify-between w-[80%] mx-auto mt-[3rem]">
                                                        <div className='text-center'>
                                                            <p className="font-[400] text-[11px] text-[#898579]">Last Subscription</p>
                                                            <h3 className="font-[500] pt-1 text-[13px]">April 10, 2024</h3>
                                                        </div>
                                                        <div className="h-[4rem] border-r"></div>
                                                        <div className='text-center'>
                                                            <p className="font-[400] text-[11px] text-[#898579]">Last Subscription</p>
                                                            <h3 className="font-[500] pt-1 text-[13px]">April 10, 2024</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-r h-[25rem]"></div>
                                                <div className="w-[45%]">
                                                    <div>
                                                        <h3 className="font-[900]">History</h3>
                                                        <div className="mt-[1rem]">
                                                            <TransactionCard />
                                                            <TransactionCard />
                                                            <TransactionCard />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                            <div className="border-t py-[2rem]">
                                                <div className="flex items-center justify-between">
                                                    <div className='w-[40%]'>
                                                        <h3 className="font-[500]">Change Subscription</h3>
                                                        <p className="font-[400] text-[12px] text-[#898579] pt-[2rem] pb-2">Select Subscription</p>
                                                        <select
                                                                className="w-[15rem] py-3 px-3 text-[14px] rounded-[8px] !border !border-[1px] !border-[#E5DFD9]"
                                                                style={{
                                                                    border: "1px solid #E5DFD9"
                                                                }}
                                                            >
                                                                <option value="">Diplomatic Member</option>
                                                            </select>
                                                    </div>
                                                    <Button
                                                        bg='#F3F1EF'
                                                        color='#23211D'
                                                        type='button'
                                                        width='auto'
                                                        top='0'
                                                    >
                                                        Modify
                                                    </Button>
                                                </div>
                                            </div>            
                                            <div className="border-t py-[2rem]">
                                                <div className="flex items-center justify-between">
                                                    <div className='w-[40%]'>
                                                        <h3 className="font-[500]">Cancel Subscription</h3>
                                                        <p className="font-[400] text-[12px] text-[#898579] pt-1">By deleting this Member, you are receding this member’s access from this app.</p>
                                                    </div>
                                                    <Button
                                                        bg='#FFF5F5'
                                                        color='#D23B3B'
                                                        type='button'
                                                        width='auto'
                                                        top='0'
                                                    >
                                                        Cancel Subscription
                                                    </Button>
                                                </div>
                                            </div>               
                                        </DashboardInner>
                                    </>
                                    : null
                                }
                            </>
                        }
                    </DashboardMain>
                </DashboardFlex>
                {
                    showEdit ?
                        <EditProfile 
                            closeFunc={() => setShowEdit(false)}
                        />
                        : null
                }
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default MemberProfile;

const pageItems = ['Overview', 'Transactions', 'Events', 'Bookings', 'Subscription']