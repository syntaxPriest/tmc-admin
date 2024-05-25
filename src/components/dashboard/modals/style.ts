import styled from "styled-components";

export const ModalImageWrap = styled.div`
    position:relative;
    width: 100%;
`

export const FullImageDisplay = styled.div`
    height: 100%;
    width: 100;
    display:flex;
    justify-content:center;
    align-items:Center;
    position:relative;

    > img {
        width: 55%;
        height: 70%;
        object-fit:contain;
    }
`

export const BottomDownloadBtn = styled.section`
    position:absolute;
    top: 0rem;
    top: 75%;
    width: auto;
    z-index: 2000000000000000000000000;
`