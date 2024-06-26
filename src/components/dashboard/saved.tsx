import React, { useEffect, useMemo, useState } from 'react';
import { BoxFlex, Line, MainWrap, PageListItem, PageListItemWrap, PageToggleText,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardInner, DashboardMain, RecentSection, SavedSearchSection, SavedWrap } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../reusable/propertyCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import BottomNavComp from '../reusable/bottomNav';
import EmptyState from '../reusable/emptyState';
import { GET_SAVED_PROPERTIES } from '../../api/property';
import { useMutation } from '@tanstack/react-query';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import PropertiesSkeleton from '../skeletons/property/propertyListing';

const DashboardSavedProperties = () => {
    
    const navigate = useNavigate();
    const user = useCurrentUser()?.user;
    const [activePage, setActivePage] = useState('Overview');
    const [properties, setProperties] = useState<any>([]);
    const [totalProperties, setTotalProperties] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const { mutateAsync, data, isPending } = useMutation({
        mutationFn: GET_SAVED_PROPERTIES
    })
    
    const triggerGetProperty = () => {
        mutateAsync({
            user_id: user?.id ? `${user?.id}` : ''
        });
    }

    useMemo(() => {
        triggerGetProperty();
    }, [])

    useEffect(() => {
        if (data){
            setProperties(data.data.body.properties)
            setTotalPages(data.data.body.total_pages)
        }
    }, [data])

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
                            <Typography 
                                text='Saved'
                                color='#091525'
                                fontWeight={500}
                                fontSize='16px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <SavedSearchSection>
                            <div>
                                <i><MagnifyingGlassIcon className='w-4 h-4' /></i>
                                <input 
                                    placeholder='Search'
                                />
                            </div>
                        </SavedSearchSection>
                        <DashboardInner
                            padding='5px 70px'
                        >
                            {
                                (properties && properties.length > 0 && !isPending) &&
                                    <SavedWrap>
                                        {
                                            properties.map((item:any, index:number) => (
                                                <PropertyCard 
                                                    key={index}
                                                    img={item.img}
                                                    saved={true}
                                                    property={item}
                                                />
                                            ))
                                        }
                                    </SavedWrap>
                            }
                            {
                                isPending && 
                                    <PropertiesSkeleton col={'2'} />
                            }
                            {
                                (!isPending && properties.length < 1) &&
                                    <EmptyState 
                                        text='You have no saved property yet'
                                        img='/images/save.svg'
                                        imgSize='20rem'
                                    />
                            }
                        </DashboardInner>
                        <Line />
                    </DashboardMain>
                </DashboardFlex>
            </MainWrap>
        </>
    )
}

export default DashboardSavedProperties;

const pageItems = ['Overview', 'Project Progress', 'Payment History']

export const properties = [
    {
        img: '/images/house1.png',
        saved: true
    },
    {
        img: '/images/house2.png',
        saved: true
    },
    {
        img: '/images/house1.png',
        saved: true
    },
    {
        img: '/images/house2.png',
        saved: true
    },
    {
        img: '/images/house1.png',
        saved: true
    },
    {
        img: '/images/house2.png',
        saved: true
    },
    {
        img: '/images/house1.png',
        saved: true
    },
    {
        img: '/images/house2.png',
        saved: true
    },
]