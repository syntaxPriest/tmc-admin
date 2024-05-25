import React from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../../styles/reusable";
import { InputWrap, InputField } from '../../../styles/authentication/index';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Typography from "../../reusable/typography";

interface PropArgs {
    closeFunc: any;
    setPaymentOption?: any;
    action?: any;
}

const ContributionPlan = ({
    closeFunc,
    setPaymentOption,
    action
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3>Make Contribution</h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <BoxFlex
                        margin="3rem 0 1rem 0"
                        hAlign="space-between"
                        onClick={async () => {
                            await setPaymentOption('full');
                            action();
                        }}
                        canHover
                    >
                        <div>
                            <Typography 
                                text='Pay ₦250,000'
                                color='#091525'
                                fontWeight={700}
                                fontSize='16px'
                                lineHeight='16px'
                            />
                            <Typography 
                                text={`Make next contribution`}
                                color='#7081A0'
                                fontWeight={400}
                                fontSize='14px'
                                lineHeight='14px'
                                margin="12px 0 0 0"
                            />
                        </div>
                        <ChevronRightIcon className="w-5 h-5" color='#8796AD' />
                    </BoxFlex>
                    <hr />
                    <BoxFlex
                        margin="1rem 0 1rem 0"
                        hAlign="space-between"
                        onClick={async () => {
                            await setPaymentOption('custom');
                            action();
                        }}
                        canHover
                    >
                        <div>
                            <Typography 
                                text='Pay a custom amount'
                                color='#091525'
                                fontWeight={700}
                                fontSize='16px'
                                lineHeight='16px'
                            />
                            <Typography 
                                text={`Pay any amount, reduce your next contribution`}
                                color='#7081A0'
                                fontWeight={400}
                                fontSize='14px'
                                lineHeight='14px'
                                margin="12px 0 0 0"
                            />
                        </div>
                        <ChevronRightIcon className="w-5 h-5" color='#8796AD' />
                    </BoxFlex>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default ContributionPlan;