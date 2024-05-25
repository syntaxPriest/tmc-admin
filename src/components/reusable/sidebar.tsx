import React, { useState } from 'react';
import { LogoImageWrap, LogoImage, MainWidget, NavHeader, NavOption, NavItem, CloseBtn } from '../../styles/reusable/sidebar';
import * as Icon from 'iconsax-react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import * as FeatherIcon from 'react-feather';
import { HomeIcon, BuildingOfficeIcon, BookmarkIcon, WalletIcon } from '@heroicons/react/24/outline';
import { BoxFlex } from '../../styles/reusable/index';
import { RandomCircle } from '../../styles/reusable/index';
import Typography from './typography';
import { useCurrentUser } from '../../store/user/useCurrentUser';

interface SideBarProps {
    closeNav?: any;
    mobileDisplay?: string;
}

const SideBarWidget = ({closeNav, mobileDisplay} : SideBarProps) => {
    // const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;
    const currentUser = useCurrentUser().user;

    // Routes current and active defining.

    const overviewLinks = ['/dashboard'];
    const overviewActive = overviewLinks.includes(current);
    const propertiesLinks = ['/dashboard/properties'];
    const propertiesActive = propertiesLinks.includes(current);
    const savedLinks = ['/dashboard/saved'];
    const savedActive = savedLinks.includes(current);
    const walletLinks = ['/dashboard/wallet'];
    const walletActive = walletLinks.includes(current);

    // Log User Out of app

    // const redirectAfterLogOut = () => {
    //     localStorage.clear();
    //     navigate('/login');
    // }

    // Open Option
    // const [openOption, setOpenOption] = useState(false);
    // const [activeItem, setActiveItem] = useState<number>(-1);

    // const handleOpenOption = (index:number) => {
    //     setOpenOption(!openOption);
    //     setActiveItem(index)
    // }

    const navList = [
        {
            name: 'Home',
            icon: HomeIcon,
            link: '/dashboard',
            activeClass: overviewActive,
            action: () => {}
        },
        {
            name: 'Property',
            icon: BuildingOfficeIcon,
            link: '/dashboard/properties',
            activeClass: propertiesActive,
            action: () => {}
        },
        {
            name: 'Saved',
            icon: BookmarkIcon,
            link: '/dashboard/saved',
            activeClass: savedActive,
            action: () => {}
        },
        {
            name: 'Wallet',
            icon: WalletIcon,
            link: '/dashboard/wallet',
            activeClass: walletActive,
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
                            src='/c-logo.png'
                            alt='Contribuild'
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
                <NavLink to='/dashboard/profile'>
                    <BoxFlex
                        gap='8px'
                        margin='3rem 0 0 0'
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
                        
                    </BoxFlex>
                </NavLink>
            </MainWidget>
        </>
    )
}

export default SideBarWidget;