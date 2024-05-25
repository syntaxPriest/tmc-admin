import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/reusable'
import * as Icon from 'iconsax-react';
import * as IconFeather from 'react-feather';
import { CenterLogo } from '../../styles/reusable/header';
import Typography from './typography';

const FooterComp = () => {
    return(
        <>
            <FooterWrap>
                <div>
                    <CenterLogo 
                        src='/c-logo.png'
                        alt='Contribuild'
                        showMobile={true}
                    />
                    <Typography 
                        text='© 2023 ContriBuild, All rights reserved.'
                        color='#1B2229'
                        fontWeight={400}
                        fontSize='15px'
                        lineHeight='30.6px'
                        margin="1rem 0 0 0"
                    />
                </div>
                <SocialFlex>
                    <div>
                        <Icon.Facebook />
                    </div>
                    <div>
                        <IconFeather.Twitter />
                    </div>
                    <div>
                        <Icon.Instagram />
                    </div>
                    <div>
                        <Icon.Whatsapp />
                    </div>
                </SocialFlex>
            </FooterWrap>
        </>
    )
}

export default FooterComp;

const FooterWrap = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:120px 0 0 0;
    padding: 50px 5% 35px 5%;
    background: #f8f9f9;

    > div:nth-child(1) {
        display:flex;
        flex-direction:column;
        gap:10px;
    }

    @media (max-width:728px){
        flex-direction:column;
        margin: 40px 0 0 0;
    }
`

export const SocialFlex = styled.div`
    display:flex;
    justify-content:flex-end;
    align-items:Center;
    gap:16px;

    > div {
        width: 44px;
        height: 44px;
        border-radius:300px;
        background: #fff;
        display: flex;
        align-items:center;
        justify-content:center;
        color: #B3B9BF;
    }

    @media (max-width:728px){
        margin-top:2rem;
    }
`