import styled from "styled-components";

export const PropertyImagesWrap = styled.div`
    margin: 4rem auto;
    width: 100%;
    overflow:auto;
    height:430px;

    > div {
        width: auto;
        display:Flex;
        align-items:flex-start;
        gap:16px;

        > img {
            height: 420px;
            border-radius:20px;
            object-fit:cover;
        }
    }

    &::-webkit-scrollbar {
        width: 7px;
        border-radius: 1rem;
        display:none;
    }

    &:-webkit-scrollbar-track {
        background: none;
        display:none;
    }

    &::-webkit-scrollbar-thumb {
        background: #ababab;
        border-radius: 5px;
        cursor:pointer;display:none;
        display:none;
    }

    @media (max-width:728px){
        height:350px;

        > div {
            > img {
                height:340px;
            }
        }
    }
`

export const DualPropertySection = styled.div`
    display:flex;
    align-items:flex-start;
    gap: 72px;

    > div:first-child {
        flex:26;
        border-radius: 20px;
    }

    > div:nth-child(2) {
        flex:14;
        border-radius: 20px;
    }

    @media (max-width:728px){
        flex-direction:column;
        gap:30px;
        
        > div:first-child {
            flex:1;
        }
    
        > div:nth-child(2) {
            flex:1;
            width:100%;
            border-top: 1px solid #EDF3FC;
        }
    }
`

export const DualCard = styled.div`
    flex: 1;
    background: #f8f9f9;
    padding: 16px;
    border-radius: 12px;

    > p {
        font-weight:400;
        font-size:14px;
        color: #1B2229;
        margin: 8px 0 0 0;
    }
`

export const DualFeatures = styled.div`
    width: 49%;
    display:Flex;
    align-items:Center;
    border-radius: 12px;
    gap:8px;

    > p {
        font-weight:400;
        font-size:14px;
        color: #1B2229;
    }
`

export const AboutSection = styled.div`
    margin: 4rem 0;
    
    > h3 {
        font-size: 24px;
        font-weight: 600;
        line-height: 30px;
        letter-spacing: 0em;
    }

    > p {
        margin:25px 0 0 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 25px;
        letter-spacing: 0em;
        white-space:pre-line;
    }
`

export const PostedBySection = styled.div`
    display:flex;
    align-items:Center;
    justify-content:space-between;
    padding: 20px 0;
    border-top: 1px solid #EDF3FC;

    > div {
        position:Relative;

        > h3 {
            font-size: 15px;
            font-weight: 600;
            line-height: 19px;
            margin: 4px 0 0 0;
            letter-spacing: -0.02em;
        }
    
        > p {
            font-size: 12px;
            font-weight: 500;
            line-height: 15px;
            letter-spacing: -0.02em;
            color: #091525;
        }
    }
`;

export const SimilarListingCard = styled.div`
    margin: 8rem 0 0 0;

    @media (max-width:728px){
        margin:3rem 0 4rem 0;
    }
` 

export const CarouselWrap = styled.div`
    margin:4rem 0 0 0;
`

export const CalculatorFlex = styled.div`
    display:Flex;
    align-items:flex-start;
    justify-content:space-between;

    > div:first-child{
        width: 358px;
    }

    > div:nth-child(2){
        width: 400px;
        padding:48px 32px 38px 32px;
        border: 1px solid #EDF3FC;
        box-shadow: 0px 8px 16px 0px #F4F8FD;
        border-radius:20px;
    }

    @media (max-width:728px){
        flex-direction:column;

        > div:first-child{
            width: 100%;
        }
    
        > div:nth-child(2){
            width: 100%;
            margin:4rem 0;
            padding:48px 5% 38px 5%;
        }
    }
`;

export const CalcDetailsWrap = styled.div`
    margin:1.5rem 0;
`;

export const LineFlex = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    color: #091525;
    padding:15px 0; 

    > p {
        font-size: 15px;
        font-weight: 400;
        line-height: 21px;
        letter-spacing: 0em;
    }

    > h3 {
        font-size: 15px;
        font-weight: 600;
        line-height: 21px;
        letter-spacing: 0em;
    }
`

export const LineBoxWrap = styled.div`
    border: 1px solid #EDF3FC;
    border-radius: 12px;
    margin: 0 0 2rem 0;

    > div {
        display:Flex;
        align-items:flex-end;
        justify-content:space-between;
        padding: 14px 16px;

        i {
            cursor:pointer;
        }

        > div {
            position:relative;
            text-align:left;

            > h3 {
                font-size: 15px;
                font-weight: 600;
                line-height: 21px;
                letter-spacing: 0em;
            }

            > p {
                font-size: 15px;
                font-weight: 400;
                line-height: 21px;
                letter-spacing: 0em;
            }
        }
    }
`

export const PlanWrap = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    margin:3rem auto;
    gap:24px;

    @media (max-width:728px){
        grid-template-columns: repeat(1, 1fr);
    }

    > div:nth-child(2){
        border-top: 8px solid var(--primary-color);
    }
`

export const PlanCard = styled.div`
    border: 1px solid #EDF3FC;
    box-shadow: 0px 8px 16px 0px #F4F8FD;
    border-radius: 20px;
    padding: 32px 24px 100px 24px;
    position:relative;
    cursor: pointer;

    h3 {
        font-size: 18px;
        color: #091525;
        font-weight: 600;
        line-height: 22.6px;
    }

    > button {
        position: absolute;
        bottom: 2rem;
        left:50%;
        right:0;
        transform: translate(-50%, 0);
        margin: 0 auto;
    }
`

export const SelectUnitFlex = styled.div`
    display: flex;
    align-items:flex-start;
    justify-content: center;
    gap: 60px;

    @media (max-width:728px){
        flex-direction: column;
    }
`

export const PlanImagesWrap = styled.div`
    width: 500px;

    @media (max-width:728px){
        width: 100%;
    }
`

export const SelectBlockWrap = styled.div`
    width: 484px;
    padding: 16px 24px;
    border: 1px solid #EDF3FC;
    box-shadow: 0px 8px 16px 0px #F4F8FD;
    background: #fff;
    border-radius: 16px;
    position: relative;

    @media (max-width:728px){
        width: 100%;
        border: none;
        box-shadow: none;
        padding: 16px 0;
        overflow: auto;
    }
`

export const MainUnitGridWrap = styled.div`
    width: 100%;
    max-height: 40rem;
    overflow: auto;

    @media (max-width: 728px){
        width: 335px;

        > div {
            width: 40rem;
        }
    }
` 

export const BlockGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    margin: 0 0 2rem 0;
    grid-gap: 12px;
`
interface BlockrepProps {
    bg?: string;
    width?: string;
    border?: string;
}

export const BlockRep = styled.div<BlockrepProps>`
    // display: block;
    border: ${p => p.border || '1px solid #F0F3F6'};
    box-shadow: 0px 4px 4px 0px #F4F8FD;
    border-radius: 8px;
    padding: 10px;
    text-align:center;
    font-size: 15px;
    color: #245372;
    font-weight: 400;
    background: ${p => p.bg || '#fff'};
    width: ${p => p.width || 'auto'};
    cursor:pointer;
`