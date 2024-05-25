import React from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap } from "../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../styles/reusable";

interface PropArgs {
    closeFunc: any;
    action?: any;
}

const AgreementModal = ({
    closeFunc,
    action
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3>Before you proceed, here are the terms for starting a contribution scheme</h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <MainModalView>
                        <p>
                            {`CONTRACTUAL RELATIONSHIP

                                Agreement to be legally bound by the terms and conditions set out herein. The terms also govern your use, rent or purchase of the property/services provided through or in connection with the platform (services). EACH TIME YOU USE OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS AND AGREE TO BE LEGALLY BOUND BY THEM. If you do not agree to be bound by these terms, you may not use the platform/services provided by us. Do not continue to use the platform if you do not accept all of the Terms and Conditions stated on this page.
                                THE PLATFORM is owned by Continental Leasing Company Limited, a company incorporated under the Laws of the Federal Republic of Nigeria and having its principal place of business at 3A Ibadan Street, Osborne foreshore estate, Ikoyi, Lagos state. If you do not agree to and accept these Terms and Condition, you should not use this platform. All references within these Terms and Conditions to 'we/us/our/the platform' refer to Quick Shelter Homes.
                                tIMPORTANT: PLEASE REVIEW THE ARBITRATION AGREEMENT SET FORTH BELOW CAREFULLY, AS IT WILL REQUIRE YOU TO RESOLVE DISPUTES WITH QUICK SHELTER HOMES ON AN INDIVIDUAL BASIS THROUGH FINAL AND BINDING ARBITRATION. BY ENTERING THIS AGREEMENT, YOU EXPRESSLY ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND ALL OF THE TERMS OF THIS AGREEMENT AND HAVE TAKEN TIME TO CONSIDER THE CONSEQUENCES OF THIS IMPORTANT DECISION.
                            `}
                        </p>
                    </MainModalView>
                    <BottomButtonWrap>
                    <ButtonFlex>
                        <Button
                            bg='#fff'
                            color='var(--secondary-color)'
                            type='button'
                            width='auto'
                            top='0'
                            onClick={() => closeFunc()}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg='var(--primary-color)'
                            color='#fff'
                            type='button'
                            width='auto'
                            top='0'
                            onClick={() => action()}
                        >
                            Agree
                        </Button>
                    </ButtonFlex>
                    </BottomButtonWrap>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default AgreementModal;