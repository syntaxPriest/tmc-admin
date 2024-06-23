import React, { ChangeEvent, useState } from "react";
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

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
}

const InviteAdmin = ({ closeFunc, openToggle }: PropArgs) => {

  const [inviteeData, setInviteeData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
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
    mutateAsync(inviteeData);
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
                {/* <InputField width='48%'>
                    <p>Admin Type</p>
                    <select 
                        required
                    >
                        <option value="">Select Membership Type</option>
                    </select>
                </InputField> */}
            </InputWrap>
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
                  !inviteeData?.phone
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
