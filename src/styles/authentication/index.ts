import styled from "styled-components";

export const MainWrap = styled.div`
    width:100%;
    height:100vh;
    position:relative;

    @media (max-width: 728px){
        height:auto;
    }
`;

export const AuthFlex = styled.div`
    display:flex;
    justify-content:Center;
    gap:0;
`

export const AuthLeft = styled.div`
    flex:2;
    background: url('/images/auth-frame.png');
    background-size:cover;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    color:#fff;
    padding:0 5%;
    gap:40px;

    > h3 {
        font-weight: 700;
        font-size: 30px;
    }

    @media (max-width:728px){
        display:none;
        height: auto;
    }
`

export const AuthImage = styled.img`
    width:320px;
    display:block;
    margin: 0 auto;
`

export const AuthLogoImage = styled.img`
    width:7rem;
    position:absolute;
    bottom:2rem;
    left:5%;
`

export const AuthCenter = styled.form`
    background: var(--main-bg);
    padding:7rem 0 1rem 0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
    width: 100%;
    max-width: 330px;

    > div {
        width:100%;

        > h3 {
            font-weight:600;
            font-size:30px;
            margin-bottom:15px;
        }
    }

    @media (max-width:728px){
        flex:1;
        height:auto;
        align-items:flex-start;
        padding: 0 5% 20px 5%;

        > div {
            width:100%;
            margin-top:5rem;

            > h3 {
                // text-align:center;
                margin-top:20px;
            }
        }
    }
`

export const AuthLogoTop = styled.img`
    display:none;
    position:absolute;
    top:1rem;
    left:5%;
    width:8rem;

    @media (max-width:728px){
        display:block;
    }
`

export const InputWrap = styled.form`
    width:100%;
    margin:0rem 0;
    display:flex;
    justify-content:space-between;
    flex-wrap: wrap;

    > button {
        width:100%;
        margin:10px 0 0 0;
    }
`

interface InputWrapProps {
    width?: string;
    margin?: string;
    shouldNotFocus?: boolean;
}

export const InputField = styled.div<InputWrapProps>`
    width: ${p => p.width || '100%'};
    margin: 0 auto;
    text-align:left;
    margin: ${p => p.margin || '0 0 1rem 0'};
    position:relative;

    > p {
        font-size:13px;
        text-align:left;
        font-weight:400;
        margin: 0 0 3.5px 0;
        letter-spacing: 0.0125em;
    }

    > input {
        background:#fff;
        padding:12px 12px;
        font-size:14px;
        text-align:left;
        border: 1px solid #E5DFD9;
        box-shadow: 0px 4px 8px 0px #0000000A;
        border-radius:8px;
        width:100%;
        color: #1B2229;
        outline:none;

        @media (max-width:728px){
            font-size:16px;
            // padding:0.1rem 0 0.1rem 0.6rem; 
        }
    }

    > textarea {
        background:#fff;
        padding:12px 12px;
        font-size:14px;
        text-align:left;
        border: 1px solid #E5DFD9;
        box-shadow: 0px 4px 8px 0px #0000000A;
        border-radius:8px;
        width:100%;
        color: #1B2229;
        outline:none;
        resize:none;

        @media (max-width:728px){
            font-size:16px;
            // padding:0.1rem 0 0.1rem 0.6rem; 
        }
    }

    > select {
        background:#fff;
        padding:14.5px 4%;
        font-size:14px;
        text-align:left;
        border: 1px solid #E5DFD9;
        box-shadow: 0px 4px 8px 0px #0000000A;
        border-radius:8px;
        width:100%;
        color: #1B2229;
        outline:none;

        @media (max-width:728px){
            font-size:16px;
            // padding:0.1rem 0 0.1rem 0.6rem; 
        }
    }

    > i {
        position:absolute;
        top:50%;
        right:3%;
        transform: tramslate(0, -50%);
        cursor:pointer;
    }
`

export const AuthText = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 148%;
    letter-spacing: 0.0125em;
    color: #474747;

    > span {
        color: var(--primary-color);
    }
`;

export const BlueText = styled.p`
    text-align:center;
    margin:2rem 0 0 0;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 148%;
    text-align: center;
    letter-spacing: 0.0125em;
    color: #216FED;
`

export const PinFlex = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:Center;
    margin:2rem 0;

    > p {
        font-size:25px;
        position:relative;
        top:-1.2rem;
    }

    > div {
        width:45%;

        > p {
            font-weight: 600;
            font-size: 12px;
            color: #5D5B5B;
        }
    }
`;

export const PinInputWrap = styled.div`
  display: flex;
  align-items: Center;
  justify-content: center;
  margin: 3rem auto 1rem auto;
  padding: 0 0 1.5rem 0;
`;

export const AuthImageTop =styled.img`
    position:relative;
    width:5rem;
    display:block;
    margin:2rem auto;
`

export const AuthHeader = styled.div`
    padding: 20px 5%;
    background: #fff;
    border-bottom: 1px solid #F0F3F6;
`

export const AuthHeaderImg = styled.img`
    width: 7rem;
`
interface LoneWrapProps {
    width?: string;
    textAlign?: string;
    showBorder?: boolean;
}

export const LoneWrap = styled.form<LoneWrapProps>`
    margin: 3rem auto;
    width: ${p => p.width || '414px'}; 
    padding: 28px 32px;
    text-align: ${p => p.textAlign || 'center'};
    border: ${p => p.showBorder ? '1px solid #EDF3FC' : 'none'};
    box-shadow: ${p => p.showBorder ? '0px 8px 16px 0px #F4F8FD' : 'none'};
    border-radius:20px;
    // background: linear-gradient(0deg, #EDF3FC, #EDF3FC), linear-gradient(0deg, #FFFFFF, #FFFFFF);
    
    > h3 {
        color: #091525;
        font-size:30px;
        font-weight:600;
        line-height:30px;
        margin:1rem 0 0 0;
    }

    > p {
        position:relative;
        color: #012F65;
        font-size:15px;
        font-weight:400;
        // top:0.5rem;
        margin:0.5rem 0 2rem 0;
        line-height:21px;
    }

    @media (max-width:728px){
        width:100%;
        padding:28px 5%;
        margin:1.5rem auto 0 auto;
        border:none;
        box-shadow:none;
    }
`
interface TypoProps {
    color?: string;
    fontSize?: string;
    fontWeight?: number;
    lineHeight?: string;
    align?: string;
    margin?: string;
}

export const LinkText = styled.h5<TypoProps>`
    color: ${p => p.color || '#000'};
    font-size: ${p => p.fontSize || '14px'};
    font-weight: ${p => p.fontWeight || 400};
    line-height: ${p => p.lineHeight || '20px'};
    text-align: ${p => p.align || 'left' };
    margin: ${p => p.margin || '0' };
`

export const AuthBacknav = styled.div`
    padding: 7px 10px;
    display:flex;
    align-items:Center;
    gap:5px;
    border-radius:100px;
    background: #F8F9F9;
    width: fit-content;
    cursor:pointer;

    > p {
        // width: auto;
        font-weight:500;
        color: #1B2229;
        font-size:14px;
    }
`