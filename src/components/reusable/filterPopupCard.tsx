import React, { type Dispatch, type SetStateAction } from 'react';
import { CheckBoxCard, FilterPopupCard, FilterSelect } from '../../styles/reusable/filter';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '../../styles/reusable';
import { InputWrap, InputField } from '../../styles/authentication';
import Typography from './typography';
import { Fade } from 'react-awesome-reveal';
import { constants } from '../../utils/constant';

interface FilterCardProps {
    filterType: string;
    activeFilterType: string;
    setActiveFilterType: Dispatch<SetStateAction<string>>;
    beds?: string | number;
    baths?: string | number;
    minPrice?: string | number;
    maxPrice?: string | number;
    type?: string;
    setMinPrice?: Dispatch<SetStateAction<string>>;
    setMaxPrice?: Dispatch<SetStateAction<string>>;
    setBeds?: Dispatch<SetStateAction<string>>;
    setBaths?: Dispatch<SetStateAction<string>>;
    setType?: Dispatch<SetStateAction<string>>;
    triggerGetProperty: () => void;
}

const FilterSelectCard = ({
    filterType, 
    activeFilterType, 
    setActiveFilterType,
    minPrice,
    maxPrice,
    beds,
    baths,
    type,
    setMinPrice,
    setMaxPrice,
    setBeds,
    setBaths,
    setType,
    triggerGetProperty
} : FilterCardProps) => {
    return(
        <>
            <FilterSelect
                onClick={(e) => {
                    e.stopPropagation();
                    setActiveFilterType(filterType)}
                }
            >
                <p>{filterType}</p>
                <ChevronDownIcon className="w-4 h-4" color="#8796AD" />
                {
                    activeFilterType === filterType &&
                        <Fade duration={700}>
                            <FilterPopupCard>
                                {
                                    activeFilterType === 'Price' &&
                                    <>
                                        <InputWrap>
                                            <InputField
                                            >
                                                <p>Min Price</p>
                                                <input 
                                                    placeholder='₦0'
                                                    autoComplete="off"
                                                    type='number'
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice && setMinPrice(e.target.value)}
                                                />
                                            </InputField>
                                            <InputField
                                            >
                                                <p>Max Price</p>
                                                <input 
                                                    placeholder='₦0'
                                                    autoComplete="off"
                                                    type='number'
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice && setMaxPrice(e.target.value)}
                                                />
                                            </InputField>
                                        </InputWrap>
                                        <Button
                                            bg='var(--primary-color)'
                                            color='#fff'
                                            type='button'
                                            width='100%'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerGetProperty();
                                                setActiveFilterType('')
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </>
                                }
                                {
                                    activeFilterType === 'Type' &&
                                    <>
                                        <Typography 
                                            text='Property Type'
                                            color='#1B2229'
                                            fontWeight={600}
                                            fontSize='14px'
                                            lineHeight='16.8px'
                                            margin="0 0 15px 0"
                                        />
                                        <InputWrap>
                                            {
                                                (constants.apartmentTypes && constants.apartmentTypes.length > 0) &&
                                                    <>
                                                        {
                                                            constants.apartmentTypes.map((item, index) => (
                                                                <CheckBoxCard
                                                                    key={index}
                                                                >
                                                                    <input 
                                                                        type="checkbox" 
                                                                        name='apartment_type' 
                                                                        value={type}
                                                                        checked={item === type ? true : false}
                                                                        onChange={(e) => {
                                                                            if (e.target.checked){
                                                                                setType && setType(item)
                                                                            }
                                                                        }}
                                                                    />
                                                                    <p>{item}</p>
                                                                </CheckBoxCard>
                                                            ))
                                                        }
                                                    </>
                                            }
                                        </InputWrap>
                                        <Button
                                            bg='var(--primary-color)'
                                            color='#fff'
                                            type='button'
                                            width='100%'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerGetProperty();
                                                setActiveFilterType('')
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </>
                                }
                                {
                                    activeFilterType === 'Beds' &&
                                    <>
                                        <Typography 
                                            text='Beds'
                                            color='#1B2229'
                                            fontWeight={600}
                                            fontSize='14px'
                                            lineHeight='16.8px'
                                            margin="0 0 15px 0"
                                        />
                                        <InputWrap>
                                            {
                                                <>
                                                    {
                                                        [1, 2, 3, 4].map((item, index) => (
                                                            <CheckBoxCard
                                                                key={index}
                                                            >
                                                                <input 
                                                                    type="checkbox" 
                                                                    name='bed' 
                                                                    value={beds}
                                                                    checked={item === Number(beds) ? true : false}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked){
                                                                            setBeds && setBeds(item.toString())
                                                                        }
                                                                    }}
                                                                />
                                                                <p>{item} {item === 1 ? "Bed" : "Beds"}</p>
                                                            </CheckBoxCard>
                                                        ))
                                                    }
                                                </>
                                            }
                                        </InputWrap>
                                        <Button
                                            bg='var(--primary-color)'
                                            color='#fff'
                                            type='button'
                                            width='100%'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerGetProperty();
                                                setActiveFilterType('')
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </>
                                }
                                {
                                    activeFilterType === 'Baths' &&
                                    <>
                                        <Typography 
                                            text='Baths'
                                            color='#1B2229'
                                            fontWeight={600}
                                            fontSize='14px'
                                            lineHeight='16.8px'
                                            margin="0 0 15px 0"
                                        />
                                        <InputWrap>
                                            {
                                                <>
                                                    {
                                                        [1, 2, 3, 4].map((item, index) => (
                                                            <CheckBoxCard
                                                                key={index}
                                                            >
                                                                <input 
                                                                    type="checkbox" 
                                                                    name='bath'
                                                                    value={baths}
                                                                    checked={item === Number(baths) ? true : false}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked){
                                                                            setBaths && setBaths(item.toString())
                                                                        }
                                                                    }} 
                                                                />
                                                                <p>{item} {item === 1 ? "Bath" : "Baths"}</p>
                                                            </CheckBoxCard>
                                                        ))
                                                    }
                                                </>
                                            }
                                        </InputWrap>
                                        <Button
                                            bg='var(--primary-color)'
                                            color='#fff'
                                            type='button'
                                            width='100%'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerGetProperty();
                                                setActiveFilterType('')
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </>
                                }
                            </FilterPopupCard>
                        </Fade>
                }
            </FilterSelect>
        </>
    )
}

export default FilterSelectCard;
