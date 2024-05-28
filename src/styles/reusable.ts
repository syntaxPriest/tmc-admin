import styled from "styled-components";


interface PropsArgs {
    bg?: string;
    width?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    top?: string;
}

export const Button = styled.button<PropsArgs>`
    background: ${p => p.bg || 'transparent'};
    color: ${p => p.color || 'var(--text-black)'};
    border: ${p => p.border || 'none'};
    padding: ${p => p.padding || '12px 20px'};
    border-radius:  ${p => p.borderRadius || '10px'};
    width: ${p => p.width || 'auto'};
    margin-top: ${p => p.top || '10px'};
    font-size:15px;
    font-weight:600;
    display:flex;
    align-items:Center;
    justify-content:center;
    gap:5px;
    position:relative;
`;

export const ErrorWrap = styled.div<PropsArgs>`
    width:100%;
    padding:12px 4%;
    margin:1rem 0;
    border: ${p => p.border || '0.5px solid #D23B3B'};
    border-radius: 8px;
    color: ${p => p.color || '#D23B3B'};
    background: ${p => p.bg || '#FFF2F0'};

    > p {
        font-weight: 400;
        font-size: 13px;
        line-height: 21px;
        letter-spacing: 0.0125em;

        @media (max-width:728px){
            line-height:24px;
        }
    }

    @media (max-width:728px){
        align-items:flex-start;
    }
`