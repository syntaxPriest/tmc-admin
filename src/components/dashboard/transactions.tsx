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
import { GET_TRANSACTIONS } from '../../api/getApis';
import { useMutation } from '@tanstack/react-query';
import TransactionsSkeleton from '../skeletons/transactions';
import EmptyState from '../reusable/emptyState';

const Transactions = () => {
    
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('All');

    const [debouncedValue, setDebouncedValue] = useState<string>("");

  const [transactionsState, setTransactionsState] = useState({
    page: 1,
    searchQuery: "",
    transactions: [],
    transactionsCount: 0,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: GET_TRANSACTIONS,
    onSuccess: (data) => {
      setTransactionsState((prev) => {
        return {
          ...prev,
          transactions: data?.data?.body?.transactions,
          transactionsCount: data?.data?.body?.total_count,
        };
      });
    },
  });

  useEffect(() => {
    mutateAsync({
      offset: transactionsState?.page - 1,
      search: debouncedValue || undefined,
      type: activePage !== 'All' ? activePage.toLowerCase() : undefined,
    });
  }, [activePage, debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionsState((prev) => {
      return {
        ...prev,
        searchQuery: e.target.value,
      };
    });
  };

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
                                text={`Transactions ${
                                    transactionsState?.transactionsCount
                                      ? `(${transactionsState?.transactionsCount})`
                                      : ""
                                  }`}
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
                                        value={transactionsState?.searchQuery}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter'){
                                                setDebouncedValue(e.currentTarget?.value);
                                            }
                                        }}
                                    />
                                </SearchInput>
                            </div>
                        </DashboardHeader>
                        <div className="grid grid-cols-2 gap-[24px] my-[2rem]">
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">&#8358;0.00</h3>
                                <p className='text-[12px] text-[#898579]'>Total Transaction Value</p>
                            </div>
                            <div className="border py-[32px] px-[24px] text-center rounded-[8px]">
                                <h3 className="text-[20px] font-black">&#8358;0.00</h3>
                                <p className='text-[12px] text-[#898579]'>Total Bar Account Balance</p>
                            </div>
                        </div>
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
                        </div>
                        {isPending ? (
                            <TransactionsSkeleton />
                            ) : transactionsState?.transactions.length > 0 ? (
                        <div className="mt-5">
                            {/* Table Header */}
							<div className='flex items-center mt-[2rem] py-2 border-b gap-[10px] font-[500] text-[#23211D]'>
                                <p className='flex-[4] text-[14px]'>Date</p>
                                <p className='flex-[3] text-[14px]'>Reference</p>
								<p className='flex-[6] text-[14px]'>Member</p>
                                <p className='flex-[3] text-[14px]'>Account ID</p>
								<p className='flex-[3] text-[14px]'>Price</p>
                                <p className='flex-[3] text-[14px]'>Status</p>
							</div>
                            {transactionsState.transactions &&
								transactionsState.transactions.length > 0 &&
								transactionsState.transactions.map((item: any, index: number) => (
									<div
										className='flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C]'
                                        onClick={() => navigate(`/dashboard/transaction/${index + 1}`)}
                                    >
										<div className='flex flex-[4] items-center cursor-pointer gap-[10px]'>
											<div className='w-[90%]'>
												<p className='cursor-pointer ellipse text-[14px]'>
                                                    {`${new Date().toDateString()}`}
												</p>
											</div>
										</div>
										<p className='flex-[3] cursor-pointer text-[14px]'>
											{item.reference}
										</p>
										<div className='flex-[6] font-semibold cursor-pointer text-[14px]'>
											<p className="">
                                                {item.member}
                                            </p>
										</div>
                                        <p className='flex-[3] cursor-pointer text-[14px]'>
											{item?.accountId ? item.accountId : 'N/A'}
										</p>
										<p className='flex-[3] text-[12px] font-semibold cursor-pointer flex text-center'>
                                            {item?.amount ? `₦${commaNumber(item.amount)}` : 'N/A'}
										</p>
                                        <div className='flex-[3] cursor-pointer text-[11px]'>
											<p className="border border-[#FECDCA] bg-[#FEF3F2] py-[6px] px-[10px] rounded-[100px] text-center max-w-[55px] capitalize text-[#B42318]">
                                                {item.status?.replaceAll("_", " ")}
                                            </p>
										</div>
									</div>
								))}
                                <PaginationComp />
                        </div>
                        ) : (
                            <EmptyState text="There are no transactions at the moment" />
                          )}
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default Transactions;

const pageItems = ['All', 'Debit', 'Credit',]

export const members = [
	{
        reference: "2221342",
        member: "Olanrewaju Oredipe",
        accountId: "203293",
        date: "",
		amount: "15000",
        status: "debit"
	},
	{
        reference: "2221342",
        member: "Olanrewaju Oredipe",
        accountId: "203293",
        date: "",
		amount: "15000",
        status: "debit"
	},
	{
        reference: "2221342",
        member: "Olanrewaju Oredipe",
        accountId: "203293",
        date: "",
		amount: "15000",
        status: "debit"
	},
    {
        reference: "2221342",
        member: "Olanrewaju Oredipe",
        accountId: "203293",
        date: "",
		amount: "15000",
        status: "debit"
	},
    {
        reference: "2221342",
        member: "Olanrewaju Oredipe",
        accountId: "203293",
        date: "",
		amount: "15000",
        status: "debit"
	},
    {
        reference: "2221342",
        member: "Olanrewaju Oredipe",
        accountId: "203293",
        date: "",
		amount: "15000",
        status: "debit"
	},
];
