import styled from "styled-components";

export const DashboardFlex = styled.div`
    display:Flex;
    align-items:flex-start;
    justify-content:Center;
    margin: 0 auto;
`

export const DashboardMain = styled.div`
    width: 78%;
    max-width:1040px;
    position:relative;
    left: 1.9%;
    top: 2rem;
    padding: 32px 24px;

    @media (max-width: 728px){
        top:0;
        left:0;
        width: 100%;
        max-width: 728px;
        padding: 0 0 20px 0;
    }
`;

interface QuickActionProps {
    mobileDisplay?: string;
}

export const QuickActionWrap = styled.div<QuickActionProps>`
    width:21.1%;
    max-width: 219px;
    padding: 32px 0;
    position: sticky;
    height:100vh;
    top:0;
    left:0;
    border-left: 1px solid #F0F3F6;
    overflow-y:auto;

    @media (max-width:728px){
        display: ${p => p.mobileDisplay || 'none'};
        position:fixed;
        width:100%;
        height:100%;
        z-index:10000;
        padding: 1rem 10% 3rem 10%;
    }
`

export const QuickItem = styled.div`
    display:flex;
    align-items:Center;
    justify-content:space-between;
    padding:16px 0 16px 16px;
    cursor:pointer;
    position:relative;
    border-bottom: 1px solid #F8F9F9;

    > div {
        width: 100%;
        display:flex;
        align-items:Center;
        justify-content:space-between;
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
interface DashboardHeaderProps {
    padding?: string;
}

export const DashboardHeader = styled.div<DashboardHeaderProps>`
    background: #fff;
    padding: ${p => p.padding || '32px 0'};
    position:sticky;
    top:0;
    left:0;
    z-index:1;
    display: flex;
    align-items:center;
    justify-content: space-between;

    @media (max-width: 728px){
        padding: 25px 0;
    }
`

export const CardGrid = styled.div`
    padding: 24px 24px 12px 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows:auto;
    grid-gap: 16px;
    margin: 1rem 0 0 0;

    @media (max-width: 728px){
        grid-template-columns: repeat(1, 1fr);
        padding: 12px 0;
    }
`
interface DashboardProps {
    bg?: string;
    color?: string; 
}

export const DashboardCard = styled.div<DashboardProps>`
    border-radius:12px;
    padding: 16px;
    border: 1px solid #F0F3F6;
    color: ${p => p.color || '#091525'};
    background: ${p => p.bg || '#fff'};

    > h3 {
        font-family: Livvic;
        font-size: 15px;
        font-weight: 600;
        line-height: 17px;
        letter-spacing: 0em;
    }

    > p {
        font-size: 18px;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 0em;
        margin:1.3rem 0 0 0;
    }

    > div i {
        cursor:pointer;
    }
`

export const RecentSection = styled.div`
    margin: 0 0 0rem 0;
    padding:32px 24px 0 24px;

    @media (max-width: 728px){
        padding: 24px 0 0 0;
    }
`

export const ProgressBar = styled.div`
  width: 100%;

  > progress[value] {
    width:100%;
    height: 0.5rem;
    margin: 0;
    background: red;
    border-radius: 100px;
  }

  > progress[value]::-webkit-progress-bar {
    border-radius: 100px;
    background: #F8F9F9;
  }

  > progress[value]::-webkit-progress-value {
    border-radius: 100px;
    background: #09A060;
  }

  > progress[value]::-moz-progress-bar {
    border-radius: 100px;
    background: #09A060;
  }
`
interface DashboardInnerProps{
    padding?: string;
}

export const DashboardInner = styled.div<DashboardInnerProps>`
  padding: ${p =>p.padding || '40px 0px'};

  @media (max-width:728px){
    padding: 5px 0;
}
`

export const SavedWrap = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    margin:3rem auto;
    gap:48px;

    @media (max-width:728px){
        grid-template-columns: repeat(1, 1fr);
    }
`

export const SavedSearchSection = styled.div`
    padding: 12px 32px;
    border-bottom: 1px solid #F0F3F6;
    
    > div {
        position:relative;

        > i {
            position: absolute;
            top: 50%;
            left: 0px;
            transform: translate(0, -50%);
        }

        > input {
            border:none;
            outline:none;
            padding-left: 26px;
        }
    }

    @media (max-width:728px){
        padding: 12px 0;
    }
`


export const WalletCard = styled.div`
    max-width: 500px;
    padding: 20px 24px;
    border-radius: 16px;
    gap: 8px;
    background: #012F65;
    margin: 2rem auto 0 auto;
`

export const TransactionCardWrap = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #EDF3FC;
    cursor: pointer;

    :hover {
        opacity: 0.6;
    }
`

export const ProfileBoxWrap = styled.div`
    width: 90%;
    max-width: 685px;
    margin: 0 auto;
    border-radius: 20px;
    padding: 0;

    @media (max-width:728px){
        width: 100%;
    }
`

export const ProjectProgressWrap = styled.div`
    position:relative;
`
export const ProjectProgressFlex = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`

export const Numbering = styled.p`
    padding: 3px 15px;
    background: #161616;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    border-radius: 50px;
`

export const VerticalAlign = styled.div`
    width: 3px;
    height: 100%;
    margin: 5px 0 0 0;
    background: #161616;
    border-radius: 50px;
`

export const ProjectProgressImgFlex = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap:wrap;
    margin: 20px 0 0 0;

    > img {
        width: 72px;
        height: 72px;
        object-fit:cover;
        border-radius: 12px;
        cursor:pointer;

        :hover {
            opacity: 0.3;
        }
    }
`
export const SearchInput = styled.div`
    position:relative;
    width: 250.17px;

    :focus-within{
        outline:1px solid var(--primary-color);
    }

    > input {
        width: 100%;
        max-width: 300px;
        border-radius: 10px;
        border: 1px solid #E1E1E1;
        padding:13px 18% 13px 20%;
    }

    > i:first-child {
        position:absolute;
        left:1.3rem;
        margin-top:-2px;
        top:50%;
        transform: translate(0, -50%);
    }
`