import React, { useState } from 'react';
import { MainWrap, AuthFlex, AuthLeft, AuthRight, AuthLogoTop, InputField, LinkText } from '../../../styles/authentication';
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

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Async functions

    // For Create Wallet
    const { mutateAsync: get_wallet } = useMutation({
        mutationFn: GET_WALLET,
        onSuccess: (data) => {
            dispatch(setWallet(data?.data?.body?.wallet))
        }
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: LOGIN_USER,
        onSuccess: async (data) => {
            await cookieUtils[1]("userToken", data ? data.data.body.token.authToken : '', {
                secure:
                  process.env.NODE_ENV && process.env.NODE_ENV === "production"
                    ? true
                    : false,
                sameSite: "strict",
            });
            setToken(data?.data?.body?.token?.authToken, `${data?.data?.body?.user?.id}`);
            dispatch(setUser(data?.data.body.user));
            localStorage.setItem(
                'expire_time',
                JSON.stringify(Date.now() + (3 * 60 * 60 * 1000)),
            );
            
            if (data.data.body.user.phone_verified === false){
                navigate('/verify-email?type=onboard');
                enqueueSnackbar({
                    variant: 'warning',
                    message: 'Please verify your account!'
                })
            }else {
                enqueueSnackbar({
                    variant: 'success',
                    message: 'Login Successful!'
                })
                navigate('/dashboard');
                get_wallet({
                    user_id: data?.data?.body?.user?.id
                });
            }
        }
    })

    const loginUser = (e: any) => {
        e.preventDefault();
        mutateAsync({
            identifier: email,
            password
        })
    }

    return(
        <>
            <MainWrap>
                <AuthFlex>
                    <AuthLeft>
                    </AuthLeft>
                    <AuthRight
                        onSubmit={(e:any) => loginUser(e)}
                    >
                        <AuthLogoTop 
                            src='/c-logo.png'
                            alt='Contribuild'
                        />
                        <div>
                            <h3>Log In</h3>
                            {/* <Error 
                                message='Phone number/Email or password does not match'
                            /> */}
                            <InputWrap>
                                <InputField>
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
                            <LinkText 
                                color='var(--secondary-color)'
                                fontWeight={500}
                                align='right'
                                lineHeight='20px'
                            >
                                <Link to='/reset-password'>Forgotten password</Link>
                            </LinkText>
                            <Button
                                bg='var(--primary-color)'
                                color='#fff'
                                type='submit'
                                width='100%'
                                top='30px'
                            >
                                {isPending ? <Spinner /> : "Login"}
                            </Button>
                            <LinkText
                                color='var(--secondary-color)'
                                fontWeight={500}
                                align='center'
                                lineHeight='50px'
                            >
                                Don't have an account? <Link to='/sign-up'>Sign Up</Link>
                            </LinkText>
                            <LinkText
                                color='#869A9B'
                                fontWeight={500}
                                align='center'
                                fontSize='13px'
                                lineHeight='20px'
                            >
                                Creating an account means you agree to our <span style={{textDecoration: 'underline'}}>Terms of Service</span> and <span style={{textDecoration: 'underline'}}>Privacy Policy</span>
                            </LinkText>
                        </div>
                    </AuthRight>
                </AuthFlex>
            </MainWrap>
        </>
    )
}

export default Login;