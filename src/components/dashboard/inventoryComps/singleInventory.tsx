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

const SingleInventory = () => {
    
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
                                        text={'Salad Nicoise'}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <Typography 
                                        text={'Mixed Vegetable with Sardine & Boiled Egg'}
                                        color='#091525'
                                        fontWeight={500}
                                        fontSize='14px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
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
                                    Restock
                                </Button>
                                <Button
                                    bg='#23211D'
                                    color='#fff'
                                    type='button'
                                    width='auto'
                                    top='0'
                                >
                                    Edit Item
                                </Button>
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
                                                    <p className='text-[13px]'>Price</p>
                                                    <h3 className='text-[15px] font-[600]'>₦8,000</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Quantity Available</p>
                                                    <h3 className='text-[15px] font-[600]'>300</h3>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Category</p>
                                                    <div className="bg-[#fff] border border-[#D0D5DD] text-[11px] py-[4px] px-[12px] rounded-[8px] text-center w-auto inline-block mt-3">
                                                        Salad
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Status</p>
                                                    <div className="bg-[#FEF3F2] border border-[#FECDCA] text-[11px] text-[#B42318] py-[4px] px-[12px] rounded-[300px] text-center w-auto inline-block mt-3">
                                                        Upcoming
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Product ID</p>
                                                    <h3 className='text-[15px] font-[600]'>2033</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>SKU</p>
                                                    <h3 className='text-[15px] font-[600]'>#RTG-24245</h3>
                                                </div>
                                            </div>
                                            <div className="border-t py-[2rem]">
                                                <div className="flex items-center justify-between">
                                                    <div className='w-[40%]'>
                                                        <h3 className="font-[500]">Delete Item</h3>
                                                        <p className="font-[400] text-[12px] text-[#898579] pt-1">By deleting this item, you are removing this item completely from this app.</p>
                                                    </div>
                                                    <Button
                                                        bg='#FFF5F5'
                                                        color='#D23B3B'
                                                        type='button'
                                                        width='auto'
                                                        top='0'
                                                    >
                                                        Delete Item
                                                    </Button>
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

export default SingleInventory;

const pageItems = ['Details', 'Attendees',]