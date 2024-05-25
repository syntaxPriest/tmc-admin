import styled from 'styled-components';

export const HeroSection = styled.div`
    margin: 0 auto;

    > div {
        width: 560px;

        @media (max-width:728px){
            width: 100%;
        }
    }
`

export const FindInput = styled.div`
    width:90%;
    margin: 2rem auto 0rem auto;
    position:relative;
    transition: 1s;

    :focus-within{
        outline:1px solid var(--primary-color);
    }
    
    > input {
        width:100%;
        background: #FFF;
        box-shadow: 0px 4px 8px 0px #0000000A;
        border: 1px solid #C6CACD;
        border-radius: 300px;
        padding:18px 18% 18px 12%;
    }

    > i {
        position:Absolute;
        left:1.5rem;
        top:50%;
        transform: translate(0, -50%);
    }

    > button {
        position:Absolute;
        right:7px;
        top:33%;
        transform: translate(0, -50%);
        cursor:pointer;

        : hover {
            opacity:0.6;
        }
    }

    @media (max-width:728px){
        width: 100%;

        > input {
            width: 100%;
            padding: 13px 40% 13px 12%;
        }

        > i:first-child {
            left:0.7rem;
        }
    
        > i:nth-child(2){
            right:0.7rem;
        }

        > button {
            padding: 10px 10px;
            top: 16px;
            right: 5px;
        }
    }
`

export const OffersWrap = styled.div`
    background: #EBF4FE;
    padding: 70px 0;

    > div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
        grid-gap: 20px;
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
        position: relative;

        @media (max-width:728px){
            grid-template-columns: repeat(1, 1fr);
            max-width: 100%;
            padding: 0 20px;
        }
    }
` 

export const OfferCard = styled.div`
    position:relative;
    text-align:center;

    > img {
        width: 40px;
        display: block;
        margin: 0 auto 0.5rem auto;
    }

    > h3 {
        font-size: 20px;
        font-weight: 500;
        line-height: 25px;
        letter-spacing: -0.04em;
        color: #1B2229;
        position:absolute;
        left: 50%;
        transform: translate(-50%, 0);
        top: 0.5rem;
    }

    > p {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: center;

    }

    @media (max-width:728px){
        margin:2rem 0 0 0;
    }
`

export const LandingAboutWrap = styled.div`
    margin: 8rem auto;

    > div:nth-child(even) {
        flex-direction: row-reverse;

        @media (max-width:728px){
            flex-direction: column-reverse;
        }
    }
`

export const LandingAbout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin: 0 0 10rem 0;

    > div {
        width: 100%;
        max-width: 400px;
    }

    img {
        width: 532px;
    }

    @media (max-width:728px){
        flex-direction: column-reverse;
        gap: 60px;
        margin: 0 0 6rem 0;

        > div {
            max-width: 100%;
        }
    }
`

export const SaveCard = styled.div`
    position: relative;
    padding: 94px 72px;
    border-radius: 32px;
    background: #EBF4FE;
    gap: 24px;

    > div {
        width: 48%;
    }

    > img {
        position: absolute;
        width: 520px;
        height: 100%;
        object-fit: cover;
        bottom: 0;
        right: 0;
    }

    @media (max-width:728px){
        padding: 50px 20px 5px 20px;

        > div {
            width: 100%;
        }

        > img {
            width: 100%;
            height: auto;
            position: relative;
            margin: 4rem 0 0 0;
        }
    }
`;

export const FaqWrap = styled.div`
    position: relative;
    margin: 8rem 0 0 0;
    overflow: hidden;
`

export const FaqCard = styled.div`
    width: 800px;
    padding: 32px;
    border-radius: 32px;
    gap: 48px;
    background: #f8f9f9;
    margin: 30px auto 0 auto;
    position: relative;

    @media (max-width:728px){
        width: 100%;
        padding: 32px 20px;
    }
`

export const FloatingToggle = styled.div`
    position: absolute;
    top: 35px;
    right: 35px;
    cursor: pointer;

    :hover {
        opacity: 0.6;
    }

    @media (max-width:728px){
        right: 15px;
    }
`

export const ContactWrap = styled.div`
    margin: 8rem auto;
    display: flex;
    align-items:flex-start;
    justify-content:space-between;

    @media (max-width:728px){
        flex-direction: column;
        gap: 60px;

        > div {
            max-width: 100%;
        }
    }
`