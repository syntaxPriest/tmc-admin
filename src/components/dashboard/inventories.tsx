import React, { useState } from 'react';
import { Line, MainWrap, PageToggleText,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardMain, RecentSection, SearchInput } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import PropertyMilestone from '../reusable/propertyMilestone';
import { PageToggleHeader } from '../../styles/reusable/index';
import { Link, useNavigate } from 'react-router-dom';
import BottomNavComp from '../reusable/bottomNav';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import PaginationComp from '../reusable/pagination';
import { LeftCont } from '../../styles/reusable/header';
import { Button } from '../../styles/reusable';
import * as Icon from 'iconsax-react';
import commaNumber from 'comma-number';
import AddInventoryItem from './modals/addInventoryItem';

const Inventories = () => {
    
    const navigate = useNavigate();
    const [openAddItem, setOpenAddItem] = useState(false);
    const [activePage, setActivePage] = useState('All');

    return(
        <>
            <AddInventoryItem 
                openToggle={openAddItem}
                closeFunc={() => setOpenAddItem(false)}
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
                                text='Inventory (50)'
                                color='#091525'
                                fontWeight={500}
                                fontSize='24px'
                                lineHeight='17.6px'
                            />
                            <div className="flex gap-[10px] items-center justify-end">
                                <SearchInput>
                                    <i>
                                        <Icon.SearchNormal1 size={18} />
                                    </i>
                                    <input 
                                        placeholder='Search'
                                    />
                                </SearchInput>
                                <Button 
                                    color='#fff'
                                    bg='#23211D'
                                    top="0"
                                    onClick={() => setOpenAddItem(true)}
                                >Add Item</Button>
                            </div>
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
                                <select 
                                    className="w-[10rem] py-2 px-1 text-[14px] rounded-[8px] !border !border-[1px] !border-[#E5DFD9]"
                                    style={{
                                        border: "1px solid #E5DFD9"
                                    }}
                                >
                                    <option value="booking_type">booking type</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-5">
                            {/* Table Header */}
							<div className='flex items-center mt-[2rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
                                <div className='flex-[1]'>
                                    <input 
                                        type="checkbox"
                                        className='w-[20px] h-[20px] border border-[red] bg-[blue]'
                                    />
                                </div>
                                <p className='flex-[7] text-[14px]'>Item</p>
                                <p className='flex-[2] text-[14px]'>SKU</p>
								<p className='flex-[3] text-[14px]'>Category</p>
								<p className='flex-[2] text-[14px]'>Qty</p>
                                <p className='flex-[2] text-[14px]'>Sold</p>
								<p className='flex-[3] text-[14px]'>Price</p>
                                <p className='flex-[3] text-[14px]'>Status</p>
							</div>
                            {members &&
								members.length > 0 &&
								members.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
                                        onClick={() => navigate(`/dashboard/inventory/${index + 1}`)}
									>
                                        <div className='flex-[1]'>
                                            <input 
                                                type="checkbox"
                                                className='w-[20px] h-[20px] border border-[red] flex-start'
                                            />
                                        </div>
										<div className='flex flex-[7] items-center cursor-pointer gap-[10px]'>
                                            <img
												src='/images/food1.png'
                                                className="w-[35px] h-[35px]"
												alt='user'
											/>
											<div className='w-[90%]'>
												<h3 className='font-medium text-[14px] ellipse cursor-pointer'>
													{item.name}
												</h3>
												<p className='font-light cursor-pointer ellipse text-[12px] text-[#70897B]'>
													{item.description ? item.description : "N/A"}
												</p>
											</div>
										</div>
										<p className='flex-[2] cursor-pointer text-[14px]'>
											{item.sku}
										</p>
										<div className='flex-[3] cursor-pointer text-[12px]'>
											<p className="border border-[#d0d5dd] shadow-[0px_1px_2px_0px_#1018280D] py-[4px] px-[10px] rounded-[6px] text-center max-w-[80%]">
                                                {item.category}
                                            </p>
										</div>
										<p className='flex-[2] cursor-pointer text-[14px]'>
											{item?.qty ? item.qty : 'N/A'}
										</p>
                                        <p className='flex-[2] cursor-pointer font-semibold text-[14px]'>
											{item?.sold ? item.sold : 'N/A'}
										</p>
										<p className='flex-[3] text-[12px] font-semibold cursor-pointer flex text-center'>
                                            {item?.amount ? `₦${commaNumber(item.amount)}` : 'N/A'}
										</p>
                                        <div className='flex-[3] cursor-pointer text-[11px]'>
											<p className="border border-[#FECDCA] bg-[#FEF3F2] py-[6px] px-[10px] rounded-[100px] text-center max-w-[100%] capitalize text-[#B42318]">
                                                {item.status?.replaceAll("_", " ")}
                                            </p>
										</div>
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

export default Inventories;

const pageItems = ['All', 'In Stock', 'Out of Stock', 'Low stock']

export const members = [
	{
        name: "Salad Nicoise",
        description: "Mixed Vegetable with Sardine & Boiled Egg",
        sku: "#RTG-24245",
        category: "Salad",
        qty: "10",
        sold: "5",
        date: "",
		amount: "15000",
        status: "out_of_stock"
	},
	{
        name: "Salad Nicoise",
        description: "Mixed Vegetable with Sardine & Boiled Egg",
        sku: "#RTG-24245",
        category: "Salad",
        qty: "10",
        sold: "5",
        date: "",
		amount: "15000",
        status: "out_of_stock"
	},
	{
        name: "Salad Nicoise",
        description: "Mixed Vegetable with Sardine & Boiled Egg",
        sku: "#RTG-24245",
        category: "Salad",
        qty: "10",
        sold: "5",
        date: "",
		amount: "15000",
        status: "out_of_stock"
	},
    {
        name: "Salad Nicoise",
        description: "Mixed Vegetable with Sardine & Boiled Egg",
        sku: "#RTG-24245",
        category: "Salad",
        qty: "10",
        sold: "5",
        date: "",
		amount: "15000",
        status: "out_of_stock"
	},
    {
        name: "Salad Nicoise",
        description: "Mixed Vegetable with Sardine & Boiled Egg",
        sku: "#RTG-24245",
        category: "Salad",
        qty: "10",
        sold: "5",
        date: "",
		amount: "15000",
        status: "out_of_stock"
	},
    {
        name: "Salad Nicoise",
        description: "Mixed Vegetable with Sardine & Boiled Egg",
        sku: "#RTG-24245",
        category: "Salad",
        qty: "10",
        sold: "5",
        date: "",
		amount: "15000",
        status: "out_of_stock"
	},
];
