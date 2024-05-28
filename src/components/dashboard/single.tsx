import React, { useState } from 'react';
import { BoxFlex, Line, MainWrap, PageListItem, PageListItemWrap, PageToggleText, StatusCard,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardInner, DashboardMain, ProjectProgressFlex, ProjectProgressWrap, RecentSection, Numbering, VerticalAlign, ProjectProgressImgFlex } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import PropertyMilestone from '../reusable/propertyMilestone';
import { PageToggleHeader, IconFlex, ButtonFlex } from '../../styles/reusable/index';
import { AuthBacknav } from '../../styles/authentication';
import * as Icon from 'react-feather';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { BedRounded, BathtubRounded } from '@mui/icons-material';
import { Button } from '../../styles/reusable';
import { ArrowTopRightOnSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ProgressBar } from './style';
import { useNavigate } from 'react-router-dom';
import TransactionCard from './TransactionCard';
import TransactionDetailsModal from './transactionDetails';
import ContributionPlan from './modals/contributionOptions';
import SendMoney from './modals/sendMoney';
import Success from './modals/success';
import GalleryDisplay from './modals/gallery';
import { InfoCircle } from 'iconsax-react';
import { handleBg, handleColor } from '../../utils/colorHandle';

const DashboardSingleProperty = () => {
    
    const navigate = useNavigate();
    const [showGallery, setShowGallery] = useState(false);
    const [activePage, setActivePage] = useState('Overview');
    const [showdetails, setShowDetails] = useState(false);

    const totalSteps = 3;
    const [startContributionStep, setStartContributionStep] = useState(false);
    const [currentContributionStep, setCurrentConributionStep] = useState(1);
    const [paymentOption, setPaymentOption] = useState<string>('')

    const nextStep = () => {
        if (currentContributionStep < totalSteps){
            setCurrentConributionStep((prev:number) => ++prev);
        }else if (currentContributionStep === totalSteps){
            setStartContributionStep(false);
            setCurrentConributionStep(1);
        }
    }

    const prevStep = () => {
        if (currentContributionStep > 1){
            setCurrentConributionStep((prev:number) => --prev);
        }
    }

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
                        <DashboardHeader
                            padding='20px 24px'
                        >
                            <AuthBacknav
                                onClick={() => navigate(-1)}
                            >
                                <Icon.ArrowLeft 
                                    color='#8796AD' 
                                    size={20}
                                />
                                <p>Back</p>
                            </AuthBacknav>
                        </DashboardHeader>
                        <DashboardInner>
                            <Typography 
                                text='15 units of Newly Built 4 bedroom Semi-detached Duplex with BQ'
                                color='#091525'
                                fontWeight={700}
                                fontSize='24px'
                                lineHeight='26.4px'
                                align='center'
                                margin='1rem 0 0.4rem 0'
                            />
                            <IconFlex
                                hAlign='center'
                                vAlign='flex-start'
                            >
                                <MapPinIcon className='w-6 h-6' />
                                <Typography 
                                    text='VGC, Eti-Osa 106104, Lekki, Lagos • Property Code: 92482230'
                                    color='#091525'
                                    fontWeight={400}
                                    fontSize='14px'
                                    lineHeight='21px'
                                    align='center'
                                />
                            </IconFlex>
                            <BoxFlex
                                hAlign='center'
                                gap='16px'
                                color='#7081A0'
                                margin='12px 0 0 0'
                            >
                                <IconFlex
                                    color='#7081A0'
                                >
                                    <BedRounded style={{fill: '#7081A0'}} />
                                    <Typography 
                                        text='4 Beds'
                                        color='#7081A0'
                                        fontWeight={400}
                                        fontSize='14px'
                                        lineHeight='21px'
                                        align='center'
                                    />
                                </IconFlex>
                                <IconFlex>
                                    <BathtubRounded style={{fill: '#7081A0'}} />
                                    <Typography 
                                        text='3 Baths'
                                        color='#7081A0'
                                        fontWeight={400}
                                        fontSize='14px'
                                        lineHeight='21px'
                                        align='center'
                                    />
                                </IconFlex>
                            </BoxFlex>
                            <ButtonFlex
                                hAlign='center'
                                margin='12px 0 0 0'
                                mobileDirection='column'
                            >
                                <Button
                                    bg='var(--primary-color)'
                                    color='#fff'
                                    type='button'
                                    width='auto'
                                    top='0'
                                    onClick={() => setStartContributionStep(true)
                                    }
                                >

                                    <PlusIcon className='w-4 h-4' />
                                    Make Contribution
                                </Button>
                                <Button
                                    bg='#fff'
                                    color='var(--primary-color)'
                                    type='button'
                                    width='auto'
                                    top='0'
                                    border='1px solid var(--primary-color)'
                                >
                                    Visit on Website
                                    <ArrowTopRightOnSquareIcon className='w-4 h-4' />
                                </Button>
                            </ButtonFlex>
                            <BoxFlex
                                hAlign='space-between'
                                margin='2rem 0 0.3rem 0'
                            >
                                <Typography 
                                    text='₦250,000/₦1,500,000 paid'
                                    color='#1B2229'
                                    fontWeight={700}
                                    fontSize='18px'
                                    lineHeight='14px'
                                />
                            </BoxFlex>
                            <ProgressBar>
                                <progress value={21} max={100}></progress>
                            </ProgressBar>
                            <BoxFlex
                                hAlign='space-between'
                                margin='0.3rem 0 0 0'
                            >
                                <Typography 
                                    text='Contribution Progress'
                                    color='#7081A0'
                                    fontWeight={500}
                                    fontSize='14px'
                                    lineHeight='14px'
                                />
                                <Typography 
                                    text={`${'21'}% Complete`}
                                    color='#1B2229'
                                    fontWeight={500}
                                    fontSize='14px'
                                    lineHeight='14px'
                                />
                            </BoxFlex>
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
                                activePage === 'Overview' ?
                                    <>
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                        >
                                            <PageListItemWrap>
                                                <PageListItem width="50%">
                                                    <p>Contribution Plan</p>
                                                    <h3>Plan A</h3>
                                                </PageListItem>
                                                <PageListItem width="50%">
                                                    <p>Total Equity Contribution</p>
                                                    <BoxFlex vAlign="center" hAlign="space-between" >
                                                        <h3>₦1,500,000</h3>
                                                        <InfoCircle size={20} color='#7081A0' className='mt-3' />
                                                    </BoxFlex>
                                                </PageListItem>
                                            </PageListItemWrap>
                                            <PageListItemWrap>
                                                <PageListItem width="50%">
                                                    <p>Next Payment</p>
                                                    <h3>₦250,000 • Due in 30 days</h3>
                                                </PageListItem>
                                                <PageListItem width="50%">
                                                    <p>Outstanding Payment</p>
                                                    <h3>₦1,120,000</h3>
                                                </PageListItem>
                                            </PageListItemWrap>
                                            <PageListItemWrap>
                                                <PageListItem width='50%'>
                                                    <p>Frequency</p>
                                                    <h3>Monthly</h3>
                                                </PageListItem>
                                                <PageListItem width='50%'>
                                                    <p>Duration</p>
                                                    <h3>6 Months</h3>
                                                </PageListItem>
                                            </PageListItemWrap>
                                            <PageListItemWrap>
                                                <PageListItem width='50%'>
                                                    <p>Start Date</p>
                                                    <h3>20  Jun, 2023</h3>
                                                </PageListItem>
                                                <PageListItem width='50%'>
                                                    <p>End Date</p>
                                                    <h3>13 Jan, 2024</h3>
                                                </PageListItem>
                                            </PageListItemWrap>
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                            {
                                activePage === 'Project Progress' && 
                                    <DashboardInner>
                                        <ProjectProgressWrap>
                                            <>
                                                {
                                                    progress && progress.map((item, index) => (
                                                        <ProjectProgressFlex
                                                            key={index}
                                                        >
                                                            <div className='w-[auto] h-[auto] flex flex-col items-center'>
                                                                <Numbering>{progress.length - index}</Numbering>
                                                                {
                                                                    index + 1 !== progress.length &&
                                                                        <VerticalAlign></VerticalAlign>
                                                                }
                                                            </div>
                                                            <div className="w-[70%] pt-1 pb-[10px]">
                                                                <Typography 
                                                                    text={item.name}
                                                                    color='#091525'
                                                                    fontWeight={500}
                                                                    fontSize='14px'
                                                                    lineHeight='19px'
                                                                />
                                                                <Typography 
                                                                    text={item.date}
                                                                    color='#7081A0'
                                                                    fontWeight={500}
                                                                    fontSize='12px'
                                                                    lineHeight='14px'
                                                                    margin='7px 0 0 0'
                                                                />
                                                                {/* Image Flex */}
                                                                    {
                                                                        item.images && item.images.length > 0 &&
                                                                            <ProjectProgressImgFlex>
                                                                                {
                                                                                    item.images.map((item, index) => (
                                                                                        <img 
                                                                                            key={index}
                                                                                            src={item}
                                                                                            alt='Projects'
                                                                                            onClick={() => setShowGallery(true)}
                                                                                        />
                                                                                    ))
                                                                                }
                                                                            </ProjectProgressImgFlex>
                                                                    }
                                                            </div>
                                                            <StatusCard
                                                                bg={handleBg(item.status)}
                                                                color={handleColor(item.status)}
                                                            >
                                                                {item.status}
                                                            </StatusCard>
                                                        </ProjectProgressFlex>
                                                    ))
                                                }
                                            </>
                                        </ProjectProgressWrap>
                                    </DashboardInner>
                            }
                            {
                                activePage === 'Payment History' ?
                                    <DashboardInner>
                                        <TransactionCard 
                                            openDetails={() => setShowDetails(true)}
                                        />
                                        <TransactionCard 
                                            openDetails={() => setShowDetails(true)}
                                        />
                                    </DashboardInner>
                                    : null
                            }
                        <Line />
                    </DashboardMain>
                </DashboardFlex>
            </MainWrap>
            {
                showdetails ?
                    <TransactionDetailsModal
                        closeFunc={() => setShowDetails(false)}
                    />
                    : null
            }
            {
                showGallery &&
                    <GalleryDisplay 
                        closeFunc={() => setShowGallery(false)}
                    />
            }
            {
                (startContributionStep && currentContributionStep === 1) &&
                    <ContributionPlan 
                        closeFunc={() => setStartContributionStep(false)}
                        action={() => nextStep()}
                        setPaymentOption={setPaymentOption}
                    />
            }
            {
                (startContributionStep && currentContributionStep === 2) &&
                    <SendMoney 
                        closeFunc={() => {
                            setStartContributionStep(false);
                            setCurrentConributionStep(1);
                        }}
                        action={() => nextStep()}
                        paymentOption={paymentOption}
                    />
            }
            {
                (startContributionStep && currentContributionStep === 3) &&
                    <Success
                        closeFunc={() => {
                            setStartContributionStep(false);
                            setCurrentConributionStep(1);
                        }}
                        action={() => nextStep()}
                    />
            }
        </>
    )
}

export default DashboardSingleProperty;

const pageItems = ['Overview', 'Project Progress', 'Payment History']

const progress = [
    {
        name: "Infrastructure",
        date: 'September 2023',
        status: 'Pending',
        images: []
    },

    {
        name: "Wall partitioning, Mechanical & Electrical installations, and Internal Finishing",
        date: 'August 2023',
        status: 'Pending',
        images: []
    },
    {
        name: "Roof structure and covering",
        date: 'July 2023',
        status: 'On-going',
        images: []
    },
    {
        name: "Upper floors, Staircase and Frame structure",
        date: 'July 2023',
        status: 'Pending',
        images: ['/images/e-house2.png', '/images/e-house.png', '/images/house1.png']
    },
    {
        name: "Substructure",
        date: 'September, 2023',
        status: 'Completed',
        images: ['/images/e-house2.png', '/images/e-house.png', '/images/house1.png']
    },
]