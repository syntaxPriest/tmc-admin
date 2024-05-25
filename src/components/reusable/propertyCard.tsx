import React from 'react';
import styled from 'styled-components';
import Typography from './typography';
import * as Icon from 'react-feather';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import CommaNumber from 'comma-number';
import { useMutation } from '@tanstack/react-query';
import { SAVE_PROPERTIES_BY_ID, UNSAVE_PROPERTIES_BY_ID } from '../../api/property';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface PropArgs {
    img?: string;
    mr?: string;
    saved?: boolean;
    property?: any;
    provisionalLink?: string;
}

const PropertyCard = ({property, img, mr, saved, provisionalLink} : PropArgs) => {

    const navigate = useNavigate();
    
    const {mutateAsync: saveProperty, isPending: isSaving} = useMutation({
        mutationFn: SAVE_PROPERTIES_BY_ID,
        onSuccess: () => {
            enqueueSnackbar({
                variant: 'success',
                message: "You have saved this property!"
            })
        }
    })

    const {mutateAsync: unsaveProperty, isPending: isUnsaving} = useMutation({
        mutationFn: UNSAVE_PROPERTIES_BY_ID,
        onSuccess: () => {
            enqueueSnackbar({
                variant: 'success',
                message: "You have unsaved this property!"
            })
        }
    })


    const Save = () => {
        saveProperty({
            id: property?.id
        })
    }

    return(
        <>
            <PropertyCardWrap 
                mr={mr}
                onClick={() => {
                    if (provisionalLink){
                        navigate(provisionalLink)
                    }else {
                        navigate(`/property/${property?.id}`)
                    }
                }}
            >
                <Bookmark
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!saved){
                            Save();
                        }
                    }}
                >
                    {
                        saved ?
                            <BookmarkIcon className='w-5 h-5' />
                            :
                            <Icon.Bookmark 
                                size={16} 
                                fontVariant={''} 
                            />
                    }
                </Bookmark>
                <img 
                    src={img ? img : '/images/dummy.jpeg'}
                    alt='Property'
                />
                <div
                    className='pt-2'
                >
                    <Typography 
                        text={property?.title}
                        color='#1B2229'
                        fontWeight={500}
                        fontSize='14px'
                        lineHeight='30px'
                    />
                    <Typography 
                        text={property?.address}
                        color='#8796AD'
                        fontWeight={400}
                        fontSize='14px'
                        lineHeight='20px'
                    />
                    <Typography 
                        text={property?.buildings && property?.buildings.length > 0 && `${property?.buildings[0].bedroom_count}beds`}
                        color='#8796AD'
                        fontWeight={400}
                        fontSize='14px'
                        lineHeight='20px'
                    />
                    <Typography 
                        text={`₦${CommaNumber(property?.price)}`}
                        color='#1B2229'
                        fontWeight={700}
                        fontSize='16px'
                        lineHeight='30px'
                    />
                </div>
            </PropertyCardWrap>
        </>
    )
}

export default PropertyCard;

interface PropertyCardProps{
    mr?: string;
}

export const PropertyCardWrap = styled.div<PropertyCardProps>`
    height: 385px;
    border-radius: 12px;
    position:relative;
    margin-right: ${p => p.mr || 0};

    > img {
        width:100%;
        border-radius: inherit;
        height:280px;
        object-fit:cover;
    }

    @media (max-width:728px){
        margin-right:0;
    }
`

export const Bookmark = styled.div`
    width:32px;
    height:32px;
    background: #00000052;
    border-radius: 300px;
    display:flex;
    align-items:Center;
    justify-content:center;
    position: absolute;
    top:14px;
    right:14px;
    color: #fff;
    cursor:pointer;
`