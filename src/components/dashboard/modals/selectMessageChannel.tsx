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

interface PropArgs {
    openToggle: boolean;
    closeFunc: any;
}

const SelectMessageChannel = ({
    closeFunc,
    openToggle 
} : PropArgs) => {

    const navigate = useNavigate();
    const [messageChannel, setMessageChannel] = useState<string | boolean>("")
    return(
        <>
            {openToggle && (
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3></h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <BoxFlex
                        hAlign="center"
                        margin='0rem 0 2rem 0'
                        gap="24px"
                    >
                        <div>
                            <Typography 
                                text='Select Channel'
                                color='#091525'
                                fontWeight={600}
                                fontSize='24px'
                                lineHeight='24px'
                                align="center"
                            />
                        </div>
                    </BoxFlex>
                    <InputWrap>
                        <CustomRadio 
                            labelText='In-app nofitication, Email'
                            name='msg_channel'
                            activeValue={messageChannel}
                            setActiveValue={setMessageChannel}
                            id='other'
                            width="100%"
                        />
                        <CustomRadio 
                            labelText="SMS"
                            name='msg_channel'
                            activeValue={messageChannel}
                            setActiveValue={setMessageChannel}
                            id='tuesday'
                            width="100%"
                        />
                    </InputWrap>
                    <div className="flex items-center justify-between mt-[1rem]">
                        <Button
                            bg='#F3F1EF'
                            type='button'
                            width='48%'
                            top='0'
                            onClick={() => closeFunc()} 
                        >
                            Back
                        </Button>
                        <Button
                            bg='#23211D'
                            color='#fff'
                            type='button'
                            width='48%'
                            top='0'
                            onClick={() => navigate("/dashboard/messaging/create")}
                        >
                            Next
                        </Button>
                    </div>
                </ModalChild>
            </ModalWrap>
            )}
        </>
    )
}

export default SelectMessageChannel;