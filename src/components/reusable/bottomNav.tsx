import React, { useState } from 'react';
import { LogoImageWrap, MainWidget, NavItem } from '../../styles/reusable/sidebar';
import * as Icon from 'iconsax-react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { HomeIcon, BuildingOfficeIcon, BookmarkIcon, WalletIcon } from '@heroicons/react/24/outline';
import { RandomCircle } from '../../styles/reusable/index';
import { BottomNav, BottomNavItem } from '../../styles/reusable/bottomnav';


interface SideBarProps {
    closeNav?: any;
    mobileDisplay?: string;
}

const BottomNavComp = ({closeNav, mobileDisplay} : SideBarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname;

    // Routes current and active defining.

    const overviewLinks = ['/dashboard'];
    const overviewActive = overviewLinks.includes(current);
    const propertiesLinks = ['/dashboard/properties'];
    const propertiesActive = propertiesLinks.includes(current);
    const savedLinks = ['/dashboard/saved'];
    const savedActive = savedLinks.includes(current);
    const walletLinks = ['/dashboard/wallet'];
    const walletActive = walletLinks.includes(current);
    const profileLinks = ['/dashboard/profile'];
    const profileActive = profileLinks.includes(current);

    // Log User Out of app

    const redirectAfterLogOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    // Open Option
    const [openOption, setOpenOption] = useState(false);
    const [activeItem, setActiveItem] = useState<number>(-1);

    const handleOpenOption = (index:number) => {
        setOpenOption(!openOption);
        setActiveItem(index)
    }

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
        },
        {
            name: 'Profile',
            icon: null,
            link: '/dashboard/profile',
            activeClass: profileActive,
            action: () => {}
        },
    ]

    return(
        <>
            <BottomNav mobileDisplay={mobileDisplay}>
                {
                    navList.map((item, index) => ( 
                        <NavLink 
                            to={item.link ? item.link : ''} 
                            key={index}
                        >
                            <BottomNavItem
                                className={`nav-class ${item.activeClass ? 'active-bottom-nav' : ''}`}
                            >
                                <div>
                                    {
                                        item.icon ?
                                            <>
                                                {React.createElement(item.icon, {
                                                    className: 'w-5 w-5'
                                                })}
                                            </>
                                        :
                                        <RandomCircle
                                            size={'21px'}
                                        >
                                            <img 
                                                src='/images/avatar2.png'
                                                alt='Avatar'
                                            />
                                        </RandomCircle>
                                    }
                                    <p>{item.name}</p>
                                </div>
                            </BottomNavItem>
                        </NavLink>
                    ))
                }
            </BottomNav>
        </>
    )
}

export default BottomNavComp;