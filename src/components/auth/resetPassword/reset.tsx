import React, { useState } from 'react';
import { MainWrap,LoneWrap, InputWrap, InputField, AuthBacknav } from '../../../styles/authentication';
import { Button } from '../../../styles/reusable';
import { useNavigate } from 'react-router';
import AuthHeaderComp from '../authHeader';
import * as Icon from 'react-feather';
import { useMutation } from '@tanstack/react-query';
import { REQUEST_RESET } from '../../../api/auth/onboarding';
import { Spinner } from '../../reusable/spinner';

const Reset = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    // Async functions
    const { mutateAsync, isPending } = useMutation({
        mutationFn: REQUEST_RESET,
        onSuccess: async (data) => {
            navigate(`/verify-email?type=reset&identifier=${email}`);
        }
    })

    const requestReset = (e: any) => {
        e.preventDefault();
        mutateAsync({
            identifier: email
        })
    }

    return(
        <>
            <MainWrap>
                <AuthHeaderComp />
                <LoneWrap
                    textAlign='left'
                    showBorder={true}
                    onSubmit={(e) => requestReset(e)}
                >
                    <AuthBacknav
                        onClick={() => navigate('/login')}
                    >
                        <Icon.ArrowLeft 
                            color='#8796AD' 
                            size={20}
                        />
                        <p>Back</p>
                    </AuthBacknav>
                    <h3>
                        Reset Password
                    </h3>
                    <p>We’d send a code to your phone number or email to reset your password</p>
                    <InputWrap>
                        <InputField
                            margin='0rem 0 1rem 0'
                        >
                            <p>Phone number or Email</p>
                            <input 
                                placeholder='Enter Phone number or Email'
                                autoComplete="off"
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputField>
                    </InputWrap>
                    <Button
                        bg='var(--primary-color)'
                        color='#fff'
                        type='submit'
                        width='100%'
                        top='20px'
                    >
                        {isPending ? <Spinner /> : "Reset Password"}
                    </Button>
                </LoneWrap>
            </MainWrap>
        </>
    )
}

export default Reset;