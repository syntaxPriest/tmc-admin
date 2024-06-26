import styled from "styled-components";

export const DashboardMainFlex = styled.div`
    width:100%;
    height:100vh;
    position:relative;
    top:0;
    left:0;
    display:flex;
    align-items:flex-start;
    gap:0;
`;

export const DashboardMainBody = styled.div`
    width:84%;
    padding:0;
    position:relative;
    left:16%;

    @media (max-width:728px){
        width:100%;
        left:0;
    }
`;

export const AppMainBody = styled.div`
    padding:0 6% 1rem 6%;

    @media (max-width:728px){
        padding:0 5% 1rem 5%;
    }
`

interface DescHeaderProps {
    top?: any;
}

export const DescHeader = styled.div<DescHeaderProps>`
    display:flex;
    align-items:center;
    justify-content:space-between;

    > h3 {
        font-weight: 600;
        font-size: 24px;
        // line-height: 46px;
    }

    @media (max-width:728px){
        flex-wrap:wrap;
        
        > h3 {
            font-size:20px;
        }
    }
`

export const FlexedBtn = styled.div`
    display:flex;
    align-items:Center;
    gap:23px;

    > button {
        padding:10px 30px;
        background: #FFAB01;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        font-size:14px;
        color:#fff;
        display:flex;
        align-items:Center;
        gap:10px;
    }

    @media (max-width:728px){
        
        > button {
            padding:10px 20px;
            font-size:12px;
        }
    }
`

interface InputProp {
    showSearch?: any;
    wrapWidth?: any;
    transform?: string;
}

export const DashboardInput = styled.div<InputProp>`
    width: ${p => p.wrapWidth || '100%'};
    position:relative;
    margin:0 0 1rem 0;

    > label {
        font-weight: 700;
        font-size: 16px;
        line-height: 23px;
        color: #000000;
    }

    > input {
        width:90%;
        display:block;
        padding:15px 5%;
        margin:1rem 0 0 0;
        background: #FFFFFF;
        box-shadow: 0px 4px 20px rgba(94, 132, 194, 0.06);
        border-radius:4px;

        :focus {
          outline: 1px solid #ffab01;
        }
    }

    > i {
        position:absolute;
        top:50%;
        right:5%;
        transform: ${p => p.transform || 'translate(0, -50%)'};
        display: ${p => p.showSearch ? 'block': 'none'};
        cursor:pointer;

        :hover {
            opacity:0.4;
        }
    }

    @media (max-width:728px){
        width:100%;
    }
`

export const TableWrap = styled.div`
    margin:2rem 0;
    border-radius:30px;
    padding:20px 20px;
    background:#fff;
    position:relative;
    
    @media (max-width:728px){
        width:90%;
        padding:20px 5%;
        overflow:auto;
        border-radius:4px;
    }
`

interface TableFlexProp {
    useCursor?: boolean;
}

export const HeroCover = styled.div`
    position:absolute;
    width:100%;
    height:3rem;
    top:-1.8rem;
    left:0;
    background: url('/images/mini-bg.png');
    // background-size:cover;
    z-index:-1;
`
export const TableFlex = styled.div<TableFlexProp>`
    display:flex;
    align-items:center;
    justify-content:space-between;
    cursor: ${p => p.useCursor ? 'pointer' : ''};
    margin:0 0 1rem 0;
    padding: 0 1rem 0 0;
    position:relative;

    h3 {
        font-weight: 700;
        font-size: 15px;
        line-height: 23px;
        color: #000000;
        width:100%;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }

    p {
        width:100%;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        font-weight: 400;
        font-size: 13px;
        line-height: 23px;
        color: #000000;
    }

    @media (max-width:728px){  
        width:70rem;
    }
`

export const TableName = styled.div`
    width:25%;
`

export const Role = styled.div`
    width:15%;
`

export const DateWrap = styled.div`
    width:18%;
`

export const SmallTableSpace = styled.div`
    width:7%;
    text-align:center;
`

export const MenuSpace = styled.div`
    width:2%;

    svg {
        cursor:pointer;
    }
`
interface LineProps {
    border?: string;
}

export const Line = styled.hr<LineProps>`
    border:none;
    border-bottom: ${p => p.border || '1px solid #f4f4f4'};
`

// Modal Section

export const ModalWrap = styled.div`
    width:100%;
    height:100%;
    background: rgba(0, 0, 0, 0.8);
    position:fixed;
    top:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1000;

    @media (max-width:728px){
        align-items:flex-start;
    }
`

