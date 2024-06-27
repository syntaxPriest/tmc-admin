import React, { ChangeEvent, useEffect, useState } from "react";
import {
  ModalWrap,
  ModalChild,
  ModalHeader,
  MainModalView,
  ButtonFlex,
  BottomButtonWrap,
  BoxFlex,
  RandomCircle,
} from "../../../styles/reusable/index";
import * as FeatherIcon from "react-feather";
import { Button } from "../../../styles/reusable";
import { InputWrap, InputField } from "../../../styles/authentication/index";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Typography from "../../reusable/typography";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { INVITE_ADMIN } from "../../../api/action";
import { Spinner } from "../../reusable/spinner";
import { generatePassword } from "../../../utils/generatePassword";

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
}

interface User {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

const InviteAdmin = ({ closeFunc, openToggle }: PropArgs) => {

  const [inviteeData, setInviteeData] = useState<User>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: ""
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
      setInviteeData((prev) => {
        return {
            ...prev,
            [id]: value,
        };
      });
    }

  useEffect(() => {
    setInviteeData((prev) => { return {
      ...prev,
      password: generatePassword()
    }})  
  }, [])

  const {mutateAsync, isPending} = useMutation({
    mutationFn: INVITE_ADMIN,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: 'success',
        message: 'Admin added successfully!'
      })
      closeFunc();
    }
  })

  const handleInvite = () => {
    mutateAsync({
      ...inviteeData,
      middle_name: inviteeData?.middle_name || undefined
    });
  }
  
  return (
    <>
      {openToggle && (
        <ModalWrap>
          <ModalChild>
            <ModalHeader>
              <h3>Invite Admin</h3>
              <i>
                <FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} />
              </i>
            </ModalHeader>
            <InputWrap>
                <InputField width='48%'>
                    <p>First Name</p>
                    <input 
                        placeholder='Enter First Name'
                        autoComplete="off"
                        type="text"
                        required
                        id='first_name'
                        value={inviteeData?.first_name}
                        onChange={handleChange}
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Last Name</p>
                    <input 
                        placeholder='Enter Last Name'
                        autoComplete="off"
                        type="text"
                        required
                        id='last_name'
                        value={inviteeData?.last_name}
                        onChange={handleChange}
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Middle Name</p>
                    <input 
                        placeholder='Enter Middle Name'
                        autoComplete="off"
                        type="text"
                        id='middle_name'
                        onChange={handleChange}
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Email Address</p>
                    <input 
                        placeholder='Enter Email Address'
                        autoComplete="off"
                        type="email"
                        required
                        id='email'
                        value={inviteeData?.email}
                        onChange={handleChange}
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Phone Number</p>
                    <input 
                        placeholder='Enter Phone Number'
                        autoComplete="off"
                        type="number"
                        required
                        id='phone'
                        value={inviteeData?.phone}
                        onChange={handleChange}
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Password</p>
                    <input 
                        placeholder='Enter Password'
                        autoComplete="off"
                        type="password"
                        required
                        id='password'
                        disabled
                        value={inviteeData?.password}
                        onChange={handleChange}
                    />
                </InputField>
                {/* <InputField width='48%'>
                    <p>Admin Type</p>
                    <select 
                        required
                    >
                        <option value="">Select Membership Type</option>
                    </select>
                </InputField> */}
            </InputWrap>
            <Typography 
              text={`Note that generated passwords will be sent via email to the invited admins.`}
              color='#8B6C23'
              fontWeight={500}
              fontSize='14px'
              lineHeight='22px'
              margin='0 0 0.4rem 0'
            />
            <Button
                bg='#23211D'
                color='#fff'
                type='button'
                width='auto'
                top='0'
                onClick={() => handleInvite()}  
                disabled={
                  isPending ||
                  !inviteeData?.first_name || 
                  !inviteeData?.email || 
                  !inviteeData?.last_name || 
                  !inviteeData?.phone || 
                  !inviteeData?.password
                }
            >
                {isPending ? <Spinner /> : 'Create Admin'}
            </Button>
          </ModalChild>
        </ModalWrap>
      )}
    </>
  );
};

export default InviteAdmin;
