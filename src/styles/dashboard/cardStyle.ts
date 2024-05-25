import styled from "styled-components";

export const CardGridWrap = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:flex-start;
    gap:10%;

    @media (max-width:728px){
        flex-direction:column;
        gap:50px;
    }
`;

interface MainCardProps {
    bgImage?: any;
}

export const MainCard = styled.div<MainCardProps>`
    width:35%;
    background: ${p => p.bgImage || '#000000'};
    height:13rem;
    padding:1rem 3%;
    background-size:cover;
    background-position:Center;
    background-repeat:no-repeat;
    border-radius:16px;
    color: #fff;

    > h3 {
        font-weight: 400;
        font-size: 15px;
        line-height: 29px;
    }

    > h1 {
        font-weight: 600;
        font-size: 35px;
        line-height: 20px;
        letter-spacing: 1px;
    }

    > p {
        font-weight: 400;
        font-size: 12px;
        line-height: 98px;
        letter-spacing: 1px;
    }

    @media (max-width:728px){
        width:90%;
        padding: 1rem 5%;
    }
`

export const OverviewCardWrap = styled.div`
    width:55%;
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows:auto;
    grid-gap:30px;

    > div {
        height:6rem;
        background: url('./images/overview.png');
        background-size:cover;
        background-position:Center;
        background-repeat:no-repeat;
        border-radius:16px;
        color:#fff;
        padding:0.5rem 5% 0.5rem 10%;
        position:relative;

        > i {
            position:absolute;
            top: 50%;
            transform: translate(0, -50%);
            right:5%;
        }

        > h3 {
            font-weight: 400;
            font-size: 12px;
        }

        > h1 {
            font-weight: 600;
            font-size: 18px;
            line-height: 14px;
        }

        > p {
            font-weight: 400;
            font-size: 10px;
            line-height: 18px;
            color: rgba(255, 255, 255, 0.7);
        }
    }

    @media (max-width:728px){
        width:100%;
    }
`