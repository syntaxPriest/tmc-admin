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
import { INVITE_MEMBER } from "../../../api/action";
import { enqueueSnackbar } from "notistack";
import { Spinner } from "../../reusable/spinner";

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
}

const InviteMembers = ({ closeFunc, openToggle }: PropArgs) => {
  
  const [inviteeData, setInviteeData] = useState({
    email: "",
    membership_type: "",
    membership_id: ""
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
    mutationFn: INVITE_MEMBER,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: 'success',
        message: 'Member invited successfully!'
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
              <h3>Invite Member</h3>
              <i>
                <FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} />
              </i>
            </ModalHeader>
            <InputWrap>
                {/* <InputField width='48%'>
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
                </InputField> */}
                <InputField width='48%'>
                    <p>Email Address</p>
                    <input 
                        placeholder='Enter Email Address'
                        autoComplete="off"
                        type="text"
                        required
                        id='email'
                        value={inviteeData?.email}
                        onChange={handleChange}
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Membership ID</p>
                    <input 
                        placeholder='Enter Membership ID'
                        autoComplete="off"
                        type="text"
                        required
                        id='membership_id'
                        value={inviteeData?.membership_id}
                        onChange={handleChange}
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Membership Type</p>
                    <select 
                        required
                        id='membership_type'
                        value={inviteeData?.membership_type}
                        onChange={handleChange}
                        className="!py-[17px]"
                    >
                        <option value="">Select Membership Type</option>
                        {
                          membershipTypeList.map((item, index) => (

                            <option value={`${item.name}ship`}>{`${item.name}ship`}</option>
                          ))
                        }
                    </select>
                </InputField>
                <InputField width='48%'>
                    <p>Subscription Start Date</p>
                    <input 
                        placeholder='Enter Subscription Start Date'
                        autoComplete="off"
                        type="date"
                        required
                        // id='membership_id'
                        // value={inviteeData?.membership_id}
                        // onChange={handleChange}
                    />
                </InputField>
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
                  !inviteeData?.email || 
                  !inviteeData?.membership_type || 
                  !inviteeData?.membership_id
                }
            >
                {isPending ? <Spinner /> : 'Invite'}
            </Button>
          </ModalChild>
        </ModalWrap>
      )}
    </>
  );
};

export default InviteMembers;

export const membershipTypeList = [
  {
    name: "Ordinary Member",
    value: 'ordinary_member'
  },
  {
    name: "Country Member",
    value: 'country_member'
  },
  {
    name: "Honorary Member",
    value: 'honorary_member'
  },
  {
    name: "Diplomatic Member",
    value: 'diplomatic_member'
  },
  {
    name: "Overseas Member",
    value: 'overseas_member'
  },
  {
    name: "Temporary Member",
    value: 'temporary_member'
  },
  {
    name: "Supernumerary Member",
    value: 'supernumerary_member'
  },
]
