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
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser } from '../../../store/user/reducer';
import { clearState } from '../../../store/properties/reducer';
import { useCurrentUser } from '../../../store/user/useCurrentUser';
import { removeAfterLogout } from '../../../api/instance';
import TransactionCard from '../TransactionCard';

const OrderInfo = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();
    const currentUser = useCurrentUser().user;

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
                                    src='/images/bag.png'
                                    alt='User'
                                    className='w-[80px]'
                                />
                                <div 
                                    className='w-[80%]'
                                >
                                    <Typography 
                                        text={'Order for Olanrewaju Benjamin'}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <Typography 
                                        text={'#12093707'}
                                        fontWeight={500}
                                        fontSize='16px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <div className="bg-[#FCF9F2] border border-[#EBD7AD] text-[12px] py-[4px] px-[12px] rounded-[300px] text-center w-auto inline-block">
                                        {'Processing'}
                                    </div>
                                </div>
                            </BoxFlex>
                            <div className="flex gap-[10px]">
                                <p className='font-bold text-[14px]'>20mins ago</p>
                            </div>
                        </div>
                        <DashboardInner
                            style={{
                                margin: 0,
                            }}
                            className='!justify-start'
                        >
                            <div className="grid grid-cols-2 gap-[20px]">
                                {
                                    Array(4).fill(0).map((item, index) => (
                                        <div 
                                            key={index}
                                            className="border rounded-[10px] p-[16px]"
                                        >
                                            <div className="flex gap-[16px] items-center">
                                                <img src="/images/food1.png" alt="swim" className="w-[80px] h-[80px]" />
                                                <div className="w-[70%]">
                                                    <div className="flex items-center justify-between">
                                                        <div className="bg-[#FCF9F2] text-[12px] py-[4px] px-[8px] rounded-[300px] text-center w-auto inline-block mb-2">
                                                            {'Eat-in'}
                                                        </div>
                                                        <p className="text-[14px] text-[#898579]">1 plate</p>
                                                    </div>
                                                    <p className="text-[12px]">Fries Rice, fish, egg and plantain</p>
                                                    <p className="text-[13px] font-bold">₦5,500</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="border-t py-[2rem] mt-[8rem]">
                                <div className="flex items-center justify-between">
                                    <div className='w-[40%]'>
                                        <h3 className="font-[500]">Total: ₦24,000.00</h3>
                                    </div>
                                    <div className="flex items-center gap-[16px]">
                                        <Button
                                            bg='#FFF5F5'
                                            color='#D23B3B'
                                            type='button'
                                            width='auto'
                                            top='0'
                                        >
                                            Decline Order
                                        </Button>
                                        <Button
                                            bg='#23211D'
                                            color='#fff'
                                            type='button'
                                            width='auto'
                                            top='0'
                                        >
                                            Verify Order
                                        </Button>
                                    </div>
                                    
                                </div>
                            </div>   
                        </DashboardInner>
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default OrderInfo;

const pageItems = ['Overview', 'Transactions', 'Appointments', 'Subscription']