import styled from "styled-components";

interface MainProps {
    mobileDisplay?: string;
}

export const BottomNav = styled.div<MainProps>`
    display:none;
    width: 100%;
    padding: 0 5% 10px 5%;
    bottom:0;
    left:0;
    background: var(--main-bg);
    position:fixed;
    z-index:10;
    justify-content:space-between;
    border-top: 1px solid #F0F3F6;

    @media (max-width:728px){
        display: ${p => p.mobileDisplay || 'flex'};
    }
`;

export const LogoImageWrap = styled.div`
    margin:0.5rem 0 2rem 0;
    display:flex;
    align-items:Center;
`
interface LogoProps {
    width?: any;
}
export const LogoImage = styled.img<LogoProps>`
    width:${p => p.width || '3rem'};
`

export const NavHeader = styled.h3`
    font-weight: 700;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 1px;
    margin: 2.5rem 0 1rem 0;
    color: #C7C7C7;
    font-family: 'Open Sans', sans-serif;
`;

export const BottomNavItem = styled.div`
    cursor:pointer;
    position:relative;

    > div {
        width: 100%;
        display:flex;
        align-items:Center;
        flex-direction: column;
        padding: 10px 0 0 0;
        gap:8px;
    }

    p {
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
    }

    :hover {
        opacity:0.6;
    }
`

export const CloseBtn = styled.i`
    display:none;
    position:absolute;
    top:1.5rem;
    right:1.5rem;
    color: #474747;

    @media (max-width:728px){
        display:block;
    }
`

export const NavOption = styled.div`
    position:relative;
    top:0;
    left:10%;
    padding: 0 15px;
    margin:0 0 1rem 0;
    background: #fff;
    font-size: 14px;
    line-height: 30px;
    color: #808080;
`