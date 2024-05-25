import React from 'react';
import { EmptyMainWrap } from '../../styles/reusable/emptyState';
import { BounceLoader } from 'react-spinners';

interface PropsArgs {
    text?: string;
}

const Loader = ({text}: PropsArgs) => {
    return(
        <>
            <EmptyMainWrap>
                <div>
                    <BounceLoader size={75} color='#ffab01' />
                    <p>
                        {text ? text : 'Fetching Data...'}</p>
                </div>
            </EmptyMainWrap>
        </>
    )
}

export default Loader;