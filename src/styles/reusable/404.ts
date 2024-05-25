import styled from "styled-components";

export const MainWrapper = styled.div`
    positon:fixed;
    top:0;
    left:0;
    background:#fff;
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
`

export const InnerWrapper = styled.div`
    width:auto;
    padding:2rem;
    text-align:center;
    display:flex;
    flex-direction:column;
    justify-content:center;

`

export const NotFoundImage = styled.img`
    width:20rem;
    display:block;
    margin:0 auto;

    @media (max-width:728px){
        width:15rem;
    }
`