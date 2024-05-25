import React, { useState } from 'react';
import Typography from '../../components/reusable/typography';
import { ContactWrap, FaqCard, FloatingToggle } from './style';
import { RandomCircle } from '../../styles/reusable/index';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Button } from '../../styles/reusable';
import { InputField, InputWrap} from '../../styles/authentication';
import { Bounce } from 'react-awesome-reveal';

const Contact = () => {
    return(
        <>
            <ContactWrap>
                <div className="w-[282.04px]">
                    <Typography 
                        text={'Get in touch'}
                        color='#1B2229'
                        fontWeight={600}
                        fontSize='32px'
                        lineHeight='32px'
                        margin='0.2rem 0 0 0'
                    />
                    <Typography 
                        text={"We're here to assist you with any questions or concerns you may have."}
                        color='#1B2229'
                        fontWeight={400}
                        fontSize='16px'
                        lineHeight='22.4px'
                        margin='1rem 0 0 0'
                    />
                </div>
                <div className="w-[500px]">
                    <InputWrap>
                        <InputField
                            width='48%'
                        >
                            <input 
                                placeholder='Name'
                                autoComplete="off"
                                style={{
                                    border: 'none',
                                    borderBottom: '1px solid #00000033',
                                    boxShadow: 'none',
                                    borderRadius: 0
                                }}
                            />
                        </InputField>
                        <InputField
                            width='48%'
                        >
                            <input 
                                placeholder='Email'
                                autoComplete="off"
                                type='email'
                                style={{
                                    border: 'none',
                                    borderBottom: '1px solid #00000033',
                                    boxShadow: 'none',
                                    borderRadius: 0
                                }}
                            />
                        </InputField>
                        <InputField>
                            <p
                                style={{
                                    marginLeft: '7px',
                                    color: '#928787'
                                }}
                            >Message</p>
                            <input 
                                autoComplete="off"
                                style={{
                                    border: 'none',
                                    borderBottom: '1px solid #00000033',
                                    boxShadow: 'none',
                                    borderRadius: 0
                                }}
                            />
                        </InputField>
                    </InputWrap>
                    <Bounce>
                        <Button
                            bg='var(--primary-color)'
                            color='#fff'
                            type='button'
                            width='auto'
                        >
                            Contact Us
                        </Button>
                    </Bounce>
                </div>
            </ContactWrap>
        </>
    )
}


export default Contact;