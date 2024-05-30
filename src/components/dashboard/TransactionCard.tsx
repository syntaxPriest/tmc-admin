import React from 'react';
import { TransactionCardWrap } from './style';
import { BoxFlex } from '../../styles/reusable/index';
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import Typography from '../reusable/typography';

const TransactionCard = ({openDetails} : any) => {
    return(
        <>
            <TransactionCardWrap
                onClick={() => openDetails()}
            >
                <BoxFlex
                    gap='24px'
                    vAlign='flex-start'
                >
                    <div
                        style={{
                            width: '100%'
                        }}
                    >
                        <BoxFlex
                            hAlign='space-between'
                        >
                            <Typography 
                                text='Membership Subscription'
                                color='#091525'
                                fontWeight={500}
                                fontSize='15px'
                                lineHeight='21px'
                            />
                            <Typography 
                                text='₦500,000.00'
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
                                text='12 June, 2023'
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