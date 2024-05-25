import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/reusable'
import * as Icon from 'iconsax-react';

interface PropsArgs {
    limit?: number;
    page?: number;
    setPage?: any;
    total?: number | string | any;
    incrementAction?: any;
    decrementAction?: any;
}

const PaginationComp = ({page, limit, total, incrementAction, decrementAction, setPage} : PropsArgs) => {

    // const incrementCount= () => {
    //     if (page < Math.ceil(total / limit)){
    //         setPage(++page)
    //         incrementAction();
    //     }
    // }

    // const decrementCount = () => {
    //     if (page > 1){
    //         setPage(--page)
    //         decrementAction();
    //     }
    // }

    return(
        <>
            <PaginationWrap>
                <div>
                    <i>
                        <Icon.ArrowCircleLeft />
                    </i>
                    <PaginationText
                        active={true}
                    >
                        1
                    </PaginationText>
                    <PaginationText>
                        2
                    </PaginationText>
                    <PaginationText>
                        3
                    </PaginationText>
                    <i>
                        <Icon.ArrowCircleRight />
                    </i>
                </div>
            </PaginationWrap>
        </>
    )
}

export default PaginationComp;

const PaginationWrap = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin:120px 0 0 0;

    i {
        position:relative;
        padding: 5px 10px;
        cursor:pointer;
    }

    > div {
        display:flex;
        align-items:Center;
        justify-content:center;
        gap:10px;
    }

    @media (max-width:728px){
        flex-direction:column;
        margin: 5px 0 0 0;
    }
`
interface PaginationTextProps {
    active?: boolean;
}

const PaginationText = styled.p<PaginationTextProps>`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: ${p => p.active ? '#fff' : '#1B2229'};
    padding: 5px 10px;
    border-radius: 100px;
    background: ${p => p.active ? 'var(--primary-color)' : '#fff'};
    cursor:pointer;
`