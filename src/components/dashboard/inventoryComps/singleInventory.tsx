import React, { useEffect, useState } from 'react';
import { BoxFlex, Line, MainWrap, PageListItem, PageListItemWrap, PageToggleText, RandomCircle,} from '../../../styles/reusable/index';
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
import { GET_SINGLE_INVENTORY } from '../../../api/getApis';
import { useMutation } from '@tanstack/react-query';
import AddInventoryItem, { inventoryDataProps } from '../modals/addInventoryItem';
import PageSpinner from '../../reusable/Spinner/Spinner';
import commaNumber from 'comma-number';
import { colorEncoder } from '../../../utils/colorHandle';
import AskYesOrNo from '../modals/askYesOrNo';
import { enqueueSnackbar } from 'notistack';
import { DELETE_INVENTORY } from '../../../api/action';
import { StatusCard } from '../../../styles/reusable/index';
import { getCdnLink } from '../../../utils/imageParser';

interface InventoryStateProps {
    data: inventoryDataProps
}

const SingleInventory = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    const [activePage, setActivePage] = useState('Details');


    const [openEditItem, setOpenEditItem] = useState(false);
    const [askDelete, setAskDelete] = useState(false)
    const [inventoryState, setInventoryState] = useState<InventoryStateProps>({
        data: {},
    });
    
      const { mutateAsync, isPending } = useMutation({
        mutationFn: GET_SINGLE_INVENTORY
        ,
        onSuccess: (data) => {
          setInventoryState((prev) => {
            return {
              ...prev,
              data: data?.data?.body?.product,
            };
          });
        },
      });

      const { mutateAsync: deleteInventory, isPending: isDeleting } = useMutation({
        mutationFn: DELETE_INVENTORY
        ,
        onSuccess: (data) => {
          enqueueSnackbar({
            variant: 'success',
            message: 'Inventory deleted successfully!'
          })
          navigate("/dashboard/inventories")
        },
      });
    
      useEffect(() => {
        if (id){
            mutateAsync({
                id,
            });
        }
      }, [id]);


      const handleDelete = () => {
        deleteInventory({
            id: id ? id: ""
        })
      }

      const triggerReload = () => {
        if (id){
            mutateAsync({
                id,
            });
        }
    }

    return(
        <>
            <AskYesOrNo 
                openToggle={askDelete}
                headerText='Delete Item'
                question='Are you sure you want to delete this item?'
                declineText="Cancel"
                actionText="Delete"
                yesAction={() => handleDelete()}
                noAction={() => setAskDelete(false)}
                actionInProgress={isDeleting}
            />
            <AddInventoryItem 
                openToggle={openEditItem}
                closeFunc={() => setOpenEditItem(false)}
                triggerReload={triggerReload}
                actionType='edit'
                inventoryData={inventoryState?.data}
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
                        <div className="flex items-start justify-between py-8 border-b border-[#E1E1E1]">
                            <BoxFlex
                                width='60%'
                                gap="16px"
                                vAlign='flex-start'
                            >
                                <img 
                                    src={inventoryState?.data?.cover ? `${getCdnLink(`${inventoryState?.data?.cover}`, 'inventory')}` : '/images/dummy.jpeg'}
                                    alt='User'
                                    className='w-[80px]'
                                />
                                <div 
                                    className='w-[80%] mt-2'
                                >
                                    <Typography 
                                        text={`${inventoryState?.data?.title}`}
                                        color='#091525'
                                        fontWeight={700}
                                        fontSize='20px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                    <Typography 
                                        text={`${inventoryState?.data?.desc}`}
                                        color='#091525'
                                        fontWeight={400}
                                        fontSize='14px'
                                        lineHeight='22px'
                                        margin='0 0 0.4rem 0'
                                    />
                                </div>
                            </BoxFlex>
                            <div className="flex gap-[10px]">
                                {
                                    (inventoryState?.data?.type === 'restaurant_item') &&
                                        <Button
                                            bg='#F3F1EF'
                                            color='#23211D'
                                            type='button'
                                            width='auto'
                                            top='0'
                                            onClick={() => setOpenEditItem(true)}
                                        >
                                            Restock
                                        </Button>
                                }
                                <Button
                                    bg='#23211D'
                                    color='#fff'
                                    type='button'
                                    width='auto'
                                    top='0'
                                    onClick={() => setOpenEditItem(true)}
                                >
                                    Edit Item
                                </Button>
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
                                                    <p className='text-[13px]'>Price</p>
                                                    <h3 className='text-[15px] font-[600]'>₦{`${commaNumber(Number(inventoryState?.data?.amount))}`}</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Quantity Available</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${inventoryState?.data?.quantity}`}</h3>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Category</p>
                                                    <div className="bg-[#fff] border border-[#D0D5DD] text-[11px] py-[4px] px-[12px] rounded-[8px] text-center w-auto inline-block mt-3">
                                                        {`${inventoryState?.data?.category}`}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>Status</p>
                                                    <StatusCard
                                                        bg={colorEncoder(`${inventoryState?.data?.status}`)?.bg}
                                                        color={colorEncoder(`${inventoryState?.data?.status}`)?.color}
                                                        border={colorEncoder(`${inventoryState?.data?.status}`)?.border}
                                                    >
                                                        {inventoryState?.data?.status?.replaceAll("_", " ")}
                                                    </StatusCard>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-[30px] pt-[2rem] pb-[1rem] border-b">
                                                <div>
                                                    <p className='text-[13px]'>Product ID</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${inventoryState?.data?.id}`}</h3>
                                                </div>
                                                <div>
                                                    <p className='text-[13px]'>SKU</p>
                                                    <h3 className='text-[15px] font-[600]'>{`${inventoryState?.data?.product_id}`}</h3>
                                                </div>
                                            </div>
                                            <div className="border-t py-[2rem]">
                                                <div className="flex items-center justify-between">
                                                    <div className='w-[40%]'>
                                                        <h3 className="font-[500]">Delete Item</h3>
                                                        <p className="font-[400] text-[12px] text-[#898579] pt-1">By deleting this item, you are removing this item completely from this app.</p>
                                                    </div>
                                                    <Button
                                                        bg='#FFF5F5'
                                                        color='#D23B3B'
                                                        type='button'
                                                        width='auto'
                                                        top='0'
                                                        onClick={() => setAskDelete(true)}
                                                    >
                                                        Delete Item
                                                    </Button>
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

export default SingleInventory;

const pageItems = ['Details', 'Attendees',]