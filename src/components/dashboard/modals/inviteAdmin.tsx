import React from "react";
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

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
}

const InviteAdmin = ({ closeFunc, openToggle }: PropArgs) => {
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
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Last Name</p>
                    <input 
                        placeholder='Enter Last Name'
                        autoComplete="off"
                        type="text"
                        required
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Middle Name</p>
                    <input 
                        placeholder='Enter Middle Name'
                        autoComplete="off"
                        type="text"
                        required
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Email Address</p>
                    <input 
                        placeholder='Enter Email Address'
                        autoComplete="off"
                        type="text"
                        required
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Phone Number</p>
                    <input 
                        placeholder='Enter Phone Number'
                        autoComplete="off"
                        type="number"
                        required
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Admin Type</p>
                    <select 
                        required
                    >
                        <option value="">Select Membership Type</option>
                    </select>
                </InputField>
            </InputWrap>
            <Button
                bg='#23211D'
                color='#fff'
                type='button'
                width='auto'
                top='0'
            >
                Create Admin
            </Button>
          </ModalChild>
        </ModalWrap>
      )}
    </>
  );
};

export default InviteAdmin;
