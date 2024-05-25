import React from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle, Line, PageListItemWrap, PageListItem } from "../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../styles/reusable";
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import Typography from "../reusable/typography";

interface PropArgs {
    closeFunc: any;
    action?: any;
}

const TransactionDetailsModal = ({
    closeFunc,
    action
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3></h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <BoxFlex
                        hAlign="space-between"
                        margin='1rem 0'
                    >
                        <div>
                            <Typography 
                                text='₦500,000.00'
                                color='#091525'
                                fontWeight={600}
                                fontSize='24px'
                                lineHeight='24px'
                            />
                            <Typography 
                                text='Wallet Top-Up'
                                color='#7081A0'
                                fontWeight={400}
                                fontSize='12px'
                                lineHeight='21px'
                                margin="3px 0 0 0"
                            />
                        </div>
                        <RandomCircle
                            size='48px'
                        >
                            <i>
                                <ArrowDownOnSquareIcon className='w-5 h-5' color='#8796AD' />
                            </i>
                        </RandomCircle>
                    </BoxFlex>
                    <Line />
                    <PageListItemWrap
                        style={{
                            margin: '1rem 0 0 0'
                        }}
                    >
                        <PageListItem width='50%'>
                            <p style={{color: '#1B2229', fontSize: '14px'}}>Date</p>
                            <p style={{color: '#1B2229', margin: '8px 0 0 0', fontSize: '14px'}}>12 June, 2023</p>
                        </PageListItem>
                        <PageListItem width='50%'>
                            <p style={{color: '#1B2229', fontSize: '14px'}}>Time</p>
                            <p style={{color: '#1B2229', margin: '8px 0 0 0', fontSize: '14px'}}>10:15am</p>
                        </PageListItem>
                    </PageListItemWrap>
                    <div>
                        <Typography 
                            text='Transaction Reference'
                            color='#1B2229'
                            fontWeight={400}
                            fontSize='14px'
                            lineHeight='17.57px'
                            margin="15px 0 0 0"
                        />
                        <Typography 
                            text='123130JSAJQ1022-XC'
                            color='#1B2229'
                            fontWeight={400}
                            fontSize='14px'
                            lineHeight='17.57px'
                            margin="6px 0 15px 0"
                        />
                    </div>
                    <Line />
                    <div>
                        <Typography 
                            text='Property'
                            color='#1B2229'
                            fontWeight={400}
                            fontSize='14px'
                            lineHeight='17.57px'
                            margin="15px 0 0 0"
                        />
                        <BoxFlex
                            hAlign="space-between"
                            margin='1rem 0 2rem 0'
                        >
                            <div
                                style={{
                                    width: '85%',
                                    textDecoration: 'underline'
                                }}
                            >
                                <Typography 
                                    text='15 units of Newly Built 2 bedroom Semi-detached Duplex with BQ'
                                    color='#1B2229'
                                    fontWeight={400}
                                    fontSize='14px'
                                    lineHeight='17.57px'
                                />
                            </div>
                            <img 
                                src='/images/house1.png'
                                alt='House'
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    objectFit: 'cover',
                                    borderRadius: "12px"
                                }}
                            />
                        </BoxFlex>
                    </div>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default TransactionDetailsModal;