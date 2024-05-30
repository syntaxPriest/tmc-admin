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

const TransactionInfo = () => {
    
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
                                <div 
                                    className='w-[80%]'
                                >
                                    <Typography 
                                        text={'₦8,000'}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <Typography 
                                        text={'On May 25, 2024, 09:10'}
                                        color='#091525'
                                        fontWeight={500}
                                        fontSize='14px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                </div>
                            </BoxFlex>
                            <div className="flex gap-[10px]">
                                <div className="bg-[#FEF3F2] border border-[#FECDCA] text-[11px] text-[#B42318] py-[4px] px-[12px] rounded-[300px] text-center w-auto inline-block mt-3">
                                    Debit
                                </div>
                            </div>
                        </div>
                            {
                                activePage === 'Details' ?
                                    <>
                                        
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Date</p>
                                                    <h3 className='text-[15px] font-[600]'>May 25, 2024, 09:10</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Transaction Reference</p>
                                                    <h3 className='text-[15px] font-[600]'>QSH29345495b343f34c</h3>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Transaction Narration</p>
                                                    <h3 className='text-[15px] font-[600]'>Spaces-Booking-Fee</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Bar Account ID</p>
                                                    <h3 className='text-[15px] font-[600]'>203293</h3>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Member</p>
                                                    <h3 className='text-[15px] font-[600]'>Olanrewaju Oredipe</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Bar Account ID</p>
                                                    <h3 className='text-[15px] font-[600]'>203293</h3>
                                                </div>
                                            </div>   
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default TransactionInfo;

const pageItems = ['Details', 'Attendees',]