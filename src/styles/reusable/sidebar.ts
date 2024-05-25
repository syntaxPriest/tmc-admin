import styled from "styled-components";

interface MainProps {
    mobileDisplay?: string;
}

export const MainWidget = styled.div<MainProps>`
    width:21.1%;
    max-width: 219px;
    padding: 32px 0%;
    position: sticky;
    height:100vh;
    top:0;
    left:0;
    background: var(--main-bg);
    border-right: 1px solid #F0F3F6;
    overflow-y:auto;

    @media (max-width:728px){
        display: ${p => p.mobileDisplay || 'none'};
        position:fixed;
        width:100%;
        height:100%;
        z-index:10000;
        padding: 1rem 10% 3rem 10%;
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

export const NavItem = styled.div`
    display:flex;
    align-items:Center;
    justify-content:space-between;
    padding:16px 0 16px 0;
    cursor:pointer;
    position:relative;
    border-bottom: 1px solid #F8F9F9;

    > div {
        width: 100%;
        display:flex;
        align-items:Center;
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