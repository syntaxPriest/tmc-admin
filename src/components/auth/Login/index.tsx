import React, { useState } from 'react';
import { MainWrap, AuthFlex, AuthLeft, AuthCenter, AuthLogoTop, InputField, LinkText } from '../../../styles/authentication';
import { InputWrap } from '../../../styles/authentication';
import { Button } from '../../../styles/reusable';
import { useNavigate } from 'react-router';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
// import Error from '../../reusable/error';
import { useMutation } from '@tanstack/react-query';
import { LOGIN_USER } from '../../../api/auth/onboarding';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/user/reducer';
import { Spinner } from '../../reusable/spinner';
import { useCookies } from 'react-cookie';
import { setToken } from '../../../api/instance';
import { enqueueSnackbar } from 'notistack';
import { GET_WALLET } from '../../../api/transaction';
import { setWallet } from '../../../store/user/reducer';
import Error from '../../reusable/error';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Async functions

    // For Create Wallet
    // const { mutateAsync: get_wallet } = useMutation({
    //     mutationFn: GET_WALLET,
    //     onSuccess: (data) => {
    //         dispatch(setWallet(data?.data?.body?.wallet))
    //     }
    // })

    // const { mutateAsync, isPending } = useMutation({
    //     mutationFn: LOGIN_USER,
    //     onSuccess: async (data) => {
    //         await cookieUtils[1]("userToken", data ? data.data.body.token.authToken : '', {
    //             secure:
    //               process.env.NODE_ENV && process.env.NODE_ENV === "production"
    //                 ? true
    //                 : false,
    //             sameSite: "strict",
    //         });
    //         setToken(data?.data?.body?.token?.authToken, `${data?.data?.body?.user?.id}`);
    //         dispatch(setUser(data?.data.body.user));
    //         localStorage.setItem(
    //             'expire_time',
    //             JSON.stringify(Date.now() + (3 * 60 * 60 * 1000)),
    //         );
            
    //         if (data.data.body.user.phone_verified === false){
    //             navigate('/verify-email?type=onboard');
    //             enqueueSnackbar({
    //                 variant: 'warning',
    //                 message: 'Please verify your account!'
    //             })
    //         }else {
    //             enqueueSnackbar({
    //                 variant: 'success',
    //                 message: 'Login Successful!'
    //             })
    //             navigate('/dashboard');
    //             get_wallet({
    //                 user_id: data?.data?.body?.user?.id
    //             });
    //         }
    //     }
    // })

    const loginUser = (e: any) => {
        e.preventDefault();
        // mutateAsync({
        //     identifier: email,
        //     password
        // })
    }

    return(
        <>
            <MainWrap>
                <AuthFlex>
                    <AuthCenter
                        onSubmit={(e:any) => loginUser(e)}
                    >
                        <div>
                            <img 
                                className='h-[5rem] mx-auto block mb-[50px]'
                                src="/tmc.svg"
                                alt="TMC Logo"
                            />
                            <h3 className='text-center'>Sign In</h3>
                            <Error 
                                message='Wrong email or password'
                                extraText='Please, check that the details you entered are correct and try again.'
                            />
                            <InputWrap>
                                <InputField>
                                    <p>Email Address</p>
                                    <input 
                                        placeholder='Enter Email Address'
                                        autoComplete="off"
                                        type="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputField>
                                <InputField
                                    margin='0 0 0.4rem 0'
                                >
                                    <p>Password</p>
                                    <input 
                                        type={showPassword ? 'text': 'password'}
                                        placeholder="Enter Password"
                                        autoComplete="off"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
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
                                bg='#23211D'
                                color='#fff'
                                type='submit'
                                width='100%'
                                top='30px'
                            >
                                {
                                    // isPending ? <Spinner /> : 
                                    "Sign In"
                                }
                            </Button>
                        </div>
                    </AuthCenter>
                </AuthFlex>
            </MainWrap>
        </>
    )
}

export default Login;