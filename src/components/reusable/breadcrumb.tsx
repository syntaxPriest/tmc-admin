import React from 'react';
import styled from 'styled-components'
import * as Icon from 'iconsax-react';
import { Link } from 'react-router-dom'

interface PropsArgs {
    navName: string;
    redirectUrl: string;
}

const BreadcrumbArea = ({navName, redirectUrl} : PropsArgs) => {
    return(
        <>
            <BreadcrumbWrap>
                <Link to={redirectUrl}>
                    <Icon.Home
                        color='#737B8B'
                        size='16'
                    />
                </Link>
                <Icon.ArrowRight2 
                    color='#737B8B'
                    size='10'
                />
                <h3>{navName}</h3>
            </BreadcrumbWrap>
        </>
    )
}

export default BreadcrumbArea;

const BreadcrumbWrap = styled.div`
    display:flex;
    align-items:Center;
    gap:10px;
    margin:1rem 0 0 0;

    > h3 {
        font-weight: 400;
        font-size: 14px;
        color: #FFAB01;
    }
`