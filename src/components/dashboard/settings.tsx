import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { User } from '../../utils/types';
import { EDIT_USER } from '../../api/action';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { Spinner } from '../reusable/spinner';
import OTPVerifyScreen from './modals/otp-input';
import { INIT_PASSWORD_CHANGE } from '../../api/auth/onboarding';

const DashboardProfile = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [actionType, setActiontype] = useState("")
    const [openOtpscreen, setOpenOtpScreen] = useState(false);
    const currentUser = useCurrentUser().user;
    const [mutableUser, setMutableUser] = useState<User>();
    const [passwordObject, setPasswordObject] = useState<{
        password: string;
        confirmPassword: string;
    }>({
        password: "",
        confirmPassword: ""
    })

    const [activePage, setActivePage] = useState('Profile');
    const [showPassword, setShowPassword] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        setMutableUser((prev) => {
            return {
              user_id: currentUser?.id,
              title: currentUser?.title,
              first_name: currentUser?.first_name,
              last_name: currentUser?.last_name,
              email: currentUser?.email,
              phone: currentUser?.phone,
              middle_name: currentUser?.middle_name,
            };
        });
    }, [currentUser])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const { id, value } = e.target;
    
        if (id.toLowerCase().includes('password')){
            setPasswordObject((prev) => {
                return {
                  ...prev,
                  [id]: value,
                };
              });
        }else {
            setMutableUser((prev) => {
            return {
                ...prev,
                [id]: value,
            };
            });
        }
    };

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

    // REQUEST PASSWORD RESET
    const { mutateAsync:initPasswordChange, isPending:isInitializingRequest } = useMutation({
        mutationFn: INIT_PASSWORD_CHANGE,
        onSuccess: (data) => {
            setOpenOtpScreen(true);
        },
    });

    return(
        <>
            <OTPVerifyScreen
                openToggle={openOtpscreen}
                closeFunc={() => {
                    setOpenOtpScreen(false);
                }}
                resendOnProcess={false}
                resendOtp={() => {}}
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
                                text='Settings'
                                color='#091525'
                                fontWeight={500}
                                fontSize='24px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <PageToggleHeader
                            hAlign='start'
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
                                        <div className="flex items-center justify-between py-8 border-b border-[#E1E1E1]">
                                            <BoxFlex
                                                width='80%'
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
                                                        text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                                                        color='#091525'
                                                        fontWeight={700}
                                                        fontSize='20px'
                                                        lineHeight='22px'
                                                        margin='0 0 0.4rem 0'
                                                    />
                                                    <div className="bg-[#FCF9F2] text-[12px] py-[4px] px-[12px] rounded-[300px] text-center w-[auto] inline-block capitalize">
                                                        {`${currentUser?.role}`}
                                                    </div>
                                                </div>
                                            </BoxFlex>
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
                                                            ...mutableUser
                                                        })
                                                    }
                                                }}
                                            >
                                                 {isEditing ? <Spinner /> : actionType === 'edit' ? 'Save Changes' : 'Edit profile'}
                                            </Button>
                                        </div>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <ProfileBoxWrap
                                                className='!m-0'
                                            >
                                                <InputWrap>
                                                    <InputField width='48%'>
                                                        <p>First Name</p>
                                                        <input 
                                                            placeholder='Enter First Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            id='first_name'
                                                            value={mutableUser?.first_name}
                                                            onChange={handleChange}
                                                        />
                                                    </InputField>
                                                    <InputField width='48%'>
                                                        <p>Last Name</p>
                                                        <input 
                                                            placeholder='Enter Last Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            id='last_name'
                                                            value={mutableUser?.last_name}
                                                            onChange={handleChange}
                                                        />
                                                    </InputField>
                                                    <InputField width='48%'>
                                                        <p>Middle Name</p>
                                                        <input 
                                                            placeholder='Enter Middle Name'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            id='middle_name'
                                                            value={mutableUser?.middle_name}
                                                            onChange={handleChange}
                                                        />
                                                    </InputField>
                                                    <InputField width='48%'>
                                                        <p>Email Address</p>
                                                        <input 
                                                            placeholder='Enter Email Address'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            disabled
                                                            id='email'
                                                            value={mutableUser?.email}
                                                            onChange={handleChange}
                                                        />
                                                    </InputField>
                                                    <InputField width='48%'>
                                                        <p>Phone Number</p>
                                                        <input 
                                                            placeholder='Enter Phone Number'
                                                            autoComplete="off"
                                                            type="number"
                                                            required
                                                            id='phone'
                                                            value={mutableUser?.phone}
                                                            onChange={handleChange}
                                                        />
                                                    </InputField>
                                                </InputWrap>
                                            </ProfileBoxWrap>
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Security' ?
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <ProfileBoxWrap
                                                className='!m-0'
                                            >
                                                <Typography 
                                                    text={'Change Password'}
                                                    color='#091525'
                                                    fontWeight={500}
                                                    fontSize='20px'
                                                    lineHeight='22px'
                                                    margin='0 0 2rem 0'
                                                />
                                                <InputWrap>
                                                    <InputField width='48%'>
                                                        <p>Password</p>
                                                        <input 
                                                            placeholder='Enter Password'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            value={passwordObject?.password}
                                                            id='password'
                                                            onChange={handleChange}
                                                        />
                                                    </InputField>
                                                    <InputField width='48%'>
                                                        <p>Confirm Password</p>
                                                        <input 
                                                            placeholder='Confirm password'
                                                            autoComplete="off"
                                                            type="text"
                                                            required
                                                            value={passwordObject?.confirmPassword}
                                                            id='confirmPassword'
                                                            onChange={handleChange}
                                                        />
                                                    </InputField>
                                                </InputWrap>
                                                <Button
                                                    bg='#23211D'
                                                    color='#fff'
                                                    type='submit'
                                                    width='auto'
                                                    top='30px'
                                                    disabled={
                                                        isInitializingRequest 
                                                        || !passwordObject?.password 
                                                        || !passwordObject?.confirmPassword
                                                    }
                                                    onClick={() => {
                                                        if(passwordObject.password === passwordObject.confirmPassword){
                                                            initPasswordChange({
                                                                password: passwordObject?.password
                                                            })
                                                        }else {
                                                            enqueueSnackbar({
                                                                variant: 'error',
                                                                message: 'Sorry, password must match!'
                                                            })
                                                        }
                                                    }}
                                                >
                                                    {isInitializingRequest ? <Spinner /> : "Request Password Change"}
                                                </Button>
                                            </ProfileBoxWrap>
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Login activities' &&
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <ProfileBoxWrap
                                                className='!m-0'
                                            >
                                                <Typography 
                                                    text={'Login Activities'}
                                                    color='#091525'
                                                    fontWeight={500}
                                                    fontSize='20px'
                                                    lineHeight='22px'
                                                    margin='0 0 2rem 0'
                                                />
                                                {
                                                    Array(8).fill(0).map((item, index) => (
                                                        <div 
                                                            className="flex items-center gap-[10px] py-4 border-b"
                                                            key={index}
                                                        >
                                                            <img 
                                                                src="/icons/laptop.png" 
                                                                alt="device"
                                                                className="w-[30px]" 
                                                            />
                                                            <div>
                                                                <h3 className="text-[12px] font-bold">Macbook Pro</h3>
                                                                <p className="text-[10px] text-[#898579]">Lagos, Nigeria • 1 August at 05:02pm</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                
                                            </ProfileBoxWrap>
                                        </DashboardInner>
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

export default DashboardProfile;

const pageItems = ['Profile', 'Security', 'Login activities']