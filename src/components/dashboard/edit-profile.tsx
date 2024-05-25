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

const EditProfile = ({
    closeFunc,
    action
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3>Edit Profile</h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <BoxFlex
                        margin="2rem 0"
                        hAlign="space-between"
                    >
                        <RandomCircle
                            style={{
                                margin: '0',
                            }}
                            size='60px'
                        >
                            <img 
                                src='/images/dummy-user.png'
                                alt='User'
                            />
                        </RandomCircle>
                        <Button
                            bg='#fff'
                            color='var(--primary-color)'
                            type='button'
                            width='auto'
                            top='0'
                            border='1px solid var(--primary-color)'
                        >
                            Change Picture
                        </Button>
                    </BoxFlex>
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
                            <i>
                                <LockClosedIcon className='w-6 h-5' color='#8796AD' />
                            </i>
                        </InputField>
                        <InputField>
                            <p>Email Address</p>
                            <input 
                                placeholder='Enter email Address'
                                autoComplete="off"
                            />
                            <i>
                                <LockClosedIcon className='w-6 h-5' color='#8796AD' />
                            </i>
                        </InputField>
                    </InputWrap>
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
                            Save Changes
                        </Button>
                    </ButtonFlex>
                    </BottomButtonWrap>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default EditProfile;