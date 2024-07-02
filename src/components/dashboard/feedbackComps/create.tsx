import React, { ChangeEvent, useEffect, useState } from "react";
import {
  MainWrap,
} from "../../../styles/reusable/index";
import SideBarWidget from "../../reusable/sidebar";
import {
  DashboardFlex,
  DashboardHeader,
  DashboardMain,
} from "./../style";
import Typography from "../../reusable/typography";
import * as Icon from "react-feather";
import * as IconSax from "iconsax-react";
import { Button } from "../../../styles/reusable";
import { useNavigate } from "react-router-dom";
import { InputWrap, InputField } from "../../../styles/authentication/index";
import BottomNavComp from "../../reusable/bottomNav";
import { useDispatch } from "react-redux";
import CustomRadio from "../../reusable/customRadio";
import { useMutation } from "@tanstack/react-query";
import { GET_EVENTS } from "../../../api/getApis";
import { CREATE_FEEDBACK } from "../../../api/action";
import { enqueueSnackbar } from "notistack";
import { Spinner } from "../../reusable/spinner";

export interface QuestionLineObject {
  question: string;
  type: string;
  subtext?: string;
}

const CreateFeedback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState<number | undefined>()

  const [firstRatingIndex, setFirstRatingIndex] = useState(-1);
  const [firstTextIndex, setFirstTextIndex] = useState(-1);
  const [questionArray, setQuestionArray] = useState<QuestionLineObject[]>([{
    question: "",
    type: ""
  }]);

  const addLineQuestion = (e: ChangeEvent<HTMLInputElement>, index:number) => {
    questionArray[index].question = e?.target?.value;
    setQuestionArray([...questionArray]);
  }

  const addLineSubtext = (e: ChangeEvent<HTMLInputElement>, index:number) => {
    questionArray[index].subtext = e?.target?.value;
    if (!e.target.value){
      questionArray[index].subtext = undefined;
    }
    setQuestionArray([...questionArray]);
  }

  const addLineType = (value: string, index:number) => {
    questionArray[index].type = value;
    setQuestionArray([...questionArray]);
  }

  const deleteLine = (index:number) => {
    const mockData = questionArray.filter((p, pIndex) => index !== pIndex);
    setQuestionArray([...mockData]);
  }

  // PAST EVENTS
  const [eventsState, setEventsState] = useState({
    events: [],
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: GET_EVENTS,
    onSuccess: (data) => {
      setEventsState((prev) => {
        return {
          ...prev,
          events: data?.data?.body?.events,
        };
      });
    },
  });

  useEffect(() => {
    mutateAsync({
      limit: 200,
      status: "completed",
    });
  }, []);

  // CREATE_FEEDBACK
  const { mutateAsync: createFeedback, isPending:isCreating } = useMutation({
    mutationFn: CREATE_FEEDBACK,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: 'success',
        message: "Feedback created successfully!"
      })
      navigate("/dashboard/feedback")
    },
  });

  const handleSend = () => {
    createFeedback({
      event_id: selectedEvent,
      questions: questionArray
    })
  }

  const isFieldEmpty = <T extends Record<string, any>>(array: T[], field: keyof T): boolean => {
    return array.some((obj: T) => obj[field] === '' || obj[field] === null || obj[field] === undefined);
  };

  useEffect(() => {
    setFirstRatingIndex(questionArray.findIndex((p) => p.type === 'rating'))
    setFirstTextIndex(questionArray.findIndex((p) => p.type === 'text'))
  }, [questionArray])

  return (
    <>
      <MainWrap top="0rem" width="100%" maxWidth="1200px">
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            <DashboardHeader>
              <div className="flex gap-[8px] items-center">
                <Icon.ArrowLeft 
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
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
                disabled={!selectedEvent ||isFieldEmpty(questionArray, 'question') || isFieldEmpty(questionArray, 'type')}
                onClick={() => {
                  handleSend()
                }}
              >
                {isCreating ? <Spinner /> : "Send"}
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
                        setSelectedEvent(Number(e.target.value))
                      }}
                    >
                      <option value="">Select from past events</option>
                      {
                        (eventsState?.events && eventsState?.events.length > 0) && 
                          eventsState?.events.map((item:any, index) => (
                            <option key={index} value={item?.id}>{item?.title}</option>
                          ))
                      }
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

                                  <div className="flex items-center justify-between py-[1rem]">
                                    <p className="!font-bold">Question {questionArray.length > 1 ? `#${index + 1}` : ""}</p>
                                    {
                                      index > 0 &&
                                        <div 
                                          className="cursor-pointer flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#fafafa] hover:opacity-[0.6]"
                                          onClick={() => deleteLine(index)}
                                        >
                                          <IconSax.Trash color="#c82b32" />
                                        </div>
                                    }
                                  </div>
                                  <input
                                      placeholder="Enter Question"
                                      autoComplete="off"
                                      type="text"
                                      required
                                      value={item.question}
                                      onChange={(e) => addLineQuestion(e, index)}
                                  />
                              </InputField>
                              <InputField width="100%">
                                  <p>Subtext (Optional)</p>
                                  <input
                                      placeholder="Enter Question"
                                      autoComplete="off"
                                      type="text"
                                      required
                                      value={item.subtext}
                                      onChange={(e) => addLineSubtext(e, index)}
                                  />
                              </InputField>
                              <InputField width="100%" className="!relative top-[10px]">
                                  <p>Question Type</p>
                              </InputField>
                              <CustomRadio 
                                labelText='Rating'
                                name={`${index}answerType`}
                                activeValue={item.type}
                                id={`${index}rating`}
                                width={"48%"}
                                altFunc={() => addLineType("rating", index)}
                              />
                              <CustomRadio 
                                labelText="Text"
                                name={`${index}answerType`}
                                activeValue={item.type}
                                id={`${index}atext`}
                                width={"48%"}
                                altFunc={() => addLineType("text", index)}
                              />
                              {
                                index === firstRatingIndex &&
                                  <>
                                    <img 
                                      src="/images/rating.png" 
                                      alt="Disclaimer"
                                      className="w-full mt-3" 
                                    />
                                  </>
                              }
                              {
                                index === firstTextIndex &&
                                  <>
                                    <img 
                                      src="/images/text-discl.png" 
                                      alt="Disclaimer"
                                      className="w-full mt-3" 
                                    />
                                  </>
                              }
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
                    type: ""
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
