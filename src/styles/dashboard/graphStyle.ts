import styled from "styled-components";

export const MainGraphWrap = styled.div`
    position:relative;
    margin:6rem 0;

    @media (max-width:728px){
        margin: 3rem 0;
    }
`

export const SmallGraphGrid = styled.div`
    display:grid;
    grid-template-rows:auto;
    grid-template-columns: repeat(4, 1fr);
    gap:20px;

    @media (max-width:728px){
        grid-template-columns: repeat(2, 1fr);
    }
`

export const BigCardsGrid = styled.div`
    display:grid;
    grid-template-rows:auto;
    grid-template-columns: repeat(2, 1fr);
    gap:20px;

    @media (max-width:728px){
        grid-template-columns: repeat(1, 1fr);
    }
`
interface GraphProps {
    margin?: string;
}

export const GraphCard = styled.div<GraphProps>`
    padding: 2rem;
    margin: ${p => p.margin || '0 0 0rem 0'};
    background: var(--main-bg);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    position:relative;

    p {
        font-weight: 400;
        font-size: 12px;
        color: #A5A5A5;

        > span {
            line-height:20px;
        }
    }

    h1 {
        font-weight: 700;
        font-size: 34px;
        color: #202020;
    }

    h3 {
        font-weight: 700;
        font-size: 20px;
        line-height: 3px;
        color: #202020;
    }

    h4 {
        font-size: 18px;
        color:#000;
        font-weight:600;
    }

    > img {
        width:100%;
    }
`

export const GraphTopImage = styled.div`
    width:10rem;
    height:10rem;
    position:absolute;
    top:0;
    right:0;
    z-index:1;

    > img {
        width:100%;
    }
`

export const TopRight = styled.div`
    position: absolute;
    top:1rem;
    right:1rem;
`