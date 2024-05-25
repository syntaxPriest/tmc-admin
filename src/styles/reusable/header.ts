import styled from "styled-components";

export const MainHeaderCont = styled.div`
    width:100%;
    // max-width: 996px;
    background: #ffffff;
    padding:16px 5%;
    display:flex;
    align-items:Center;
    justify-content:space-between;
    border-bottom: 1px solid #F0F3F6;
    margin: 0 auto;

    @media (max-width:728px){
        padding:16px 5%;
    }
`

interface LeftContProps {
    mobileDisplay?: boolean;
}

export const LeftCont = styled.div<LeftContProps>`
    width: 25%;
    position:relative;
    display: ${p => p.mobileDisplay ? 'none' : 'block'};
    transition: 1s;

    > div {
        position:relative;
        width: 250.17px;

        :focus-within{
            outline:1px solid var(--primary-color);
        }
    }
    
    > div > input {
        width: 250.17px;
        background: #F8F9F9;
        border-radius: 300px;
        padding:13px 18% 13px 20%;
    }

    > div > i:first-child {
        position:Absolute;
        left:1.3rem;
        top:50%;
        transform: translate(0, -50%);
    }

    > div > i:nth-child(2){
        position:Absolute;
        right: 5%;
        top:50%;
        transform: translate(0, -50%);
        cursor:pointer;

        : hover {
            opacity:0.6;
        }
    }

    @media (max-width:728px){
        width: 100%;
        display: ${p => p.mobileDisplay ? 'block' : 'none'};

        > input {
            width: 100%;
            padding: 13px 12%;
        }

        > i:first-child {
            left:0.7rem;
        }
    
        > i:nth-child(2){
            right:0.7rem;
        }
    }
`

interface CenterLogoProps {
    showMobile?: boolean;
}

export const CenterLogo = styled.img<CenterLogoProps>`
    width: 120px;

    @media (max-width:728px){
        display: ${p => p.showMobile ? 'block' : 'none'};
        margin: 0 auto;
    }
`

export const  RightCont = styled.div`
    display:flex;
    align-items:Center;
    justify-content:flex-end;
    gap:60px;
    width:25%;

    @media (max-width:728px){
        gap:10px;
        // display:none;
        width:80%;
    }

    
`
export const IconSection = styled.div`
    display:flex;
    align-items:Center;
    gap:20px;

    > i {
        width:2.5rem;
        height:2.5rem;
        display:flex;
        align-items:center;
        justify-content:center;
        position:relative;
        background: #EDF2F6;
        border-radius: 60px;
    }

    @media (max-width:728px){
        display:none;
        // visibility:hidden;
    }
`;

export const LoggedSection = styled.div`
    display:flex;
    align-items:center;
    gap:15px;
    position:relative;

    > div:nth-child(2){
        line-height:10px;
        
        > h3 {
            width:6rem;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            font-size:14px;
        }
        > p {
            font-size:12px;
        }
    }
`

export const LoggedAvatar = styled.div`
    padding:0.8rem 1.2rem;
    background: #F42F4B;
    border-radius: 14px;
    font-size:18px;
    font-weight:600;
    color: #fff;
`

interface CountProps {
    bg: any;
} 

export const NotificationCount = styled.p<CountProps>`
    width:20px;
    height:20px;
    display:flex;
    align-items:Center;
    justify-content:Center;
    position:absolute;
    font-style: normal;
    top:-1.3rem;
    right:-0.5rem;
    font-size:10px;
    color: #fff;
    background: ${p => p.bg || '#216FED'};
    border-radius:5rem;
    border: 3px solid #EDF2F6;
`

export const MobileMenuController = styled.div`
    display:none;

    > i {
        font-size:20px;
    }

    @media (max-width:728px){
        display:block;
    }
`

export const AccountPopUp = styled.div`
    position:absolute;
    top:3rem;
    right:0;
    background:#fff;
    z-index:1000;
`;

export const FilterWrap = styled.div`
    width:100%;
    background: #ffffff;
    padding:20px 7% 16px 7%;
    display:flex;
    align-items:Center;
    justify-content:space-between;
    border-bottom: 1px solid #F0F3F6;

    @media (max-width:728px){
        width: 100%;
        padding:16px 5%;
        flex-direction:column;
        align-items:flex-start;
        gap: 20px;
    }
`

export const FilterLocation = styled.div`
    display:flex;
    align-items:center;
    gap:8px;
    font-weight:500;

    > div:nth-child(2) {
        display:flex;
        align-items:center;
        gap:8px;
    }

    @media (max-width:728px){
        width: 100%;
        justify-content:space-between;
    }
`;

export const FilterSelectWrap = styled.div`
    gap:16px;
    display:Flex;
    align-items:center;
    justify-content:flex-end;
`