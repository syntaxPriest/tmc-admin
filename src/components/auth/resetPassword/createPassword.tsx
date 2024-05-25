import React, { useState } from 'react';
import { MainWrap,LoneWrap, InputWrap, InputField, AuthBacknav } from '../../../styles/authentication';
import { Button } from '../../../styles/reusable';
import { useNavigate } from 'react-router';
import AuthHeaderComp from '../authHeader';
import * as Icon from 'react-feather';
import { CREATE_PASSWORD } from '../../../api/auth/onboarding';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '../../reusable/spinner';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'react-router-dom';

const CreatePassword = () => {
    const navigate = useNavigate();
    const [ PARAMS_SEARCH ] = useSearchParams();
    const identifier = PARAMS_SEARCH.get('identifier');
    const otp = PARAMS_SEARCH.get('otp')
    const [showPassword, setShowPassword] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Async functions

    const { mutateAsync, isPending } = useMutation({
        mutationFn: CREATE_PASSWORD,
        onSuccess: (data) => {
            setTimeout(() => {
                enqueueSnackbar({
                    variant: 'success',
                    message: 'Password has been reset successfully!'
                })
                navigate('/login');
            }, 4000);
        }
    })
    
    const createPassword = (e: any) => {
        e.preventDefault();
        if (newPassword === confirmPassword){
                mutateAsync({
                    password: newPassword,
                    confirm_password: confirmPassword,
                    identifier: identifier,
                    otp: otp
                })
        }else {
            enqueueSnackbar({
                variant: 'error',
                message: 'OTP must be four characters!'
            })
        }
    }

    return(
        <>
            <MainWrap>
                <AuthHeaderComp />
                <LoneWrap
                    textAlign='left'
                    showBorder={true}
                    onSubmit={(e) => createPassword(e)}
                >
                    <h3>
                        Create Password
                    </h3>
                    <p>Password should be at least 8 characters</p>
                    <InputWrap>
                        <InputField
                            margin='0 0 0.4rem 0'
                        >
                            <p>New Password</p>
                            <input 
                                type={showPassword ? 'text': 'password'}
                                placeholder="Enter Password"
                                autoComplete="off"
                                value={newPassword}
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            {
                                showPassword ?
                                    <i>
                                        <Icon.EyeOff 
                                            strokeWidth={1}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </i>
                                    :
                                    <i>
                                        <Icon.Eye 
                                            strokeWidth={1}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </i>
                            }
                        </InputField>
                        <InputField
                            margin='0.4rem 0 0.4rem 0'
                        >
                            <p>Confirm Password</p>
                            <input 
                                type={showPassword ? 'text': 'password'}
                                placeholder="Re-enter Password"
                                autoComplete="off"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {
                                showPassword ?
                                    <i>
                                        <Icon.EyeOff 
                                            strokeWidth={1}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </i>
                                    :
                                    <i>
                                        <Icon.Eye 
                                            strokeWidth={1}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </i>
                            }
                        </InputField>
                    </InputWrap>
                    <Button
                        bg='var(--primary-color)'
                        color='#fff'
                        type='submit'
                        width='100%'
                        top='30px'
                    >
                        {isPending ? <Spinner /> : "Create Password"}
                    </Button>
                </LoneWrap>
            </MainWrap>
        </>
    )
}

export default CreatePassword;