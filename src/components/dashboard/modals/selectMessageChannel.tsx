import React, { ChangeEvent, useState } from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle, Line, PageListItemWrap, PageListItem } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import * as Icon from "iconsax-react";
import { Button } from "../../../styles/reusable";
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import Typography from "../../reusable/typography";
import { InputWrap } from "../../../styles/authentication";
import CustomRadio from "../../reusable/customRadio";
import { useNavigate } from "react-router-dom";
import { updateProposedMessageData } from "../../../store/general/reducer";
import { useDispatch } from "react-redux";

interface PropArgs {
    openToggle: boolean;
    closeFunc: any;
}

const SelectMessageChannel = ({
    closeFunc,
    openToggle 
} : PropArgs) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageChannels, setMessageChannels] = useState<string[]>([])
   
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
    
        if (checked) {
          setMessageChannels([...messageChannels, value]);
        } else {
          setMessageChannels(messageChannels.filter(item => item !== value));
        }
    };

    const handleContinue = () => {
        dispatch(updateProposedMessageData({
            channels: messageChannels
        }))
        navigate("/dashboard/messaging/create");
    }

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
                    <div className="mb-[2rem] relative w-[60%] mx-auto">
                        <div className="py-2 flex items-center gap-[10px]">
                            <input 
                                type="checkbox" 
                                value="in_app"
                                onChange={handleCheckboxChange}
                                className="w-[20px] h-[20px]"
                            />
                            <p className="text-[14px]">In-app notification</p>
                        </div>
                        <div className="py-2 flex items-center gap-[10px]">
                            <input 
                                type="checkbox" 
                                value="email"
                                onChange={handleCheckboxChange}
                                className="w-[20px] h-[20px]"
                            />
                            <p className="text-[14px]">Email</p>
                        </div>
                        <div className="py-2 flex items-center gap-[10px]">
                            <input 
                                type="checkbox" 
                                value="sms"
                                onChange={handleCheckboxChange}
                                className="w-[20px] h-[20px]"
                            />
                            <p className="text-[14px]">SMS</p>
                        </div>
                    </div>
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
                            disabled={messageChannels.length < 1}
                            onClick={() => {
                                handleContinue();
                            }}
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