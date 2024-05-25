import React, { useState, useEffect } from 'react';
import { BoxFlex, BreadcrumbArea, DescHeader, MainWrap, PageToggleText, PageToggleHeader, Line } from '../../styles/reusable/index';
import { Button } from '../../styles/reusable';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { AuthBacknav } from '../../styles/authentication';
import AuthHeaderComp from '../../components/auth/authHeader';

const ContactSupport = () => {

    const navigate = useNavigate();

    return(
        <>
            <AuthHeaderComp />
            <MainWrap
                top='2rem'
                width='100%'
                maxWidth='1300px'
            >
                <AuthBacknav
                    onClick={() => navigate(-1)}
                >
                    <Icon.ArrowLeft 
                        color='#8796AD' 
                        size={20}
                    />
                    <p>Back</p>
                </AuthBacknav>
            </MainWrap>
            <MainWrap
                top='-0.5rem'
            >
                
            </MainWrap>
        </>
    )
}

export default ContactSupport;
