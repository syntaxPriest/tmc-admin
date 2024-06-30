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
import { useNavigate } from "react-router-dom";
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
import CustomRadio from "../../reusable/customRadio";

const CreateFeedback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [answerType, setAnswerType] = useState<string | boolean>("")
  const { proposedMessageData } = useGeneralState();
  const [questionArray, setQuestionArray] = useState([{
    question: "",
    answerType: ""
  }]);

  useEffect(() => {
    if (proposedMessageData){
      setHeadline(proposedMessageData?.headline)
      setMessage(proposedMessageData?.message)
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
    navigate("/dashboard/messaging/preview")
  }

  return (
    <>
      <MainWrap top="0rem" width="100%" maxWidth="1200px">
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            <DashboardHeader>
              <div className="flex gap-[8px] items-center">
                <Icon.ArrowLeft />
                <Typography
                  text="Create New Feedback"
                  color="#091525"
                  fontWeight={500}
                  fontSize="24px"
                  lineHeight="17.6px"
                  margin="4px 0 0 0"
                />
              </div>
              <Button
                bg='#23211D'
                color='#fff'
                disabled={recipientArray.length < 1 || !headline || !message}
                onClick={() => {
                  handleContinueToPreview()
                }}
              >
                Send
              </Button>
            </DashboardHeader>
            <div className="my-[2rem]">
              <InputWrap
                className="!max-w-[600px]"
              >
                <InputField width="100%">
                  <p>Select Event</p>
                  <select 
                      required
                      id='membership_type'
                      onChange={(e) => {
                        setRecipientArray((prev:any) => [e.target.value, ...prev])
                      }}
                    >
                        <option value="">General Feedback - Sends to everyone</option>
                    </select>
                </InputField>
                {
                    questionArray.map((item, index) => (
                        <>
                            <div
                                key={index}
                                className="w-full flex flex-wrap justify-between border-b pb-4 mb-3"
                            >
                              <InputField width="100%">
                                  <p className="!font-bold">Question {questionArray.length > 1 ? `#${index + 1}` : ""}</p>
                                  <input
                                      placeholder="Enter Question"
                                      autoComplete="off"
                                      type="text"
                                      required
                                      value={""}
                                      // onChange={}
                                  />
                              </InputField>
                              <InputField width="100%">
                                  <p>Subtext (Optional)</p>
                                  <input
                                      placeholder="Enter Question"
                                      autoComplete="off"
                                      type="text"
                                      required
                                      value={""}
                                      // onChange={}
                                  />
                              </InputField>
                              <InputField width="100%" className="!relative top-[10px]">
                                  <p>Question Type</p>
                              </InputField>
                              <CustomRadio 
                                labelText='Rating Scale'
                                name='answerType'
                                activeValue={answerType}
                                setActiveValue={setAnswerType}
                                id='other'
                                width={"48%"}
                              />
                              <CustomRadio 
                                labelText="Text Answer"
                                name='answerType'
                                activeValue={answerType}
                                setActiveValue={setAnswerType}
                                id='tuesday'
                                width={"48%"}
                              />
                          </div>
                        </>
                    ))
                }
              </InputWrap>
              <Button
                bg='#23211D'
                color='#fff'
                disabled={questionArray.length >= 12}
                onClick={() => {
                  setQuestionArray((prev) => prev.concat({
                    question: "",
                    answerType: ""
                  }))
                }}
                className="!py-[8px] !text-[13px]"
              >
                Add another question
              </Button>
            </div>
          </DashboardMain>
        </DashboardFlex>
        <BottomNavComp />
      </MainWrap>
    </>
  );
};

export default CreateFeedback;
