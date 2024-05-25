import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { FilterLocation, FilterSelectWrap, FilterWrap, MobileMenuController, LeftCont} from '../../styles/reusable/header';
import RoleCardComp from './roleCard';
import { RandomCircle } from '../../styles/reusable/index';
import * as Icon from 'iconsax-react';
import FilterSelectCard from './filterPopupCard';

interface FilterCardProps {
    activeFilterType: string;
    setActiveFilterType: Dispatch<SetStateAction<string>>;
    searchQuery?: string;
    setSearchQuery?: Dispatch<SetStateAction<string>>;
    beds?: string | number;
    baths?: string | number;
    minPrice?: string | number;
    maxPrice?: string | number;
    type?: string;
    setMinPrice: Dispatch<SetStateAction<string>>;
    setMaxPrice: Dispatch<SetStateAction<string>>;
    setBeds: Dispatch<SetStateAction<string>>;
    setBaths: Dispatch<SetStateAction<string>>;
    setType: Dispatch<SetStateAction<string>>;
    triggerGetProperty: () => void;
}

const FilterComp = ({
    activeFilterType, 
    setActiveFilterType, 
    searchQuery, 
    setSearchQuery, 
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

    const [showSearch, setShowSearch] = useState(false);

    return(
        <>
            <FilterWrap>
                {
                    !showSearch ?
                    <FilterLocation>
                        <MobileMenuController>
                            <RandomCircle
                                size={'40px'}
                                onClick={() => setShowSearch(true)}
                            >
                                <Icon.SearchNormal1 size={18} />
                            </RandomCircle>
                        </MobileMenuController>
                        <div>
                            <p>What you searched for:</p>
                            <RoleCardComp 
                                text={searchQuery}
                                hasIcon={true}
                                iconAction={() => setSearchQuery && setSearchQuery('')}
                                btnAction={() => {}}
                            />
                        </div>
                    </FilterLocation>
                    : null
                }
                {
                    showSearch ?
                    <LeftCont
                        mobileDisplay={true}
                    >
                        <div>
                            <i>
                                <Icon.SearchNormal1 size={18} />
                            </i>
                            <i>
                                <Icon.ArrowCircleRight2 
                                    size={28} 
                                    variant='Bold' 
                                    color='var(--secondary-color)' 
                                    onClick={() => setShowSearch(false)}
                                />
                            </i>
                            <input 
                                placeholder='Search'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                            />
                        </div>
                    </LeftCont>
                    : null
                }
                <FilterSelectWrap>
                    <FilterSelectCard
                        filterType='Price'
                        activeFilterType={activeFilterType}
                        setActiveFilterType={setActiveFilterType}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        triggerGetProperty={triggerGetProperty}
                    />
                    <FilterSelectCard
                        filterType='Type'
                        activeFilterType={activeFilterType}
                        setActiveFilterType={setActiveFilterType}
                        type={type}
                        setType={setType}
                        triggerGetProperty={triggerGetProperty}
                    />
                    <FilterSelectCard
                        filterType='Beds'
                        activeFilterType={activeFilterType}
                        setActiveFilterType={setActiveFilterType}
                        beds={beds}
                        setBeds={setBeds}
                        triggerGetProperty={triggerGetProperty}
                    />
                    <FilterSelectCard
                        filterType='Baths'
                        activeFilterType={activeFilterType}
                        setActiveFilterType={setActiveFilterType}
                        baths={baths}
                        setBaths={setBaths}
                        triggerGetProperty={triggerGetProperty}
                    />
                </FilterSelectWrap>
            </FilterWrap>
        </>
    )
}

export default FilterComp;