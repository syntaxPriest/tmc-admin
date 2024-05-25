import React, { useEffect, useState } from 'react';
import { MainWrap,LoneWrap, PinInputWrap, LinkText } from '../../../styles/authentication';
import { Button } from '../../../styles/reusable';
import { useNavigate } from 'react-router';
import AuthHeaderComp from '../authHeader';
import OTPInput from 'react-otp-input';
import { RESEND_OTP, VERIFY_OTP, CHECK_OTP, REQUEST_RESET } from '../../../api/auth/onboarding';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '../../reusable/spinner';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'react-router-dom';
import { useCurrentUser } from '../../../store/user/useCurrentUser';
import { GET_WALLET } from '../../../api/transaction';
import { useDispatch } from 'react-redux';
import { setWallet } from '../../../store/user/reducer';

const width = window.innerWidth;

const Verify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useCurrentUser().user;
    const [ PARAMS_SEARCH ] = useSearchParams();
    const type: string | null = PARAMS_SEARCH.get('type');
    const identifier: string | null = PARAMS_SEARCH.get('identifier');
    const [verificationCode, setVerificationCode] = useState('');
    const [timer, setTimer] = useState(120);

    // Async functions

    // For Create Wallet
    const { mutateAsync: get_wallet } = useMutation({
        mutationFn: GET_WALLET,
        onSuccess: (data) => {
            dispatch(setWallet(data?.data?.body?.wallet))
        }
    })

    // For Verifying otp
    const { mutateAsync, isPending } = useMutation({
        mutationFn: VERIFY_OTP,
        onSuccess: (data) => {
            if (data && data.status === 200){
                if (type === 'reset'){
                    navigate(`/create-password?otp=${verificationCode}&identifier=${identifier}`);
                }else {
                    navigate('/dashboard');
                    get_wallet({
                        user_id: currentUser?.id
                    });
                    localStorage.setItem(
                        'expire_time',
                        JSON.stringify(Date.now() + (3 * 60 * 60 * 1000)),
                    );
                }
            }
        }
    })

    // For Checking otp
    const { mutateAsync: mutateCheckOtp, isPending: isCheckingProcess } = useMutation({
        mutationFn: CHECK_OTP,
        onSuccess: (data) => {
            if (data && data.status === 200){
                if (type === 'reset'){
                    navigate(`/create-password?otp=${verificationCode}&identifier=${identifier}`);
                }else {
                    navigate('/dashboard');
                }
            }
        }
    })

    // For Resending OTP
    const { mutateAsync: mutateResendOtp, isPending: resendprocess } = useMutation({
        mutationFn: RESEND_OTP,
        onSuccess: () => {
            enqueueSnackbar({
                variant: 'success',
                message: 'OTP has been resent to your phone number and email.'
            });
            setTimer(120);
        }
    })

    // For Resending OTP on forgot password request
    const { mutateAsync: mutateResendOtpOnRequest, isPending: resendOnRequestprocess } = useMutation({
        mutationFn: REQUEST_RESET,
        onSuccess: () => {
            enqueueSnackbar({
                variant: 'success',
                message: 'OTP has been resent to your phone number and email.'
            });
            setTimer(120);
        }
    })

    // Function to call mutate function
    const verifyOtp = (e: any) => {
        e.preventDefault();
        if (verificationCode && verificationCode.length === 4){
            if (type === 'reset'){
                mutateCheckOtp({
                    otp: verificationCode,
                    identifier,
                })
            }else {
                mutateAsync({
                    otp: verificationCode,
                    user_id: currentUser && currentUser.id,
                })
            }
        }else {
            enqueueSnackbar({
                variant: 'error',
                message: 'OTP must be four characters!'
            })
        }
    }

    // Resend OTP mutate
    const resendOtp = () => {
        if (timer === 0 || timer < 0 ){
            if (type === 'reset'){
                mutateResendOtpOnRequest({
                    identifier,
                })
            }else {
                mutateResendOtp({
                    user_id: currentUser && currentUser.id,
                });
            }
        }
    }

    // Timer functions
    useEffect(() => {
        if (timer > 0 && timer !== 0){
            setInterval(() => {
                if (timer > 0){
                    setTimer(timer => timer - 1);
                }
            }, 1000)
        }
    }, []) //eslint-disable-line

    return(
        <>
            <MainWrap>
                <AuthHeaderComp />
                <LoneWrap>
                    <h3>
                        Verify phone number
                    </h3>
                    <p>Enter 5-digit code sent to your phone number</p>
                    <PinInputWrap>
                        <OTPInput
                        value={verificationCode}
                        onChange={(code:string) => setVerificationCode(code)}
                        numInputs={4}
                        inputStyle={inputStyle}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        isInputSecure={false}
                        placeholder='----'
                        />
                    </PinInputWrap>
                    {
                        timer > 0 &&
                            <LinkText
                                color={'#245372'}
                                fontSize='14px'
                                align='center'
                                margin='3rem 0'
                            >
                                Resend in <span style={{textDecoration: "underline", color:'#000'}}><b>{timer}s</b></span>
                            </LinkText>
                    }
                    {
                        (timer === 0 || timer < 0) &&
                            <Button
                                bg='#fff'
                                color='var(--secondary-color)'
                                type='button'
                                width='100%'
                                top='30px'
                                onClick={() => resendOtp()}
                                disabled={timer > 0 && resendprocess}
                            >
                                {resendprocess || resendOnRequestprocess ? <Spinner className='text-[#147EFA]' /> : 'Resend Code'}
                            </Button>
                    }
                    {resendprocess &&
                        <Button
                            bg='#fff'
                            color='#147EFA'
                            type='button'
                            width='100%'
                            top='0px'
                            disabled={timer > 0 && resendprocess}
                        >
                            <Spinner className='text-[var(--primary-color)]' />
                        </Button>
                    }
                    <Button
                        bg='var(--primary-color)'
                        color='#fff'
                        type='submit'
                        width='100%'
                        top='0px'
                        onClick={(e) => verifyOtp(e)}
                        disabled={isPending || isCheckingProcess }
                    >
                        {isPending || isCheckingProcess ? <Spinner /> : "Verify Phone"}
                    </Button>
                </LoneWrap>
            </MainWrap>
        </>
    )
}

export default Verify;

export const inputStyle = {
    width: width > 728 ? '56px' : '56px',
    height: width > 728 ? '56px' : '56px',
    background: '#fff',
    border: '1px solid #F0F3F6',
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 7.5,
    marginLeft: 7.5,
    color: 'black',
  };