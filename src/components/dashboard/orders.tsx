import React, { useState } from 'react';
import { Line, MainWrap, PageToggleText,} from '../../styles/reusable/index';
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

const Orders = () => {
    
    const [activePage, setActivePage] = useState('All');

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
                                text='Orders (50)'
                                color='#091525'
                                fontWeight={500}
                                fontSize='24px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <div className="flex justify-between items-center">
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
                            <div className="flex items-center gap-[8px]">
                                <p className="text-[14px] text-[#091525] font-medium">Filter by:</p>
                                <input 
                                    type="date" 
                                    className="w-[10rem] py-2 px-3 text-[14px] rounded-[8px] !border !border-[1px] !border-[#E5DFD9]"
                                    style={{
                                        border: "1px solid #E5DFD9"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            {/* Table Header */}
							<div className='flex items-end mt-[2rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
								<p className='flex-[4] text-[14px]'>Order No.</p>
                                <p className='flex-[2] text-[14px]'>Items</p>
								<p className='flex-[3] text-[14px]'>Date</p>
								<p className='flex-[7] text-[14px]'>Customer</p>
                                <p className='flex-[4] text-[14px]'>Amount</p>
								<p className='flex-[2] text-[14px]'>Action</p>
							</div>
                            {members &&
								members.length > 0 &&
								members.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
									>
										<div className='flex flex-[4] items-center cursor-pointer gap-[10px]'>
								
											<div className='w-[90%]'>
												<h3 className='font-regular text-[14px] cursor-pointer'>
													{item.orderNo}
												</h3>
											</div>
										</div>
										<p className='flex-[2] cursor-pointer text-[14px]'>
											{item.items}
										</p>
										<p className='flex-[3] cursor-pointer text-[14px]'>
											{`${new Date().toLocaleDateString()}`}
										</p>
										<p className='flex-[7] cursor-pointer text-[14px]'>
											{item?.customer ? item.customer : 'N/A'}
										</p>
                                        <p className='flex-[4] cursor-pointer font-semibold text-[14px]'>
											{item?.amount ? `₦${commaNumber(item.amount)}` : 'N/A'}
										</p>
										<p className='flex-[2] text-[12px] font-semibold text-[#8B6C23] cursor-pointer flex text-center'>
											View
										</p>
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

export default Orders;

const pageItems = ['All', 'Processing', 'New Requests', 'Completed', 'Cancelled']

export const members = [
	{
        orderNo: "#12093707",
        items: "10",
        date: "",
		customer: "Benjamin Akindeko",
		amount: "15000",
	},
	{
        orderNo: "#12093707",
        items: "4",
        date: "",
		customer: "Daniel Adewale",
		amount: "340000",
	},
	{
        orderNo: "#12093707",
        items: "6",
        date: "",
		customer: "Victor Chukwueke",
		amount: "70000",
	},
    {
        orderNo: "#12093707",
        items: "340",
        date: "",
		customer: "Olanrewaju Oredipe",
		amount: "50000",
	},
    {
        orderNo: "#12093707",
        items: "100",
        date: "",
		customer: "Femi Fatokun",
		amount: "1000000",
	},
    {
        orderNo: "#12093707",
        items: "70",
        date: "",
		customer: "Samuel Adeniyi",
		amount: "10000",
	},
];
