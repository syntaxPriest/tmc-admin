import React, { useState } from 'react';
import { Line } from '../../styles/reusable/index';
import { LineBoxWrap } from './style';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import CopiedNotifier from '../reusable/clipboard';
import { copyText } from '../../utils/copyText';
import Typography from '../reusable/typography';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import commaNumber from 'comma-number';

interface PropsArgs {
    paymentOption?: string; 
    amount?: string | number;
}

const AccInfoComp = ({paymentOption, amount} : PropsArgs) => {
    const wallet = useCurrentUser()?.wallet;
    const [copied, setCopied] = useState(false);

    return(
        <>
            {
                copied ?
                    <CopiedNotifier />
                    : null
            }
            {
                paymentOption !== 'custom' &&
                    <>
                        <Typography 
                            text={`₦${commaNumber(Number(amount))}`}
                            color='#091525'
                            fontWeight={700}
                            fontSize='24px'
                            lineHeight='26.5px'
                            align='center'
                        />
                        <Typography 
                            text='Send required amount to your Budpay Wallet'
                            color='#616161'
                            fontWeight={400}
                            fontSize='15px'
                            lineHeight='21px'
                            margin='0.5rem 0 2rem 0'
                            align='center'
                        />
                    </>
            }
            <LineBoxWrap>
                <div>
                    <div>
                        <p>Bank</p>
                        <h3>{wallet?.bank_name}</h3>
                    </div>
                </div>
                <Line />
                <div>
                    <div>
                        <p>Account number</p>
                        <h3>{wallet?.account_number}</h3>
                    </div>
                    <i>
                        <DocumentDuplicateIcon 
                            className='w-5 h-5' 
                            color='#8796AD' 
                            onClick={() => copyText({setCopied, text: wallet?.account_number})}
                        />
                    </i>
                </div>
                <Line />
                <div>
                    <div>
                        <p>Account name</p>
                        <h3>{wallet?.account_name}</h3>
                    </div>
                </div>
            </LineBoxWrap>
        </>
    )
}

export default AccInfoComp;