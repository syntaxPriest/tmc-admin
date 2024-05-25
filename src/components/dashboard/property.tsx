import React, { useState } from 'react';
import { Line, MainWrap, PageToggleText,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardMain, RecentSection } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import PropertyMilestone from '../reusable/propertyMilestone';
import { PageToggleHeader } from '../../styles/reusable/index';
import { Link } from 'react-router-dom';
import BottomNavComp from '../reusable/bottomNav';

const DashboardProperty = () => {
    
    const [activePage, setActivePage] = useState('Active');

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
                                text='Properties'
                                color='#091525'
                                fontWeight={500}
                                fontSize='16px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <PageToggleHeader>
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
                        <RecentSection>
                            {
                                activePage === 'Active' ?
                                    <Link to={`/dashboard/property/${'Property name'}`}>
                                        <PropertyMilestone 
                                            img='/images/house2.png'
                                        />
                                    </Link>
                                    : null
                            }
                            {
                                activePage === 'Completed' ?
                                    <PropertyMilestone 
                                        img='/images/e-house1.png'
                                        progress={100}
                                    />
                                    : null
                            }
                        </RecentSection>
                        <Line />
                    </DashboardMain>
                    <QuickActionWidget />
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default DashboardProperty;

const pageItems = ['Active', 'Completed']