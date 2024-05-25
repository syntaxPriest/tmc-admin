import React, { useState } from 'react';
import { MainWrap, AuthFlex, AuthLeft, AuthRight, AuthLogoTop, InputField, LinkText } from '../../../styles/authentication';
import { InputWrap } from '../../../styles/authentication';
import { Button } from '../../../styles/reusable';
import { useNavigate } from 'react-router';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { REGISTER_USER } from '../../../api/auth/onboarding';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/user/reducer';
import { Spinner } from '../../reusable/spinner';
import { useCookies } from 'react-cookie';
import { setToken } from '../../../api/instance';
import { numOnly } from '../../../utils/numOnly';
import { handleZero } from '../../../utils/handleZero';
import { PhoneCodeSelect } from '../../reusable/customSelect';

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookieUtils = useCookies();

    //  States
    const [showPassword, setShowPassword] = useState(false);
    const [phoneCode, setPhoneCode] = useState('+234');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    // Async functions

    const { mutateAsync, isPending } = useMutation({
        mutationFn: REGISTER_USER,
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
            navigate('/verify-email?type=onboard');
        }
    })

    const registerUser = (e: any) => {
        e.preventDefault();
        mutateAsync({
            first_name: firstName,
            last_name: lastName,
            phone: `${phoneCode}${phone}`,
            email,
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
                        onSubmit={(e:any) => registerUser(e)}
                    >
                        <AuthLogoTop 
                            src='/c-logo.png'
                            alt='Contribuild'
                        />
                        <div>
                            <h3>Sign Up</h3>
                            <InputWrap>
                                <InputField
                                    width='48%'
                                >
                                    <p>First Name</p>
                                    <input 
                                        placeholder='Enter first name'
                                        autoComplete="off"
                                        value={firstName}
                                        required
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </InputField>
                                <InputField
                                    width='48%'
                                >
                                    <p>Last Name</p>
                                    <input 
                                        placeholder='Enter last name'
                                        autoComplete="off"
                                        value={lastName}
                                        required
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </InputField>
                                <InputField
                                    style={{
                                        margin: 0
                                    }}
                                    shouldNotFocus
                                >
                                    <p>Phone number</p>
                                    <InputWrap>
                                        <PhoneCodeSelect
                                            width='25%'
                                            setPhoneCode={setPhoneCode}
                                        />
                                        <InputField
                                            width='73%'
                                        >
                                            <input 
                                                placeholder='Enter phone number'
                                                autoComplete="off"
                                                type="text"
                                                value={phone}
                                                maxLength={10}
                                                onKeyPress={(e) => {
                                                    numOnly(e)
                                                    handleZero(e)
                                                }}
                                                required
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </InputField>
                                    </InputWrap>
                                </InputField>
                                <InputField>
                                    <p>Email Address</p>
                                    <input 
                                        placeholder='Enter email Address'
                                        autoComplete="off"
                                        type="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputField>
                                <InputField>
                                    <p>Create Password</p>
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
                                bg='var(--primary-color)'
                                color='#fff'
                                type='submit'
                                width='100%'
                                top='5px'
                            >
                                {isPending ? <Spinner /> : "Create Account"}
                            </Button>
                            <LinkText
                                color='var(--secondary-color)'
                                fontWeight={500}
                                align='center'
                                lineHeight='50px'
                            >
                                Have an account? <Link to='/login'>Login</Link>
                            </LinkText>
                            <LinkText
                                color='#869A9B'
                                fontWeight={500}
                                align='center'
                                fontSize='13px'
                                lineHeight='20px'
                            >
                                Creating an account means you agree to our
                                <span style={{textDecoration: 'underline'}}>Terms of Service</span> and 
                                <span style={{textDecoration: 'underline'}}>Privacy Policy</span>
                            </LinkText>
                        </div>
                    </AuthRight>
                </AuthFlex>
            </MainWrap>
        </>
    )
}

export default Signup;