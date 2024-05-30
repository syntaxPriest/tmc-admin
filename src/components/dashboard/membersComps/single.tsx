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

const MemberProfile = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();
    const currentUser = useCurrentUser().user;

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
                                <RandomCircle
                                    size='64px'
                                >
                                    <img 
                                        src='/images/ola.png'
                                        alt='User'
                                    />
                                </RandomCircle>
                                <div 
                                    className='w-[80%]'
                                >
                                    <Typography 
                                        text={'Olanrewaju Benjamin'}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <div className="bg-[#FCF9F2] text-[12px] py-[4px] px-[12px] rounded-[300px] text-center w-[10rem] inline-block flex gap-[4px] items-center">
                                        <img src="/icons/Medal.png" className='w-[25px]' alt="Medal" />
                                        {'Ordinary Member'}
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
                                    Edit profile
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
                                                            placeholder='Enter Title'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>First Name</p>
                                                        <input 
                                                            placeholder='Enter First Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Middle Name</p>
                                                        <input 
                                                            placeholder='Enter Middle Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Last Name</p>
                                                        <input 
                                                            placeholder='Enter Last Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Email Address</p>
                                                        <input 
                                                            placeholder='Enter Email Address'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                        />
                                                    </InputField>
                                                    <InputField width='32%'>
                                                        <p>Phone Number</p>
                                                        <input 
                                                            placeholder='Enter Phone Number'
                                                            autoComplete="off"
                                                            type="number"
                                                            required
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
                                                    >
                                                        Suspend Member
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
                                                            text='₦10,000.00'
                                                            color='#1B2229'
                                                            fontWeight={700}
                                                            fontSize='22px'
                                                            lineHeight='14px'
                                                            margin='0.7rem 0 0 0'
                                                        />
                                                    </div>
                                                    <ProgressBar>
                                                        <progress value={21} max={100}></progress>
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
                                                            <h3 className="font-[500] pt-1">April 10, 2024</h3>
                                                        </div>
                                                    </div>
                                                    <div className="border-t py-[1rem]">
                                                        <div className=''>
                                                            <p className="font-[400] text-[12px] text-[#898579]">Minimum Balanced Reached </p>
                                                            <h3 className="font-[500] pt-1">Yes</h3>
                                                        </div>
                                                    </div>
                                                    <div className="border-t py-[1rem]">
                                                        <div className=''>
                                                            <p className="font-[400] text-[12px] text-[#898579]">Total transaction value</p>
                                                            <h3 className="font-[500] pt-1">₦1,820,000</h3>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                            >
                                                                <option value="">Top-up</option>
                                                            </select>
                                                        </div>
                                                        <div className="mt-[1rem]">
                                                            <TransactionCard />
                                                            <TransactionCard />
                                                            <TransactionCard />
                                                            <TransactionCard />
                                                            <TransactionCard />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                       
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Appointments' &&
                                    <>
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
                                                            <h3 className='font-black'>Swimming Lessons</h3>
                                                            <div className="flex justify-between items-center mt-4">
                                                                <div className="w-[70%]">
                                                                    <div className="flex items-center gap-[8px] pb-3">
                                                                        <IconSax.Calendar color='#0FA3A3' />
                                                                        <p className="text-[12px]">May 21</p>
                                                                    </div>
                                                                    <div className="flex items-center gap-[8px] pb-3">
                                                                        <IconSax.Clock color='#D525AE' />
                                                                        <p className="text-[12px]">4:30 PM</p>
                                                                    </div>
                                                                    <div className="flex items-center gap-[8px] pb-3">
                                                                        <IconSax.Location color='#67B109' />
                                                                        <p className="text-[12px]">Club Main Hall</p>
                                                                    </div>
                                                                </div>
                                                                <img src="/images/swimming-pool.png" alt="swim" className="w-[80px] h-[80px]" />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
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

const pageItems = ['Overview', 'Transactions', 'Appointments', 'Subscription']