import React from 'react';
import styled from 'styled-components';
import Typography from './typography';
import { BoxFlex } from '../../styles/reusable/index';
import { AuthBacknav } from '../../styles/authentication';
import { ProgressBar } from '../dashboard/style';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface PropArgs {
    img?: string;
    mr?: string;
    progress?: number;
}

const PropertyMilestone = ({img, mr, progress} : PropArgs) => {
    return(
        <>
            <PropertyCardMileWrap mr={mr}>
                <img 
                    src={img}
                    alt='Property'
                />
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography 
                            text='2 Bedroom Flat in Victoria Island'
                            color='#1B2229'
                            fontWeight={500}
                            fontSize='14px'
                            lineHeight='30px'
                        />
                        <ChevronRightIcon className='w-5 h-5' color='#8796AD' />
                    </div>
                    <Typography 
                        text='Saka Tinubu, Victoria Island'
                        color='#8796AD'
                        fontWeight={400}
                        fontSize='14px'
                        lineHeight='20px'
                    />
                    <Typography 
                        text='3beds'
                        color='#8796AD'
                        fontWeight={400}
                        fontSize='14px'
                        lineHeight='20px'
                    />
                    <BoxFlex
                        hAlign='space-between'
                        margin='0.5rem 0 0 0'
                    >
                        <Typography 
                            text='₦1,000,000 paid out of ₦1,350,000'
                            color='#1B2229'
                            fontWeight={500}
                            fontSize='14px'
                            lineHeight='14px'
                        />
                        <Typography 
                            text={`${progress ? progress : '21'}% Complete`}
                            color='#1B2229'
                            fontWeight={500}
                            fontSize='14px'
                            lineHeight='14px'
                        />
                    </BoxFlex>
                    <ProgressBar>
                        <progress value={progress ? progress : 21} max={100}></progress>
                    </ProgressBar>
                    <AuthBacknav
                        style={{
                            margin: '0.5rem 0 0 0',
                            fontSize: '14px',
                            color: '#1B2229'
                        }}
                    >Milestone 1 - Infrastructure</AuthBacknav>
                </div>
            </PropertyCardMileWrap>
        </>
    )
}

export default PropertyMilestone;

interface PropertyCardProps{
    mr?: string;
}

export const PropertyCardMileWrap = styled.div<PropertyCardProps>`
    width: 100%;
    border-radius: 12px;
    position:relative;
    margin-right: ${p => p.mr || 0};
    display:flex;
    padding: 32px 0;
    gap:32px;
    align-items:Center;

    > img {
        width:30%;
        max-width:160px;
        border-radius: inherit;
        height:160px;
        object-fit:cover;
    }

    > div {
        width:70%;
    }

    @media (max-width:728px){
        margin-right:0;
        flex-direction: column-reverse;
        align-items: flex-start;

        > img {
            width: 56px;
            height: 56px;
        }

        > div {
            width: 100%;
        }
    }
`