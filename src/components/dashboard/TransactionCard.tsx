import React from 'react';
import { TransactionCardWrap } from './style';
import { BoxFlex } from '../../styles/reusable/index';
import { ArrowDownOnSquareIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import Typography from '../reusable/typography';
import commaNumber from 'comma-number';
import moment from 'moment';

const TransactionCard = ({
    amount,
    description,
    type,
    date,
} : any) => {
    return(
        <>
            <TransactionCardWrap>
                <BoxFlex
                    gap='24px'
                    vAlign='flex-start'
                >
                    <i className='w-[7%]'>
                        {
                            type === 'credit' ?
                                <ArrowDownOnSquareIcon className='w-6 h-6' color='green' />
                                :
                                <ArrowUpOnSquareIcon className='w-6 h-6' color='#c82b32' />
                        }
                        
                    </i>
                    <div
                        style={{
                            width: '85%'
                        }}
                    >
                        <BoxFlex
                            hAlign='space-between'
                        >
                            <Typography 
                                text={description ? description : 'No description'}
                                color='#091525'
                                fontWeight={500}
                                fontSize='15px'
                                lineHeight='21px'
                            />
                            <Typography 
                                text={amount ? `₦${commaNumber(amount)}` : '---'}
                                color='#4B4B4B'
                                fontWeight={600}
                                fontSize='15px'
                                lineHeight='21px'
                            />
                        </BoxFlex>
                        <BoxFlex
                            hAlign='space-between'
                            margin='3px 0 0 0'
                        >
                            <Typography 
                                text={moment(date).format('LL')}
                                color='#7081A0'
                                fontWeight={400}
                                fontSize='12px'
                                lineHeight='21px'
                            />
                            {/* <Typography 
                                text='10:15AM'
                                color='#7081A0'
                                fontWeight={400}
                                fontSize='12px'
                                lineHeight='21px'
                            /> */}
                        </BoxFlex>
                    </div>
                </BoxFlex>
            </TransactionCardWrap>
        </>
    )
}

export default TransactionCard;