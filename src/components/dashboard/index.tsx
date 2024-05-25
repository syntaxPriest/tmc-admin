import React, { useState } from 'react';
import { Line, MainWrap,} from '../../styles/reusable/index';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import SideBarWidget from '../reusable/sidebar';
import { CardGrid, DashboardCard, DashboardFlex, DashboardHeader, DashboardMain, RecentSection } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import CopiedNotifier from '../reusable/clipboard';
import { copyText } from '../../utils/copyText';
import PropertyMilestone from '../reusable/propertyMilestone';
import BottomNavComp from '../reusable/bottomNav';

const DashboardIndex = () => {

    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const wallet = useCurrentUser()?.wallet;

    return(
        <>
            {
                copied ?
                    <CopiedNotifier />
                    : null
            }
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
                                text='Home'
                                color='#091525'
                                fontWeight={500}
                                fontSize='16px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <CardGrid>
                            <DashboardCard>
                                <h3>Properties</h3>
                                <p>0</p>
                            </DashboardCard>
                            <DashboardCard>
                                <h3>Saved</h3>
                                <p>0</p>
                            </DashboardCard>
                            <DashboardCard
                                bg='var(--primary-color)'
                                color='#fff'
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Typography 
                                        text={wallet?.account_number}
                                        color='#fff'
                                        fontWeight={500}
                                        fontSize='15px'
                                        lineHeight='21px'
                                    />
                                    <i>
                                        <DocumentDuplicateIcon 
                                            className='w-5 h-5' 
                                            color='#fff' 
                                            onClick={() => copyText({setCopied, text: wallet?.account_number})}
                                        />
                                    </i>
                                </div>
                                <div>
                                    <Typography 
                                        text={wallet?.account_name}
                                        color='#fff'
                                        fontWeight={500}
                                        fontSize='12px'
                                        lineHeight='16.8px'
                                        margin='0.5rem 0 0 0'
                                    />
                                    <Typography 
                                        text={wallet?.bank_name}
                                        color='#fff'
                                        fontWeight={500}
                                        fontSize='12px'
                                        lineHeight='16.8px'
                                        margin='0.5rem 0 0 0'
                                    />
                                </div>
                            </DashboardCard>
                        </CardGrid>
                        <RecentSection>
                            <Typography 
                                text='Recent Contribution'
                                color='#091525'
                                fontWeight={600}
                                fontSize='16px'
                                lineHeight='19.8px'
                                margin='0.5rem 0 0 0'
                            />
                            <PropertyMilestone 
                                img='/images/house2.png'
                            />
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

export default DashboardIndex;