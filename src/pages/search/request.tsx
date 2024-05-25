import React from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle } from "../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../styles/reusable";
import { InputWrap, InputField } from '../../styles/authentication/index';
import { LockClosedIcon } from '@heroicons/react/24/solid';

interface PropArgs {
    closeFunc: any;
    action?: any;
}

const MakeRequest = ({
    closeFunc,
    action
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader
                        className="mb-[3rem]"
                    >
                        <h3>Let us know what you’re looking for</h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <br />
                    <MainModalView>
                        <InputWrap>
                            <InputField
                                width='48%'
                            >
                                <p>First Name</p>
                                <input 
                                    placeholder='Enter first name'
                                    autoComplete="off"
                                />
                            </InputField>
                            <InputField
                                width='48%'
                            >
                                <p>Last Name</p>
                                <input 
                                    placeholder='Enter last name'
                                    autoComplete="off"
                                />
                            </InputField>
                            <InputField>
                                <p>Phone number</p>
                                <input 
                                    placeholder='Enter phone number'
                                    autoComplete="off"
                                />
                            </InputField>
                            <InputField>
                                <p>Email Address</p>
                                <input 
                                    placeholder='Enter email Address'
                                    autoComplete="off"
                                />
                            </InputField>
                            <InputField>
                                <p>Preferred Location</p>
                                <input 
                                    placeholder='Enter Preferred Location'
                                    autoComplete="off"
                                />
                            </InputField>
                            <InputField>
                                <p>Budget</p>
                                <input 
                                    placeholder='Enter Budget'
                                    autoComplete="off"
                                />
                            </InputField>
                            <InputField>
                                <p>Message</p>
                                <input 
                                    placeholder='Enter Message'
                                    autoComplete="off"
                                />
                            </InputField>
                        </InputWrap>
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
                            Send Request
                        </Button>
                    </ButtonFlex>
                    </BottomButtonWrap>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default MakeRequest;