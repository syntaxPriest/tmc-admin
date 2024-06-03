import React, { useState } from 'react';
import { LogoImageWrap, LogoImage, MainWidget, NavHeader, NavOption, NavItem, CloseBtn } from '../../styles/reusable/sidebar';
import * as Icon from 'iconsax-react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import * as FeatherIcon from 'react-feather';
import { HomeIcon, BuildingOfficeIcon, BookmarkIcon, WalletIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { BoxFlex } from '../../styles/reusable/index';
import { RandomCircle } from '../../styles/reusable/index';
import Typography from './typography';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import AskYesOrNo from '../dashboard/modals/askYesOrNo';
import { removeAfterLogout } from '../../api/instance';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user/reducer';
import { clearState } from '../../store/properties/reducer';
import { useCookies } from 'react-cookie';

interface SideBarProps {
    closeNav?: any;
    mobileDisplay?: string;
}

const SideBarWidget = ({closeNav, mobileDisplay} : SideBarProps) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const cookieUtils = useCookies(["userToken"]);
    const current = location.pathname;
    const currentUser = useCurrentUser().user;
    const [askLogout, setAskLogout] = useState(false)

    // Routes current and active defining.

    const overviewLinks = ['/dashboard'];
    const overviewActive = overviewLinks.includes(current);
    const membersLinks = ['/dashboard/members'];
    const membersActive = membersLinks.includes(current);
    const eventsLinks = ['/dashboard/events'];
    const eventsActive = eventsLinks.includes(current);
    const bookingsLinks = ['/dashboard/bookings'];
    const bookingsActive = bookingsLinks.includes(current);
    const ordersLinks = ['/dashboard/orders'];
    const ordersActive = ordersLinks.includes(current);
    const inventoryLinks = ['/dashboard/inventories'];
    const inventoryActive = inventoryLinks.includes(current);
    const transactionsLinks = ['/dashboard/transactions'];
    const transactionsActive = transactionsLinks.includes(current);
    const messagingLinks = ['/dashboard/messaging'];
    const messagingActive = messagingLinks.includes(current);
    const adminsLinks = ['/dashboard/admins'];
    const adminsActive = adminsLinks.includes(current);
    const settingsLinks = ['/dashboard/settings'];
    const settingsActive = settingsLinks.includes(current);

    // Log User Out of app

    const redirectAfterLogOut = () => {
        localStorage.clear();
        removeAfterLogout();
        window.location.href = '/login';
        dispatch(setUser(null));
        dispatch(clearState());
        removeAfterLogout()
        cookieUtils[2]("userToken");
        localStorage.clear();
        const origin = window.location.origin;
        window.location.assign(`${origin}/login`);
    }

    // Open Option
    // const [openOption, setOpenOption] = useState(false);
    // const [activeItem, setActiveItem] = useState<number>(-1);

    // const handleOpenOption = (index:number) => {
    //     setOpenOption(!openOption);
    //     setActiveItem(index)
    // }

    const navList = [
        {
            name: 'Dashboard',
            icon: HomeIcon,
            link: '/dashboard',
            activeClass: overviewActive,
            action: () => {}
        },
        {
            name: 'Members',
            icon: Icon.People,
            link: '/dashboard/members',
            activeClass: membersActive,
            action: () => {}
        },
        {
            name: 'Events',
            icon: Icon.Calendar,
            link: '/dashboard/events',
            activeClass: eventsActive,
            action: () => {}
        },
        {
            name: 'Bookings',
            icon: Icon.NoteText,
            link: '/dashboard/bookings',
            activeClass: bookingsActive,
            action: () => {}
        },
        {
            name: 'Orders',
            icon: Icon.Bag2,
            link: '/dashboard/orders',
            activeClass: ordersActive,
            action: () => {}
        },
        {
            name: 'Inventory',
            icon: Icon.Bill,
            link: '/dashboard/inventories',
            activeClass: inventoryActive,
            action: () => {}
        },
        {
            name: 'Transactions',
            icon: Icon.Wallet2,
            link: '/dashboard/transactions',
            activeClass: transactionsActive,
            action: () => {}
        },
        {
            name: 'Messaging',
            icon: Icon.Messages1,
            link: '/dashboard/messaging',
            activeClass: messagingActive,
            action: () => {}
        },
        {
            name: 'Admins',
            icon: Icon.Profile2User,
            link: '/dashboard/admins',
            activeClass: adminsActive,
            action: () => {}
        }    
    ]

    return(
        <>
            <MainWidget mobileDisplay={mobileDisplay}>
                <CloseBtn>
                    <FeatherIcon.X onClick={() => closeNav()} />
                </CloseBtn>
                <NavLink to='/'>
                    <LogoImageWrap>
                        <LogoImage 
                            width='6rem'
                            src='/tmc.svg'
                            alt='TMC'
                        />
                    </LogoImageWrap>
                </NavLink>
                {
                    navList.map((item, index) => ( 
                        <NavLink 
                            to={item.link ? item.link : ''} 
                            key={index}
                        >
                            <NavItem
                                className={`nav-class ${item.activeClass ? 'active-nav' : ''}`}
                            >
                                <div>
                                    {React.createElement(item.icon, {
                                        className: 'w-5 w-5'
                                    })}
                                    <p>{item.name}</p>
                                </div>
                            </NavItem>
                        </NavLink>
                    ))
                }
                <div className="mt-7">
                    <NavLink
                        to={"/dashboard/settings"}
                    >
                        <NavItem
                            className={`nav-class ${settingsActive ? 'active-nav' : ''}`}
                        >
                            <div>
                                <Icon.Setting2 
                                    className='w-5 h-5'
                                />
                                <p>Settings</p>
                            </div>
                        </NavItem>
                    </NavLink>
                    <NavItem
                        className={`nav-class`}
                        onClick={() => setAskLogout(true)}
                    >
                        <div>
                            <Icon.LogoutCurve 
                                className='w-5 h-5'
                                color='#c82b32'
                            />
                            <p className='text-[#c82b32]'>Logout</p>
                        </div>
                    </NavItem>
                </div>
                <NavLink to='/dashboard/profile'>
                    <BoxFlex
                        gap='8px'
                        margin='3rem 0 0 0'
                    >
                        <RandomCircle
                            size={'40px'}
                        >
                            <img 
                                src={currentUser?.avatar ? currentUser?.avatar : '/images/Avatar1.png'}
                                alt='Avatar'
                            />
                        </RandomCircle>
                        <div>
                            <Typography 
                                // text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                                text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                                color='#091525'
                                fontWeight={500}
                                fontSize='14px'
                                lineHeight='21px'
                            />
                            <Typography 
                                // text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                                text={`${currentUser?.email}`}
                                color='#091525'
                                fontWeight={300}
                                fontSize='12px'
                                lineHeight='21px'
                            />
                        </div>
                    </BoxFlex>
                </NavLink>
            </MainWidget>
            <AskYesOrNo 
                openToggle={askLogout}
                headerText='Log Out'
                question='Are you sure you want to log out of your account?'
                declineText="Cancel"
                actionText="Log Out"
                yesAction={() => redirectAfterLogOut()}
                noAction={() => setAskLogout(false)}
            />
        </>
    )
}

export default SideBarWidget;