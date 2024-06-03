import styled from 'styled-components';

export const EmptyMainWrap = styled.div`
    position:relative;
    display:flex;
    align-items:center;
    justify-content:Center;
    margin:5rem 0 2rem 0;

    > div {
        display:flex;
        flex-direction:column;
        align-items:Center;
        gap:20px;
    }
`

interface ImgProps {
    width: string
}

export const EmptyImage = styled.img`
    width: ${p => p.width || '6rem'};
`