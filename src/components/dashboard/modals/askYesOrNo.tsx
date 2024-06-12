import React, { useState } from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle, Line, PageListItemWrap, PageListItem } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import * as Icon from "iconsax-react";
import { Button } from "../../../styles/reusable";
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import Typography from "../../reusable/typography";
import { InputWrap } from "../../../styles/authentication";
import CustomRadio from "../../reusable/customRadio";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../reusable/spinner";

interface PropArgs {
    openToggle: boolean;
    headerText: string;
    question: string;
    declineText: string;
    actionText: string;
    yesAction: () => void;
    noAction: () => void;
    actionInProgress?: boolean;
}

const AskYesOrNo = ({
    openToggle,
    headerText,
    question,
    declineText,
    actionText,
    yesAction,
    noAction,
    actionInProgress
} : PropArgs) => {

    const navigate = useNavigate();
    const [messageChannel, setMessageChannel] = useState<string | boolean>("");

    return(
        <>
            {openToggle && (
            <ModalWrap>
                <ModalChild>
                    <div className="w-[70%] mx-auto">
                    <ModalHeader>
                        <h3></h3>
                        {/* <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i> */}
                    </ModalHeader>
                    <BoxFlex
                        hAlign="center"
                        margin='0rem 0 1rem 0'
                        gap="24px"
                    >
                        <div>
                            <Typography 
                                text={headerText}
                                color='#091525'
                                fontWeight={600}
                                fontSize='24px'
                                lineHeight='24px'
                                align="center"
                            />
                        </div>
                    </BoxFlex>
                    <div>
                        <Typography 
                            text={question}
                            color='#091525'
                            fontWeight={400}
                            fontSize='16px'
                            lineHeight='24px'
                            align="center"
                            margin="0 0 2rem 0"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-[1rem]">
                        <Button
                            bg={'#F3F1EF'}
                            type='button'
                            width='48%'
                            top='0'
                            onClick={() => noAction()} 
                        >
                            {declineText}
                        </Button>
                        <Button
                            bg={actionText.includes("Delete") ? '#D23B3B' : '#23211D'}
                            color='#fff'
                            type='button'
                            width='48%'
                            top='0'
                            onClick={() => yesAction()}
                        >
                            {actionInProgress ? <Spinner /> :  actionText}
                        </Button>
                    </div>
                    </div>
                </ModalChild>
            </ModalWrap>
            )}
        </>
    )
}

export default AskYesOrNo;