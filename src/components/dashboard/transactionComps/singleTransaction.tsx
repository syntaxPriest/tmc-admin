import React, { useEffect, useState } from 'react';
import { BoxFlex, Line, MainWrap, PageListItem, PageListItemWrap, PageToggleText, RandomCircle, StatusCard,} from '../../../styles/reusable/index';
import SideBarWidget from '../../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardInner, DashboardMain, ProfileBoxWrap, ProgressBar } from './../style';
import QuickActionWidget from '../../reusable/quickaction';
import Typography from '../../reusable/typography';
import { PageToggleHeader, IconFlex, ButtonFlex } from '../../../styles/reusable/index';
import * as Icon from 'react-feather';
import * as IconSax from "iconsax-react";
import { Button } from '../../../styles/reusable';
import { useNavigate, useParams } from 'react-router-dom';
import { InputWrap, InputField, AuthBacknav } from '../../../styles/authentication/index';
import EditProfile from './../edit-profile';
import BottomNavComp from '../../reusable/bottomNav';
import { ArrowLeftOnRectangleIcon, EllipsisVerticalIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser } from '../../../store/user/reducer';
import { clearState } from '../../../store/properties/reducer';
import { useCurrentUser } from '../../../store/user/useCurrentUser';
import { removeAfterLogout } from '../../../api/instance';
import TransactionCard from '../TransactionCard';
import { members } from '../members';
import PaginationComp from '../../reusable/pagination';
import { GET_SINGLE_TRANSACTIONS } from '../../../api/getApis';
import { useMutation } from '@tanstack/react-query';
import PageSpinner from '../../reusable/Spinner/Spinner';
import commaNumber from 'comma-number';
import { colorEncoder } from '../../../utils/colorHandle';

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    // Include other fields if needed
}
  
interface Transaction {
    amount: string;
    created_at: string;
    deleted_at: string | null;
    desc: string;
    id: number;
    order_id: number;
    provider: string | null;
    ref: string | null;
    status: string;
    type: string;
    updated_at: string;
    user: User;
    user_id: number;
    wallet_id: number;
}

interface TransactionsStateProps {
    data: Transaction
}

const TransactionInfo = () => {
    
    const navigate = useNavigate();
    const {id} = useParams();

    const [activePage, setActivePage] = useState('Details');;

    const [transactionsState, setTransactionsState] = useState<TransactionsStateProps>();
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: GET_SINGLE_TRANSACTIONS
        ,
        onSuccess: (data) => {
            setTransactionsState((prev) => {
            return {
                ...prev,
                data: data?.data?.body?.transaction,
            };
            });
        },
    });
    
      useEffect(() => {
        if (id){
            mutateAsync({
                transaction_id: id,
            });
        }
      }, [id]);

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
                    {
                        isPending ?
                        <div className="h-[80vh] flex items-center justify-center">
                            <PageSpinner
                                // className="border-[#000]"
                                size={"lg"}
                            />
                        </div>
                        :
                        <>
                        <AuthBacknav
                            onClick={() => navigate(-1)}
                        >
                            <Icon.ArrowLeft 
                                color='#8796AD' 
                                size={20}
                            />
                            <p>Back</p>
                        </AuthBacknav>
                        <div className="flex items-center justify-between py-8 border-b border-[#E1E1E1]">
                            <BoxFlex
                                width='60%'
                                gap="16px"
                                vAlign='center'
                            >
                                <div 
                                    className='w-[80%]'
                                >
                                    <Typography 
                                        text={commaNumber(`${transactionsState?.data?.amount}`)}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <Typography 
                                        text={`${new Date(`${transactionsState?.data?.created_at}`).toUTCString()}`}
                                        color='#091525'
                                        fontWeight={500}
                                        fontSize='14px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                </div>
                            </BoxFlex>
                            <div className="flex gap-[10px]">
                                <StatusCard
                                    bg={colorEncoder(`${transactionsState?.data?.type}`)?.bg}
                                    color={colorEncoder(`${transactionsState?.data?.type}`)?.color}
                                    border={colorEncoder(`${transactionsState?.data?.type}`)?.border}
                                >
                                    {`${transactionsState?.data?.type}`?.replaceAll("_", " ")}
                                </StatusCard>
                            </div>
                        </div>
                            {
                                activePage === 'Details' ?
                                    <>
                                        
                                        <DashboardInner
                                            style={{
                                                margin: 0,
                                            }}
                                            className='!justify-start'
                                        >
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Date</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${new Date(`${transactionsState?.data?.created_at}`).toUTCString()}`}</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Transaction Reference</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${transactionsState?.data?.ref ? transactionsState?.data?.ref : "---"}`}</h3>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Transaction Narration</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${transactionsState?.data?.desc ? transactionsState?.data?.desc : "---"}`}</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Bar Account ID</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${transactionsState?.data?.wallet_id ? transactionsState?.data?.wallet_id : "---"}`}</h3>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Member</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${transactionsState?.data?.user?.first_name} ${transactionsState?.data?.user?.last_name}`}</h3>
                                                </div>
                                            </div>   
                                        </DashboardInner>
                                    </>
                                    : null
                            }
                                </>
                        }
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default TransactionInfo;

const pageItems = ['Details', 'Attendees',]