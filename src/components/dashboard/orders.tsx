import React, { useEffect, useState } from 'react';
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
import { GET_ORDERS } from '../../api/getApis';
import { useMutation } from '@tanstack/react-query';
import EmptyState from '../reusable/emptyState';
import OrdersSkeleton from '../skeletons/orders';
import { colorEncoder } from '../../utils/colorHandle';

const Orders = () => {
    
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('All');

    const [ordersState, setOrdersState] = useState({
        page: 1,
        activeIndex: -1,
        searchQuery: "",
        orders: [],
        ordersCount: 0,
      });
    
      const { mutateAsync, isPending } = useMutation({
        mutationFn: GET_ORDERS,
        onSuccess: (data) => {
          setOrdersState((prev) => {
            return {
              ...prev,
              orders: data?.data?.body?.orders,
              ordersCount: data?.data?.body?.total_count,
            };
          });
        },
      });
    
      useEffect(() => {
        mutateAsync({
          offset: ordersState?.page - 1,
          status:  activePage !== 'All' ? activePage.toLowerCase().replaceAll(" ", "_") : undefined,
        });
      }, [activePage]);

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
                                text={`Orders ${
                                    ordersState?.ordersCount
                                      ? `(${ordersState?.ordersCount})`
                                      : ""
                                  }`}
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
                        {isPending ? (
                            <OrdersSkeleton />
                            ) : ordersState?.orders.length > 0 ? (
                        <div className="mt-5">
                            {/* Table Header */}
							<div className='flex items-end mt-[2rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
								<p className='flex-[4] text-[14px]'>Order No.</p>
								<p className='flex-[3] text-[14px]'>Date</p>
								<p className='flex-[7] text-[14px]'>Customer</p>
                                <p className='flex-[5] text-[14px]'>Status</p>
                                <p className='flex-[2] text-[14px]'>Items</p>
                                <p className='flex-[4] text-[14px]'>Amount</p>
								<p className='flex-[2] text-[14px]'>Action</p>
							</div>
                            {ordersState?.orders &&
								ordersState?.orders.length > 0 &&
								ordersState?.orders.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
                                        onClick={() => navigate(`/dashboard/order/${item.id}`)}
									>
										<div className='flex flex-[4] items-center cursor-pointer gap-[10px]'>
								
											<div className='w-[90%]'>
												<h3 className='font-regular text-[14px] cursor-pointer'>
													{item.id}
												</h3>
											</div>
										</div>
										<p className='flex-[3] cursor-pointer text-[14px]'>
											{`${new Date(item.created_at).toDateString()}`}
										</p>
										<p className='flex-[7] cursor-pointer text-[14px]'>
											{item?.user?.first_name} {item?.user?.last_name}
										</p>
                                        <div className='flex-[5] cursor-pointer text-[11px]'>
											<p className={`bg-[${colorEncoder(item.status)?.bg}] border border-[${colorEncoder(item.status)?.border}] py-[6px] px-[10px] rounded-[100px] text-center inline-block capitalize text-[${colorEncoder(item.status)?.color}] font-[500]`}>
                                                {item.status?.replaceAll("_", " ")}
                                            </p>
										</div>
                                        <p className='flex-[2] cursor-pointer text-[14px]'>
											{item?.items.length}
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
                        ) : (
                            <EmptyState text="There are no orders at the moment" />
                        )}
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