export const ModalChild = styled.div`
    width:500px;
    max-height:95%;
    overflow-y:auto;
    padding:32px 32px 32px 32px;
    background: #fff;
    box-shadow: 0px 8px 40px rgba(9, 44, 76, 0.16);
    border-radius: 8px;

    > section {
        height:70vh;
        overflow-y:auto;
    }

    > button {
        margin: 1rem 0 0 0;
    }

    @media (max-width:728px){
        width:100%;
        height:100vh;
        max-height:none;
        border-radius:0;
        padding:32px 5% 10px 5%;

        > section{
            height:88vh;
        }
    }
`

export const UnderlayText = styled.p`
    font-weight: 500;
    font-size: 14px;
    color: #5D5B5B;
    margin: 0 0 2rem 0;
`

export const ModalHeader = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    margin: 0 0 2rem 0;

    > h3 {
        width: 80%;
        font-size: 20px;
        font-weight: 600;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #091525
    }
    
    > i {
        cursor:pointer;
    }
`

export const MainModalView = styled.div`
    max-height: 55vh;
    margin:1rem auto;
    overflow:auto;

    > p {
        font-size: 15px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        white-space:pre-line;
        color: #8796AD;
    }

    @media (max-width:728px){
        max-height:65vh;
    }
`
export const BottomButtonWrap = styled.div`
    padding: 20px 0 10px 0;
    background: #fff;
    display:flex;
    justify-content:flex-end;
    border-top: 1px solid #F0F3F6
`;

export const UserFlex = styled.div`
    position:relative;
    display:flex;
    align-items:Center;
    justify-content:space-between;

    > div {
        display:flex;
        align-items:Center;
        gap:10px;
        width:80%;
        border-bottom:0.5px solid #f5f5f5;

        img {
            width:40px;
            height:40px;
            border-radius:50%;
            object-fit:cover;
        }

        h3 {
            font-weight: 600;
            font-size: 14px;
            color: #000000;
        }

        p {
            font-weight: 400;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.8);
            position:relative;
            top:-0.5rem;
        }
    }

`

export const InputField = styled.fieldset`
    width:92%;
    margin: 0 auto;
    border: 1px solid #D1D1D1;
    border-radius: 5px;
    text-align:left;
    margin: 0 0 1rem 0;

    > legend {
        font-size:13px;
        padding:0 0.5rem;
        text-align:left;
        font-weight:500;
        letter-spacing: 0.0125em;
    }

    > input {
        background:transparent;
        border:none;
        padding:0rem 0%;
        font-size:14px;
        text-align:left;
        width:90%;
        color: #a5a5a5;

        @media (max-width:450px){
            font-size:16px;
            padding:0.1rem 0 0.1rem 0.6rem; 
        }
    }

    > select {
        background:transparent;
        border:none;
        padding:0rem 0 0 0.6rem;
        font-size:14px;
        text-align:left;
        width:100%;
        color: #a5a5a5;

        @media (max-width:450px){
            font-size:16px;
            padding:0.1rem 0 0.1rem 0.6rem; 
        }
    }

    > textarea {
        background:transparent;
        border:none;
        padding:0.4rem 0 0 0.6rem;
        font-size:14px;
        text-align:left;
        width:100%;
        color: #a5a5a5;
        height:5rem;
        resize:none;

        @media (max-width:600px){
            font-size:16px;
        }
    }

    @media (max-width:450px){
        width:92%;
    }

    :focus-within{
        border: 1px solid #ffab01;
    }
`

export const UserCard = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding:16px 4%;
    margin: 0 0 1rem 0;
    position:relative;

    > div {
        display:flex;
        align-items:Center;
        gap: 25px 65px;
        flex-wrap:wrap;
    }

    
    @media (max-width:728px){
        
        > div {
            width:94%;
            margin: 1rem 3%;
            gap:25px 20px;
        }
    }
`

interface IconCardProps {
    background: string;
    color: string;
}

export const IconCard = styled.section<IconCardProps>`
    width:50px;
    height:50px;
    background: ${p => p.background};
    border-radius:10rem;
    display:flex;
    align-items:Center;
    justify-content:center;
    color: ${p => p.color};
`

export const BasicFlex = styled.div`
    display:flex;
    align-items:Center;
    justify-content: flex-start;
    gap:20px;
`

export const GreyText = styled.p`
    font-weight: 700;
    font-size: 14px;
    color: #C7C7C7;
`

export const UserProfileCard = styled.div`
    display:flex;
    align-items:Center;
    gap:20px;

    > img {
        width:70px;
        height:70px;
        border-radius:14px;
    }

    > div {
        width: 70%;
        display:grid;
        gap:0;

        > span {
            font-weight: 700;
            font-size: 16px;
            color: #FFAB01;
        }

        > h3 {
            font-weight: 600;
            font-size: 16px;
            color: #2E2E2E;

            @media (max-width:728px){
                line-height:20px;
            }
        }

        > p {
            font-weight: 500;
            font-size: 14px;
            color: rgba(46, 46, 46, 0.7);
            position:relative;
            top:-1rem;
        }
    }

    @media (max-width:728px){
        width:70%;
    }
`

