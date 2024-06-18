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
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser } from '../../../store/user/reducer';
import { clearState } from '../../../store/properties/reducer';
import { useCurrentUser } from '../../../store/user/useCurrentUser';
import { GET_SINGLE_ORDER } from '../../../api/getApis';
import { useMutation } from '@tanstack/react-query';
import PageSpinner from '../../reusable/Spinner/Spinner';
import { User } from '../transactionComps/singleTransaction';
import { colorEncoder } from '../../../utils/colorHandle';
import moment from 'moment';
import commaNumber from 'comma-number';
import classNames from 'classnames';
import DeclineOrderModal from '../modals/declineOrder';

  
  interface Transaction {
    // Define the structure of a transaction
    // Example fields, adjust according to actual data
    id: number;
    amount: string;
    type: string;
    status: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Order {
    amount: string;
    created_at: string;
    deleted_at: string | null;
    id: number;
    items: Item[];
    status: string;
    status_reason: string;
    transactions: Transaction[];
    updated_at: string;
    user: User;
    user_id: number;
}

interface Media {
  id: number;
  owner_type: string;
  owner_id: number;
  category: string;
  url: string;
  // Include other fields if needed
}

interface AdditionalData {
  color: string;
  size: number;
  eat_in: boolean;
  take_out: boolean;
}

interface Item {
  additional_data: AdditionalData;
  amount: string;
  category: string;
  created_at: string;
  deleted_at: string | null;
  desc: string;
  id: number;
  media: Media[];
  order_id: number;
  product_id: string;
  product_type: string;
  qty: number;
  quantity: number;
  status: string;
  title: string;
  total_amount: string;
  user: User;
  updated_at: string;
}

  
  interface OrderStateProps {
      data: Order,
      vatData: Item
  }

const OrderInfo = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();
    const currentUser = useCurrentUser().user;

    const {id} = useParams();

    const [activePage, setActivePage] = useState('Details');;
    const [openDeclineModal, setOpenDeclineModal] = useState(false)
    const [ordersState, setOrdersState] = useState<OrderStateProps>();
    
    const { mutateAsync, isPending } = useMutation({
        mutationFn: GET_SINGLE_ORDER,
        onSuccess: (data) => {
            setOrdersState((prev: any) => {
                return {
                    ...prev,
                    data: data?.data?.body?.order,
                };
            });
            if (data?.data?.body?.order.items.length > 0){
                setOrdersState((prev: any) => {
                    return {
                        ...prev,
                        vatData: data?.data?.body?.order.items.filter((p:any) => p.product_type === 'vat')[0],
                    };
                });
            }
        },
    });
    
      useEffect(() => {
        if (id){
            mutateAsync({
                id,
            });
        }
      }, [id]);

    return(
        <>
            <DeclineOrderModal 
                openToggle={openDeclineModal}
                closeFunc={() => setOpenDeclineModal(false)}
                id={id ? id : ""}
            />
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
                                <img 
                                    src='/images/bag.png'
                                    alt='User'
                                    className='w-[80px]'
                                />
                                <div 
                                    className='w-[80%]'
                                >
                                    <Typography 
                                        text={`Order for ${ordersState?.data?.user?.first_name} ${ordersState?.data?.user?.last_name}`}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <Typography 
                                        text={`#${ordersState?.data?.id}`}
                                        fontWeight={500}
                                        fontSize='16px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <StatusCard
                                        bg={colorEncoder(`${ordersState?.data?.status}`)?.bg}
                                        color={colorEncoder(`${ordersState?.data?.status}`)?.color}
                                        border={colorEncoder(`${ordersState?.data?.status}`)?.border}
                                    >
                                        {`${ordersState?.data?.status}`?.replaceAll("_", " ")}
                                    </StatusCard>
                                </div>
                            </BoxFlex>
                            <div className="flex gap-[10px]">
                                <p className='font-bold text-[14px]'>{moment(`${ordersState?.data?.created_at}`).startOf('hour').fromNow()}</p>
                            </div>
                        </div>
                        <DashboardInner
                            style={{
                                margin: 0,
                            }}
                            className='!justify-start'
                        >
                            <div className="grid grid-cols-2 gap-[20px]">
                                {
                                    (ordersState?.data?.items && ordersState?.data?.items.length) && ordersState?.data?.items.map((item, index) => {
                                        const additional_data: AdditionalData = JSON.parse(`${item?.additional_data}`);
                                        const cover_image = "/images/dummy.jpeg" 
                                        // item?.media && item?.media.length > 0 ? item?.media[0]?.url : "/images/dummy.jpeg";

                                        return(
                                        <div 
                                            key={index}
                                            className={classNames(
                                                "border rounded-[10px] p-[16px]", 
                                                item.product_type === 'vat' ? "hidden" : ""
                                            )}
                                        >
                                            <div className="flex gap-[16px] items-center">
                                                <img src={cover_image} alt="swim" className="w-[80px] h-[80px] rounded-[8px]" />
                                                <div className="w-[70%]">
                                                    <div className="flex items-center justify-between">
                                                        <div className="bg-[#FCF9F2] text-[12px] py-[4px] px-[8px] rounded-[300px] text-center w-auto inline-block mb-2">
                                                            {additional_data?.eat_in ? "Eat-In" : additional_data?.take_out ? "Take-Out" : "" }
                                                        </div>
                                                        <p className="text-[14px] text-[#898579]">{item?.qty} {item?.qty > 1 ? "plates" : "plate"}</p>
                                                    </div>
                                                    <p className="text-[12px]">{item?.title}</p>
                                                    <p className="text-[13px] font-bold">₦{commaNumber(`${Number(item?.total_amount) / Number(item?.qty)}`)}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )})
                                }
                            </div>
                            <div className="border-t py-[2rem] mt-[8rem]">
                                <div className="flex items-center justify-between">
                                    <div className='w-[40%]'>
                                        <h3 className="font-[400] text-[#898579] text-[16px]">VAT: ₦{commaNumber(`${ordersState?.vatData?.total_amount}`)}</h3>
                                        <h3 className="font-[600] text-[18px]">Total: ₦{commaNumber(`${ordersState?.data?.amount}`)}</h3>
                                    </div>
                                    <div className="flex items-center gap-[16px]">
                                        <Button
                                            bg='#FFF5F5'
                                            color='#D23B3B'
                                            type='button'
                                            width='auto'
                                            top='0'
                                            onClick={() => setOpenDeclineModal(true)}
                                            disabled={ordersState?.data?.status !== 'processing'}
                                        >
                                            Decline Order
                                        </Button>
                                        <Button
                                            bg='#23211D'
                                            color='#fff'
                                            type='button'
                                            width='auto'
                                            top='0'
                                            disabled={ordersState?.data?.status !== 'processing'}
                                        >
                                            Verify Order
                                        </Button>
                                    </div>
                                    
                                </div>
                            </div>   
                        </DashboardInner>
                                </>
                        }
                    </DashboardMain>
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
        </>
    )
}

export default OrderInfo;

const pageItems = ['Overview', 'Transactions', 'Appointments', 'Subscription']