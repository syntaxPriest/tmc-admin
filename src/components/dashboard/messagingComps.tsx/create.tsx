import React, { useEffect, useState } from "react";
import {
  BoxFlex,
  Line,
  MainWrap,
  PageListItem,
  PageListItemWrap,
  PageToggleText,
  RandomCircle,
} from "../../../styles/reusable/index";
import SideBarWidget from "../../reusable/sidebar";
import {
  DashboardFlex,
  DashboardHeader,
  DashboardInner,
  DashboardMain,
  ProfileBoxWrap,
} from "./../style";
import QuickActionWidget from "../../reusable/quickaction";
import Typography from "../../reusable/typography";
import * as Icon from "react-feather";
import { Button } from "../../../styles/reusable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InputWrap, InputField } from "../../../styles/authentication/index";
import BottomNavComp from "../../reusable/bottomNav";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useCurrentUser } from "../../../store/user/useCurrentUser";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { membershipTypeList } from "../modals/inviteMembers";
import { useGeneralState } from "../../../store/general/useGeneral";
import { updateProposedMessageData } from "../../../store/general/reducer";

const CreateMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery] = useSearchParams();
  const type = searchQuery.get('type');
  const id = searchQuery.get('id');
  const { proposedMessageData } = useGeneralState();

  useEffect(() => {
    if (proposedMessageData){
      setHeadline(proposedMessageData?.headline)
      setMessage(proposedMessageData?.message)
      if (proposedMessageData?.receivers && proposedMessageData?.receivers.length > 0){
        setRecipientArray(proposedMessageData?.receivers)
      }
    }
  }, [proposedMessageData])


  const [recipientArray, setRecipientArray] = useState<Array<string | number>>([])
  const [headline, setHeadline] = useState("")
  const [message, setMessage] = useState<any>("")

  const handleContinueToPreview = () => {
    dispatch(updateProposedMessageData({
      ...proposedMessageData,
      headline,
      message,
      receivers: recipientArray
    }))
    navigate(`/dashboard/messaging/preview${type === 'edit' ? `?type=edit&id=${id}` : ""}`)
  }

  return (
    <>
      <MainWrap top="0rem" width="100%" maxWidth="1200px">
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            <DashboardHeader
              className="sm:!flex-row sm:!items-center"
            >
              <div className="flex gap-[8px] items-center">
                <Icon.ArrowLeft 
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
                <Typography
                  text={type === 'edit' ? "Edit Message" : "Create New Message"}
                  color="#091525"
                  fontWeight={500}
                  fontSize={window.innerWidth > 728 ? "24px" : "18px"}
                  lineHeight="17.6px"
                  margin="4px 0 0 0"
                />
              </div>
              <Button
                bg='#23211D'
                color='#fff'
                disabled={!recipientArray || !headline || !message}
                onClick={() => {
                  handleContinueToPreview()
                }}
              >
                Preview
              </Button>
            </DashboardHeader>
            <div className="my-[2rem]">
              <InputWrap
                className="!max-w-[600px]"
              >
                <InputField width="48%">
                  <p>Recipient</p>
                  <select 
                      required
                      id='membership_type'
                      value={(recipientArray && recipientArray.length > 0) ? `${recipientArray[0]}` : ""}
                      onChange={(e) => {
                        setRecipientArray((prev:any) => [e.target.value, ...prev])
                      }}
                    >
                        <option value="">Select Membership Type</option>
                        <option value="all">All Members</option>
                        {
                          membershipTypeList.map((item, index) => (
                            <option value={`${item.name}`}>{`${item.name}s`}</option>
                          ))
                        }
                    </select>
                </InputField>
                <InputField width="48%">
                  <p>Search Recipient</p>
                  <input
                    placeholder="Enter Recipient"
                    autoComplete="off"
                    type="text"
                    required
                  />
                </InputField>
                <InputField width="100%">
                  <p>Headline</p>
                  <input
                    placeholder="Enter Headline"
                    autoComplete="off"
                    type="text"
                    required
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </InputField>
                
                <InputField width="100%">
                  <p>Message</p>
                  <ReactQuill 
                    theme="snow" 
                    value={message} 
                    onChange={setMessage} 
                    className="!h-[13rem] !rounded-[10px]"
                    placeholder="Enter Message"
                  />
                </InputField>
              </InputWrap>
            </div>
          </DashboardMain>
        </DashboardFlex>
      </MainWrap>
    </>
  );
};

export default CreateMessage;