export const GridTexts = styled.div`
    position:relative;

    > p {
        font-weight: 500;
        font-size: 13px;
        color: #969BA0;
    } 

    > h3 {
        font-weight: 600;
        font-size: 16px;
        color: #000000;
    }

    @media (max-width:728px){
        width:45%;
    }
`

export const BalanceCard = styled.div`
    padding: 5px 15px;
    border: 0.4px solid #4DC736;
    border-radius: 18px;
    display:Flex;
    align-items:center;
    gap:10px;
`

export const HeaderItems = styled.div`
    display:flex;
    align-items:Center;
    gap:10px;

    @media (max-width:728px){
        flex-wrap:wrap;
        margin:2rem 0 0 0;
        gap:5px 20px;
    }
`

export const FilterSelect = styled.select`
    width:auto;
    background: #F8F9F9;
    padding:6px 7px;
    text-align:left;
    border-radius:200px;

    @media (max-width:728px){
        width:auto;
        padding:6px 9px;
    }
`

export const IconBtn = styled.div<IconCardProps>`
    width:50px;
    height:50px;
    background: ${p => p.background};
    border-radius:8px;
    display:flex;
    align-items:Center;
    justify-content:center;
    color: ${p => p.color};
`

interface TypoProps {
    color?: string;
    fontSize?: string;
    fontWeight?: number;
    lineHeight?: string;
    align?: string;
    margin?: string;
    top?: string;
    mobileFontSize?: string;
}

export const TypographyStyle = styled.p<TypoProps>`
    color: ${p => p.color || '#000'};
    font-size: ${p => p.fontSize || '14px'};
    font-weight: ${p => p.fontWeight || 400};
    line-height: ${p => p.lineHeight || '20px'};
    text-align: ${p => p.align || 'left' };
    margin: ${p => p.margin || '0' };
    top: ${p => p.top || '0' };
    position:relative;

    @media (max-width: 728px){
        font-size: ${p => p.mobileFontSize};
    }
`

interface StatusProps {
    bg: string | undefined;
    color: string | undefined;
    border: string | undefined;
}


export const StatusCard = styled.p<StatusProps>`
    width:auto;
    background: ${p => p.bg};
    color: ${p => p.color};
    border: 1px solid ${p => p.border || ''};
    font-size:12px;
    text-align:center;
    display: inline-block;
    border-radius: 4px;
    padding: 6px 10px;
    border-radius: 100px;
    text-transform: capitalize;
    font-weight: 500;
`

export const GenericInputWrap = styled.div`
    position:relative;

    > label {
        font-size:14px;
        color: #474747;
    }

    > input {
        display:block;
        width:96%;
        padding:20px 2%;
        margin: 1rem 0 0 0;
        border: 1px solid #E7E8EB;
        border-radius: 4px;
    }
`
export const SpaceWrap = styled.section`
    margin:3rem 0 0 0;
    padding:0 5%;
`
export const ThreeSpaceGridWrap = styled.section`
    display:flex;
    align-items:Center;
    justify-content:space-between;
    margin:-2rem 0 0 0;

    > div {
        flex:1;

        > h4 {
            font-weight: 600;
            font-size: 16px;
            line-height: 10px;
            letter-spacing: 0.005em;
            color: #000000;
        }
    }

    @media (max-width:728px){
        flex-direction:column;
        align-items:flex-start;
        margin:0;

        > div > div {
            margin:0;
            width:100%;
        }

        div {
            width:100%;
        }
    }
`

export const MenuPopUp = styled.div`
    position:absolute;
    bottom:0;
    right:0rem;
    padding:0px 35px;
    background: #FFFFFF;
    box-shadow: 0px 8px 40px rgba(9, 44, 76, 0.16);
    border-radius: 4px;
    z-index:100;

    > p {
        font-weight: 300;
        font-size: 13px;
        color: #474747;
        cursor:pointer;
    }
`

export const AccountGrid = styled.div`
    display:grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows:auto;
    gap:25px 48px;

    @media (max-width:728px){
        grid-template-columns: repeat(2, 1fr);
        gap:20px 10px;
    }
`

interface AccountCardProps {
    bg: string;
    color: string;
    border: string;
}

export const AccountCard = styled.div<AccountCardProps>`
    background: ${p => p.bg || '#FFFFFF'};
    border: ${p => p.border || '1px solid #474747'};
    color: ${p => p.color || '#161616'};
    border-radius: 4px;
    padding:0.7rem;
    font-size:13px;
    cursor:pointer;
`

