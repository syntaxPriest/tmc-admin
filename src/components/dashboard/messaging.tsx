import React, { useState } from 'react';
import { BoxFlex, Line, MainWrap, PageToggleText, RandomCircle,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardMain, RecentSection, SearchInput } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import PropertyMilestone from '../reusable/propertyMilestone';
import { PageToggleHeader } from '../../styles/reusable/index';
import { Link } from 'react-router-dom';
import BottomNavComp from '../reusable/bottomNav';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PaginationComp from '../reusable/pagination';
import { LeftCont } from '../../styles/reusable/header';
import { Button } from '../../styles/reusable';
import * as Icon from 'iconsax-react';
import commaNumber from 'comma-number';
import SelectMessageChannel from './modals/selectMessageChannel';

const Messaging = () => {
    
    const [activePage, setActivePage] = useState('All');
    const [showSelectModal, setShowSelectModal] = useState(false);

    return(
        <>
            <SelectMessageChannel 
                closeFunc={() => setShowSelectModal(false)}
                openToggle={showSelectModal}
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
                                text='Messaging (50)'
                                color='#091525'
                                fontWeight={500}
                                fontSize='24px'
                                lineHeight='17.6px'
                            />
                            <div className="flex gap-[10px] items-center justify-end">
                                <Button 
                                    color='#fff'
                                    bg='#23211D'
                                    top="0"
                                    onClick={() => setShowSelectModal(true)}
                                >Create New</Button>
                            </div>
                        </DashboardHeader>
                        <div className="mt-5">
                            {members &&
								members.length > 0 &&
								members.map((item: any, index: number) => (
									<div
										className='w-full flex justify-between gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
									>
										<div className='w-[90%] flex flex-col cursor-pointer gap-[10px]'>
											<div className='w-[100%] flex gap-[10px]'>
												<p className='cursor-pointer font-black text-[16px] max-w-[80%]'>
                                                    {item.name}
												</p>
                                                <div className="flex gap-[8px]">
                                                    <p className="border border-[#d0d5dd] shadow-[0px_1px_2px_0px_#1018280D] py-[4px] px-[10px] rounded-[6px] text-center w-auto text-[10px]">
                                                        SMS
                                                    </p>
                                                    <p className="border border-[#d0d5dd] shadow-[0px_1px_2px_0px_#1018280D] py-[4px] px-[10px] rounded-[6px] text-center w-auto text-[10px]">
                                                        Email
                                                    </p>
                                                    <p className="border border-[#d0d5dd] shadow-[0px_1px_2px_0px_#1018280D] py-[4px] px-[10px] rounded-[6px] text-center w-auto text-[10px]">
                                                        In-App Notification
                                                    </p>
                                                </div>
											</div>
                                            <p className='text-[14px] ellipse font-[300]'>Dear Esteemed Member, On behalf of The Metropolitan Club, Lagos, I extend a warm and heartfelt welcome to you. It is with great pleasure that I welcome you to our distinguished community, where elegance, </p>
                                            <p className='text-[12px] text-[#898579] font-[400]'>121 Recipients • Just Now</p>
										</div>
                                        <BoxFlex
                                            width='auto'
                                        >
                                            <RandomCircle
                                                bg='#FDF0F0'
                                                size='32px'
                                            >
                                                <Icon.Trash size={16} color='#D23B3B' />
                                            </RandomCircle>
                                            <RandomCircle
                                                bg='#F9F4F0'
                                                size='32px'
                                            >
                                                <Icon.Edit size={16} color='#8B6C23' />
                                            </RandomCircle>
                                        </BoxFlex>
									</div>
								))}
                                <PaginationComp />
                        </div>
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default Messaging;

const pageItems = ['All', 'Debit', 'Credit',]

export const members = [
	{
        name: "Tuesday Lunch Is Back!",
        email: "olanrewaju@gmail.com",
        phoneNo: "+2349083827923",
        adminType: "Admin",
	},
    {
        name: "Tuesday Lunch Is Back!",
        email: "olanrewaju@gmail.com",
        phoneNo: "+2349083827923",
        adminType: "Admin",
	},
];
