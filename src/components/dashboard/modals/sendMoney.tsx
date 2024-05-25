import React from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../../styles/reusable";
import { InputWrap, InputField } from '../../../styles/authentication/index';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import AccInfoComp from "../../search/accInfoComp";
import Typography from "../../reusable/typography";

interface PropArgs {
    closeFunc: any;
    action?: any;
    prevStage?: any;
    paymentOption?: string;
}

const SendMoney = ({
    closeFunc,
    action,
    prevStage,
    paymentOption
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3>Make Contribution</h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    {
                        paymentOption === 'custom' &&
                            <Typography 
                                text='Send any amount to the wallet to make a contribution'
                                color='#616161'
                                fontWeight={400}
                                fontSize='15px'
                                lineHeight='21px'
                                margin='0.5rem 0 2rem 0'
                                align='left'
                            />
                    }
                    <div className="mt-10">
                        <AccInfoComp paymentOption={paymentOption} />
                        <Button
                            bg='var(--primary-color)'
                            color='#fff'
                            type='submit'
                            width='100%'
                            top='5px'
                            onClick={() => action()}
                        >
                            I have sent the money
                        </Button>
                        <Button
                            bg='#fff'
                            color='var(--secondary-color)'
                            type='button'
                            width='100%'
                            top='3px'
                            onClick={() => closeFunc()}
                        >
                            Cancel Payment
                        </Button>
                    </div>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default SendMoney;