export const DocumentCard = styled.img`
    width:20rem;
    height:auto;
    object-fit:contain;
`

export const GridPaddedSpace = styled.div`
    width: 80%;

    > div {
        margin: 2rem 0;
    }

    @media (max-width:728px){
        width: 100%;
    }
`

export const ButtonFlex = styled.div<FlexProps>`
    display:flex;
    align-items: ${p => p.vAlign || 'Center'};
    justify-content: ${p => p.hAlign || 'flex-start'};
    gap: ${p => p.gap || '12px'};
    margin: ${p => p.margin || '0'};

    @media (max-width: 728px){
        flex-direction: ${p => p.mobileDirection || 'row'};
    }
`

interface MainWrapProps {
    top?: string;
    width?: string;
    maxWidth?: string;
}

export const MainWrap = styled.div<MainWrapProps>`
    width: ${p => p.width || '80%'};
    max-width: ${p => p.maxWidth || '996px'};
    margin: ${p => p.top || '3rem'} auto 0 auto;

    @media (max-width:728px){
        width:90%;
        max-width: 90%;
        margin: ${p => p.top || '3rem'} auto 3rem auto;
    }
`;

export const PropertyWrap = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    margin:3rem auto;
    gap:48px;

    @media (max-width:728px){
        grid-template-columns: repeat(1, 1fr);
    }
`
interface RandomCircleProps {
    size?: string;
    bg?: string;
    color?: string;
}

export const RandomCircle = styled.div<RandomCircleProps>`
    width: ${p => p.size || '30px'};
    height: ${p => p.size || '30px'};
    background: ${p => p.bg || '#f8f9f9'};
    color: ${p => p.color || '#000'};
    border-radius: 100rem;
    display:Flex;
    align-items:center;
    justify-content:Center;

    > img {
        width:100%;
        object-fit:cover;
        border-radius: 50%;
    }
`

export const BreadcrumbArea = styled.div`
    width: 90%;
    max-width: 654px;
    margin: 0 auto;
`

interface FlexProps {
    vAlign?: string;
    hAlign?: string;
    gap?: string;
    margin?: string;
    wrap?: string;
    width?: string;
    canHover?: boolean;
    mobileDirection?: string;
}

export const IconFlex = styled.div<FlexProps>`
    display:flex;
    align-items: ${p => p.vAlign || 'Center'};
    justify-content: ${p => p.hAlign || 'flex-start'};
    gap: ${p => p.gap || '4px'};
    margin: ${p => p.margin || '0'};
`

export const BoxFlex = styled.div<FlexProps>`
    width: ${p => p.width || '100%'};
    display:flex;
    align-items: ${p => p.vAlign || 'Center'};
    justify-content: ${p => p.hAlign || 'flex-start'};
    gap: ${p => p.gap || '4px'};
    margin: ${p => p.margin || '0'};
    flex-wrap: ${p => p.wrap || 'wrap'};
    cursor: ${p => p.canHover && 'pointer'};
    position: relative;

    :hover {
        opacity: ${p => p.canHover ? '0.6' : '1'};
    } 
`

export const PageToggleHeader = styled.div<FlexProps>`
    margin: 5px 0 0 0;
    display:flex;
    align-items:center;
    justify-content: ${p => p.hAlign || 'flex-start'};
    gap: ${p => p.gap || '10px'};


    @media (max-width:728px){
        padding: 0 0px;
        flex-wrap: wrap;
        margin: 15px 0 15px 0;
    }
`

interface PageToggleTextProps {
    active?: boolean;
}
export const PageToggleText = styled.p<PageToggleTextProps>`
    color: ${p => p.active ? '#fff' : 'var(--text-black)'};
    border: ${p => p.active ? 'none' : '1px solid #E1E1E1'};
    background: ${p => p.active ? 'var(--primary-color)' : 'transparent'};
    padding: 6px 14px 4px 14px;
    font-size: 12px;
    border-radius: 20px;
    cursor:pointer;

    : hover {
        opacity:0.6;
    }

    @media (max-width:728px){
        font-size: 11px;
        padding:4px 10px 4px 10px;
    }
`

export const PageListItemWrap = styled.div`
    display: flex;
    align-items:Center;
    justify-content:space-between;
    flex-wrap:wrap;
    padding: 0 0 16px 0;
    margin: 0 0 16px 0;
    border-bottom: 1px solid #EDF3FC
`

interface PageListItemProps {
    width?: string;
}

export const PageListItem = styled.div<PageListItemProps>`
    width:  ${p => p.width || '100%'};
    
    h3 {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: -0.02em;
        color: #091525;
        margin:12px 0 0 0;
    }

    > p {
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
        letter-spacing: -0.01em;
        color: #7081A0;
    }
`
