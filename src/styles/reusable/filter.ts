import styled from 'styled-components';

export const FilterSelect = styled.div`
    position: relative;
    width: auto;
    background: #f8f9f9;
    padding: 6px 10px;
    display: flex;
    align-items:center;
    justify-content:center;
    gap: 4px;
    border-radius: 200px;
    cursor: pointer;

    > p {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: 0em;
    }

    > div {
        position: relative;
        z-index: 100;
        position:absolute;
        left: -230%;
        top:38px;
    }

    @media (max-width: 728px){
        > div {
            left: -30%;
        }
    }
`

export const FilterPopupCard = styled.div`
    width: 240px;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #EDF3FC;
    z-index: 100000000000;

    @media (max-width: 728px){
        width: 150px;
    }
`

export const CheckBoxCard = styled.div`
    display: flex;
    align-items:center;
    gap: 8px;
    margin: 0 0 16px 0;
    width: 100%;

    > input {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid #C6CACD;
    }

    > p {
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        color: #1B2229;
    }
`