import React from 'react';
import { ErrorWrap } from '../../styles/reusable';
import * as Icon from 'iconsax-react';

interface PropsArgs {
    message: string;
    color?: string;
    bg?: string;
    border?: string;
}

const Error = ({message, bg, border, color} : PropsArgs) => {
    return(
        <>
            <ErrorWrap
                bg={bg}
                border={border}
                color={color}
            >
                <Icon.InfoCircle />
                <p>
                    {message}
                </p>
            </ErrorWrap>
        </>
    )
}

export default Error;