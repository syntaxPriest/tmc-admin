import React, { useMemo, useState, useEffect } from 'react';
import Header from '../reusable/header';
import FilterComp from '../reusable/filter';
import { MainWrap, PropertyWrap } from '../../styles/reusable/index';
import Typography from '../reusable/typography';
import PropertyCard from '../reusable/propertyCard';
import PaginationComp from '../reusable/pagination';
import FooterComp from '../reusable/footer';
import { Link } from 'react-router-dom';
import { Button } from '../../styles/reusable';
import { SaveCard } from '../../pages/landing/style';
import MakeRequest from '../../pages/search/request';
import { useMutation } from '@tanstack/react-query';
import { GET_PROPERTIES } from '../../api/property';
import { Spinner } from '../reusable/spinner';
import PropertiesSkeleton from '../skeletons/property/propertyListing';

const SearchIndex = () => {

    const [properties, setProperties] = useState<any>([]);
    const [totalProperties, setTotalProperties] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [activeFilterType, setActiveFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [beds, setBeds] = useState('')
    const [baths, setBaths] = useState('')
    const [type, setType] = useState('')
    const [openRequest, setOpenRequest] = useState(false);

    const { mutateAsync, data, isPending } = useMutation({
        mutationFn: GET_PROPERTIES
    })
    
    const triggerGetProperty = () => {
        mutateAsync({
            min_price: minPrice ? minPrice : undefined,
            max_price: maxPrice ? maxPrice : undefined,
            beds: beds ? beds : undefined,
            baths: baths ? baths : undefined,
            search: searchQuery ? searchQuery : undefined,
            type: type ? type.toLocaleLowerCase() : undefined
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
            <div
                onClick={() => setActiveFilterType('')}
            >
                <Header isSearchPage={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <FilterComp 
                    activeFilterType={activeFilterType} 
                    setActiveFilterType={setActiveFilterType} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    beds={beds}
                    baths={baths}
                    type={type}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    setBeds={setBeds}
                    setBaths={setBaths}
                    setType={setType}
                    triggerGetProperty={triggerGetProperty}
                />
                <MainWrap>
                    {
                        totalProperties > 0 &&
                            <Typography 
                                text={searchQuery ? `About 100 properties for ${searchQuery}` : '100 Total Properties.'}
                                color='#000'
                                fontWeight={600}
                                fontSize='18px'
                                lineHeight='21.6px'
                            />
                    }
                    {
                        isPending && 
                            <PropertiesSkeleton />
                    }
                    <PropertyWrap>
                        
                        {
                            (properties && properties.length > 0) && properties.map((item:any, index:number) => (
                                <PropertyCard 
                                    key={index}
                                    img={item?.img}
                                    saved={item && item?.saved ? item?.saved : false}
                                    property={item}
                                />
                            ))
                        }
                    </PropertyWrap>
                    {
                        (properties && properties.length > 0 && totalPages > 1) && 
                        <PaginationComp />
                    }
                    <div className='mt-[7rem]'>
                        <SaveCard>
                            <div>
                                <Typography 
                                    text={'Can’t find a property you like?'}
                                    color='#1B2229'
                                    fontWeight={600}
                                    fontSize='32px'
                                    lineHeight='32px'
                                />
                                <Typography 
                                    text={'Tell us more about it and we’d get in touch with you as soon as we can.'}
                                    color='#1B2229'
                                    fontWeight={400}
                                    fontSize='16px'
                                    lineHeight='22.4px'
                                    margin='1rem 0 0rem 0'
                                />
                                <Button
                                    bg='var(--primary-color)'
                                    color='#fff'
                                    type='button'
                                    width='auto'
                                    onClick={() => setOpenRequest(true)}
                                >
                                    Tell us about it
                                </Button>
                            </div>
                            <img 
                                src={'./images/chat.png'}
                                alt={'Building'}
                            />
                        </SaveCard>
                    </div>
                </MainWrap>
                <FooterComp />
                {
                    openRequest && (
                        <MakeRequest
                            closeFunc={() => setOpenRequest(false)}
                        />
                    )
                }
            </div>
        </>
    )
}

export default SearchIndex;