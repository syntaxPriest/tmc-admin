import React from 'react';
import { ErrorWrap } from '../../styles/reusable';
import * as Icon from 'iconsax-react';

interface PropsArgs {
    message: string;
    extraText?: string;
    color?: string;
    bg?: string;
    border?: string;
}

const Error = ({extraText, message, bg, border, color} : PropsArgs) => {
    return(
        <>
            <ErrorWrap
                bg={bg}
                border={border}
                color={color}
            >
                <p className='!font-bold'>
                    {message}
                </p>
                <span className="text-[12px] !leading-1">{extraText}</span>
            </ErrorWrap>
        </>
    )
}

export default Error;