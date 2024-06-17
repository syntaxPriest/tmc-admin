import React, { useEffect, useState } from "react";
import {
  ModalWrap,
  ModalChild,
  ModalHeader,
} from "../../../styles/reusable/index";
import * as FeatherIcon from "react-feather";
import { Button } from "../../../styles/reusable";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Spinner } from "../../reusable/spinner";
import { DECLINE_ORDER } from "../../../api/action";
import { useNavigate } from "react-router-dom";
import { LinkText, PinInputWrap } from "../../../styles/authentication";
import OTPInput from "react-otp-input";
import { inputStyle } from "../../auth/verify";
import { useCurrentUser } from "../../../store/user/useCurrentUser";

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
  resendOtp: () => void;
  resendOnProcess: boolean;
}


const OTPVerifyScreen = ({ closeFunc, openToggle, resendOtp, resendOnProcess }: PropArgs) => {

    const navigate = useNavigate();
    const currentUser = useCurrentUser()?.user;
    const [reason, setReason] = useState("")
    const [verificationCode, setVerificationCode] = useState('');
    const [timer, setTimer] = useState(120);

  const {mutateAsync, isPending} = useMutation({
    mutationFn: DECLINE_ORDER,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: 'success',
        message: 'Order declined successfully!'
      })
      navigate("/dashboard/orders");
      closeFunc();
    }
  })

  const handleCreate = () => {
  }

  // Resend OTP mutate
  const handleResend = () => {
    if (timer === 0 || timer < 0 ){
        resendOtp();
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
  
  return (
    <>
      {openToggle && (
        <ModalWrap>
          <ModalChild>
            <ModalHeader>
              <h3>Enter OTP</h3>
              <i>
                <FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} />
              </i>
            </ModalHeader>
            <p className="py-0 relative top-[-1.5rem] text-[14px]">Please enter the otp sent to your mail <b>({currentUser?.email})</b> .</p>
            <div className="mb-[2rem]">
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
                                onClick={() => handleResend()}
                                disabled={timer > 0 && resendOnProcess}
                            >
                                {resendOnProcess ? <Spinner className='text-[#147EFA]' /> : 'Resend Code'}
                            </Button>
                    }
                    {resendOnProcess &&
                        <Button
                            bg='#fff'
                            color='#147EFA'
                            type='button'
                            width='100%'
                            top='0px'
                            disabled={timer > 0 && resendOnProcess}
                        >
                            <Spinner className='text-[var(--primary-color)]' />
                        </Button>
                    }
            </div>
            <div className="flex items-center justify-between mt-[1rem]">
                <Button
                    bg='#F3F1EF'
                    type='button'
                    width='48%'
                    top='0'
                    onClick={() => closeFunc()}
                >
                    Cancel
                </Button>
                <Button
                    bg='#23211D'
                    color='#fff'
                    type='button'
                    width='48%'
                    top='0'
                    onClick={() => handleCreate()}
                    disabled={
                        isPending || 
                        !reason
                    }
                >
                    {isPending ? <Spinner /> : "Continue"}
                </Button>
            </div>
            
          </ModalChild>
        </ModalWrap>
      )}
    </>
  );
};

export default OTPVerifyScreen;
