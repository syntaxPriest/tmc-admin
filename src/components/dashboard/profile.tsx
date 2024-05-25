import React, { useState } from 'react';
import { BoxFlex, Line, MainWrap, PageListItem, PageListItemWrap, PageToggleText, RandomCircle,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardInner, DashboardMain, ProfileBoxWrap } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import { PageToggleHeader, IconFlex, ButtonFlex } from '../../styles/reusable/index';
import * as Icon from 'react-feather';
import { Button } from '../../styles/reusable';
import { useNavigate } from 'react-router-dom';
import { InputWrap, InputField } from '../../styles/authentication/index';
import EditProfile from './edit-profile';
import BottomNavComp from '../reusable/bottomNav';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser } from '../../store/user/reducer';
import { clearState } from '../../store/properties/reducer';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import { removeAfterLogout } from '../../api/instance';

const DashboardProfile = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();
    const currentUser = useCurrentUser().user;

    const [activePage, setActivePage] = useState('Profile');
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
                        <DashboardHeader>
                            <Typography 
                                text='Profile'
                                color='#091525'
                                fontWeight={500}
                                fontSize='16px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <DashboardInner>
                            <RandomCircle
                                style={{
                                    margin: '0 auto',
                                }}
                                size='72px'
                            >
                                <img 
                                    src='/images/dummy-user.png'
                                    alt='User'
                                />
                            </RandomCircle>
                            <Typography 
                                text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                                color='#091525'
                                fontWeight={700}
                                fontSize='20px'
                                lineHeight='22px'
                                align='center'
                                margin='1rem 0 0.4rem 0'
                            />
                            <Typography 
                                text={`${currentUser?.email}`}
                                color='#091525'
                                fontWeight={400}
                                fontSize='14px'
                                lineHeight='21px'
                                align='center'
                            />
                            <ButtonFlex
                                hAlign='center'
                                margin='12px 0 0 0'
                            >
                                <Button
                                    bg='#fff'
                                    color='var(--primary-color)'
                                    type='button'
                                    width='auto'
                                    top='0'
                                    border='1px solid var(--primary-color)'
                                    onClick={() => setShowEdit(true)}
                                >
                                    Edit profile
                                </Button>
                            </ButtonFlex>
                        </DashboardInner>
                            <PageToggleHeader
                                hAlign='center'
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
                                activePage === 'Profile' ?
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                        >
                                            <ProfileBoxWrap>
                                                <Typography 
                                                    text='Personal details'
                                                    color='#091525'
                                                    fontWeight={500}
                                                    fontSize='16px'
                                                    lineHeight='21px'
                                                    margin='0 0 1.5rem 0'
                                                />
                                                <PageListItemWrap
                                                    style={{
                                                        borderBottom: 'none'
                                                    }}
                                                >
                                                    <PageListItem width='50%'>
                                                        <p>Phone</p>
                                                        <h3>{`${currentUser?.phone}`}</h3>
                                                    </PageListItem>
                                                    <PageListItem width='50%'>
                                                        <p>Date of birth</p>
                                                        <h3>10th Oct, 1985</h3>
                                                    </PageListItem>
                                                </PageListItemWrap>
                                                <Typography 
                                                    text='Employment details'
                                                    color='#091525'
                                                    fontWeight={500}
                                                    fontSize='16px'
                                                    lineHeight='21px'
                                                    margin='1rem 0 1.5rem 0'
                                                />
                                                <PageListItemWrap
                                                    style={{
                                                        borderBottom: 'none'
                                                    }}
                                                >
                                                    <PageListItem width='50%'>
                                                        <p>Status</p>
                                                        <h3>Employed</h3>
                                                    </PageListItem>
                                                    <PageListItem width='50%'>
                                                        <p>Pension</p>
                                                        <h3>Yes</h3>
                                                    </PageListItem>
                                                </PageListItemWrap>
                                            </ProfileBoxWrap>
                                            <BoxFlex
                                                hAlign='center'
                                                vAlign='center'
                                                gap='10px'
                                                margin="2rem 0 0 0"
                                                className='cursor-pointer'
                                                onClick={() => logoutUser()}
                                            >
                                                <ArrowLeftOnRectangleIcon className='w-5 h-5' color='#D23B3B' />
                                                <Typography 
                                                    text='Log out'
                                                    color='#D23B3B'
                                                    fontWeight={500}
                                                    fontSize='15px'
                                                    lineHeight='20px'
                                                />
                                            </BoxFlex>
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Security' ?
                                    <>
                                        <ProfileBoxWrap
                                            style={{
                                                border: 'none'
                                            }}
                                        >
                                            <Typography 
                                                text='Change Password'
                                                color='#091525'
                                                fontWeight={500}
                                                fontSize='16px'
                                                lineHeight='21px'
                                                margin='1rem 0 1.5rem 0'
                                            />
                                            <InputWrap>
                                                <InputField
                                                    margin='0 0 0.4rem 0'
                                                >
                                                    <p>New Password</p>
                                                    <input 
                                                        type={showPassword ? 'text': 'password'}
                                                        placeholder="Enter Password"
                                                        autoComplete="off"
                                                    />
                                                    {
                                                        showPassword ?
                                                            <i>
                                                                <Icon.EyeOff 
                                                                    strokeWidth={1}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            </i>
                                                            :
                                                            <i>
                                                                <Icon.Eye 
                                                                    strokeWidth={1}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            </i>
                                                    }
                                                </InputField>
                                                <InputField
                                                    margin='0.4rem 0 0.4rem 0'
                                                >
                                                    <p>Confirm Password</p>
                                                    <input 
                                                        type={showPassword ? 'text': 'password'}
                                                        placeholder="Re-enter Password"
                                                        autoComplete="off"
                                                    />
                                                    {
                                                        showPassword ?
                                                            <i>
                                                                <Icon.EyeOff 
                                                                    strokeWidth={1}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            </i>
                                                            :
                                                            <i>
                                                                <Icon.Eye 
                                                                    strokeWidth={1}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                />
                                                            </i>
                                                    }
                                                </InputField>
                                            </InputWrap>
                                            <Button
                                                bg='var(--primary-color)'
                                                color='#fff'
                                                type='submit'
                                                width='auto'
                                                top='30px'
                                                onClick={() => navigate('/login')}
                                            >
                                                Create Password
                                            </Button>
                                        </ProfileBoxWrap>
                                    </>
                                    : null
                            }
                    </DashboardMain>
                    <QuickActionWidget />
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

export default DashboardProfile;

const pageItems = ['Profile', 'Security']