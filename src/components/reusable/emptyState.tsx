import React from 'react';
import { EmptyImage, EmptyMainWrap } from '../../styles/reusable/emptyState';

interface PropsArgs {
    noShowText?: boolean;
    imgSize?: string;
    text?: string;
    img?: string;
}

const EmptyState = ({noShowText, imgSize, img, text}: PropsArgs) => {
    return(
        <>
            <EmptyMainWrap>
                <div>
                    <EmptyImage 
                        src={img ? img : '/images/empty.png'}
                        alt='Empty Icon'
                        width={imgSize}
                    />
                    {
                        !noShowText ?
                            <p className='text-[#898579]'>{text ? text : "Nothing to show!"}</p>
                        : null
                    }
                </div>
            </EmptyMainWrap>
        </>
    )
}

export default EmptyState;