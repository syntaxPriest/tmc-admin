import React, { useState } from 'react';
import { BoxFlex, Line, MainWrap, PageListItem, PageListItemWrap, PageToggleText, RandomCircle,} from '../../../styles/reusable/index';
import SideBarWidget from '../../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardInner, DashboardMain, ProfileBoxWrap, ProgressBar } from './../style';
import QuickActionWidget from '../../reusable/quickaction';
import Typography from '../../reusable/typography';
import { PageToggleHeader, IconFlex, ButtonFlex } from '../../../styles/reusable/index';
import * as Icon from 'react-feather';
import * as IconSax from "iconsax-react";
import { Button } from '../../../styles/reusable';
import { useNavigate } from 'react-router-dom';
import { InputWrap, InputField, AuthBacknav } from '../../../styles/authentication/index';
import EditProfile from './../edit-profile';
import BottomNavComp from '../../reusable/bottomNav';
import { ArrowLeftOnRectangleIcon, EllipsisVerticalIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser } from '../../../store/user/reducer';
import { clearState } from '../../../store/properties/reducer';
import { useCurrentUser } from '../../../store/user/useCurrentUser';
import { removeAfterLogout } from '../../../api/instance';
import TransactionCard from '../TransactionCard';
import { members } from '../members';
import PaginationComp from '../../reusable/pagination';

const SingleEvent = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();
    const currentUser = useCurrentUser().user;

    const [activePage, setActivePage] = useState('Details');
    const [showPassword, setShowPassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

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
                                <img 
                                    src='/images/food1.png'
                                    alt='User'
                                    className='w-[80px]'
                                />
                                <div 
                                    className='w-[80%]'
                                >
                                    <Typography 
                                        text={'Karaoke & Games with Alali VI'}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <Typography 
                                        text={'₦10,000.00'}
                                        color='#091525'
                                        fontWeight={500}
                                        fontSize='16px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <div className="bg-[#FCF9F2] border border-[#EBD7AD] text-[12px] py-[4px] px-[12px] rounded-[300px] text-center w-auto inline-block">
                                        Upcoming
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
                                >
                                    Export
                                </Button>
                                <Button
                                    bg='#23211D'
                                    color='#fff'
                                    type='button'
                                    width='auto'
                                    top='0'
                                >
                                    Edit Event
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
                                activePage === 'Details' ?
                                    <>
                                        
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <div className="grid grid-cols-3 gap-[30px]">
                                                <div>
                                                    <p className='text-[13px]'>Location</p>
                                                    <h3 className='text-[15px] font-[600]'>Club Main Hall</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Date</p>
                                                    <h3 className='text-[15px] font-[600]'>14/06/2024</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Time</p>
                                                    <h3 className='text-[15px] font-[600]'>2:30 PM</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Attendees</p>
                                                    <h3 className='text-[15px] font-[600]'>500</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Reminders</p>
                                                    <h3 className='text-[15px] font-[600]'>2 days to event</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Special Guest(s)</p>
                                                    <h3 className='text-[15px] font-[600]'>Chief Commander Ebenezer Obey</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Total Payment Collected</p>
                                                    <h3 className='text-[15px] font-[600]'>₦5,000,000</h3>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-[13px] mt-[2rem] mb-[0.6rem] font-[500] text-[#898579]'>About Event</p>
                                                <h3 className='text-[15px] font-[400]'>Karaoke & Games meet-ups connect food tech entrepreneurs, investors, researchers, seasoned executives and managers from producers, retailers and service providers from the most relevant companies and institutions in the agri-food scene. This event will focus on the advantages and challenges of partnering with Big Food companies to propel your growth. Leaders at some of the largest national and international food companies will tell you the secrets and trials of embarking on partnerships with these giants to grow your business.</h3>
                                            </div>
                                            <div>
                                                <p className='text-[16px] mt-[2rem] mb-[0.6rem] font-[500] text-[#898579]'>Uploads</p>
                                                <div className="flex items-center gap-[24px]">
                                                    <div className="flex items-center gap-[10px] bg-[#FCF9F2] border border-[#E1E1E1] rounded-[10px] py-2 px-9 w-[30%]">
                                                        <PaperClipIcon className='w-5 h-5' color='#898579' />
                                                        <div>
                                                            <h3 className='text-[15px] font-[600]'>Event document</h3>
                                                            <p className='text-[13px] text-[#898579]'>2 min read</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-[10px] bg-[#FCF9F2] border border-[#E1E1E1] rounded-[10px] py-2 px-9 w-[30%]">
                                                        <PaperClipIcon className='w-5 h-5' color='#898579' />
                                                        <div>
                                                            <h3 className='text-[15px] font-[600]'>Event document</h3>
                                                            <p className='text-[13px] text-[#898579]'>2 min read</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className='text-[16px] mt-[2rem] mb-[0.6rem] font-[500] text-[#898579]'>Cover Image</p>
                                                <img 
                                                    src="/images/karaoke.png" 
                                                    alt="Event Cover" 
                                                    className="w-[120px] h-[120px]"
                                                />
                                            </div>
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Attendees' &&
                                    <>
                                        
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <div className="">
                                                {/* Table Header */}
                                                <div className='flex items-end mt-[0rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
                                                    <p className='flex-[6] text-[14px]'>Member</p>
                                                    <p className='flex-[2] text-[14px]'>ID No.</p>
                                                    <p className='flex-[3] text-[14px]'>Phone Number</p>
                                                    <p className='flex-[3] text-[14px]'>Registered On</p>
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
                                        </DashboardInner>
                                    </>
                            }
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default SingleEvent;

const pageItems = ['Details', 'Attendees',]