import React, { useState, type Dispatch, SetStateAction } from 'react';
import { AccountPopUp, CenterLogo, LeftCont, MainHeaderCont, MobileMenuController, RightCont } from '../../styles/reusable/header';
import * as Icon from 'iconsax-react';
import SideBarWidget from './sidebar';
import { ButtonFlex, Line, RandomCircle, BoxFlex } from '../../styles/reusable/index';
import { Button } from '../../styles/reusable';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { SortRounded } from '@mui/icons-material';
import { useCookies } from 'react-cookie';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import Typography from './typography';
import { ArrowTopRightOnSquareIcon, ChevronDownIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { FilterPopupCard } from '../../styles/reusable/filter';
import { useDispatch } from 'react-redux';
import { QuickItem } from '../dashboard/style';
import { setUser } from '../../store/user/reducer';
import { clearState } from '../../store/properties/reducer';
import { removeAfterLogout} from '../../api/instance';

interface HeaderProps {
    isSearchPage?: boolean;
    isLanding?: boolean;
    searchQuery?: string;
    setSearchQuery?: Dispatch<SetStateAction<string>>
}

const Header = ({isSearchPage, isLanding, searchQuery, setSearchQuery} : HeaderProps) => {
    const [cookie] = useCookies(["userToken"]);
    const dispatch = useDispatch();
    const cookieUtils = useCookies();
    const currentUser = useCurrentUser().user;
    const navigate = useNavigate();
    const [openNav, setOpenNav] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const isAuthenticated = cookie.userToken;

    // Open and Close Nav Bar
    const toggleNavBar = () => {
        setOpenNav(!openNav);
    }

    const logoutUser = async () => {
        await cookieUtils[2]('userToken');
        dispatch(setUser(null));
        dispatch(clearState());
        removeAfterLogout();
        window.location.href = '/login';
    };

    return(
        <>
            <MainHeaderCont 
                onClick={() => setShowAccountMenu(false)}
            >
                <MobileMenuController>
                    {

                        isLanding ?
                            <Link to='/'>
                                <img
                                    src='/c-logo.png'
                                    alt='Contribuild'
                                    className="w-[6rem]"
                                />
                            </Link>
                            :
                            <i>
                                <SortRounded 
                                    onClick={() => toggleNavBar()}
                                />
                            </i>
                    }
                    
                </MobileMenuController>
                <LeftCont
                    mobileDisplay={false}
                >
                    <div>
                        {
                            !isSearchPage && 
                                <Link to='/search'>
                                    <RandomCircle
                                        size={'40px'}
                                    >
                                        <i>
                                            <Icon.SearchNormal1 size={18} />
                                        </i>
                                    </RandomCircle>
                                </Link>
                        }
                        { 
                            isSearchPage &&
                                <>
                                    <i>
                                        <Icon.SearchNormal1 size={18} />
                                    </i>
                                    <i>
                                        <Icon.ArrowCircleRight2 size={28} variant='Bold' color='var(--secondary-color)' />
                                    </i>
                                    <input 
                                        placeholder='Search'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                                    />
                                </>
                        }
                    </div>
                </LeftCont>
                <Link to='/'>
                    <CenterLogo 
                        src='/c-logo.png'
                        alt='Contribuild'
                    />
                </Link>
                <RightCont>
                    {
                        isAuthenticated && isAuthenticated !== 'undefined' && isAuthenticated !== null ?
                            <>
                                <BoxFlex
                                    gap='8px'
                                    hAlign='flex-end'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAccountMenu(!showAccountMenu);
                                    }}
                                    className='cursor-pointer'
                                >
                                    <RandomCircle
                                        size={'32px'}
                                    >
                                        <img 
                                            src='/images/dummy-user.png'
                                            alt='Avatar'
                                        />
                                    </RandomCircle>
                                    <Typography 
                                        text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                                        color='#091525'
                                        fontWeight={500}
                                        fontSize='14px'
                                        lineHeight='21px'
                                    />
                                    <i>
                                        <ChevronDownIcon className='w-5 h-5 cursor-pointer' color='#8796AD' />
                                    </i>
                                    {
                                        showAccountMenu && 
                                            <AccountPopUp>
                                                <FilterPopupCard>
                                                    <QuickItem
                                                        onClick={() => navigate('/dashboard')}
                                                    >
                                                        <div>
                                                            <p style={{color: '#7081A0'}}>Go to dashboard</p>
                                                            <ArrowTopRightOnSquareIcon
                                                                className='w-5'
                                                                color='#7081A0'
                                                            />
                                                        </div>
                                                    </QuickItem>
                                                    <QuickItem
                                                        onClick={() => logoutUser()}
                                                    >
                                                        <div>
                                                            <p style={{color: '#7081A0'}}>Logout</p>
                                                            <ArrowLeftOnRectangleIcon
                                                                className='w-5'
                                                                color='#7081A0'
                                                            />
                                                        </div>
                                                    </QuickItem>
                                                </FilterPopupCard>
                                            </AccountPopUp>
                                    }
                                </BoxFlex>
                            </>
                            :
                            <ButtonFlex>
                                <Link to='/login'>
                                    <Button
                                        bg='#fff'
                                        color='var(--secondary-color)'
                                        type='button'
                                        width='auto'
                                        top='0'
                                    >
                                        Log In
                                    </Button>
                                </Link>
                                <Link to='/sign-up'>
                                    <Button
                                        bg='var(--primary-color)'
                                        color='#fff'
                                        type='button'
                                        width='auto'
                                        top='0'
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </ButtonFlex>
                    }
                </RightCont>
            </MainHeaderCont>

            {
                openNav ? 
                    <SideBarWidget closeNav={toggleNavBar} />
                : null
            }
        </>
    )
}

export default Header;
