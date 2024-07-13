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
import {
  PageToggleHeader,
  IconFlex,
  ButtonFlex,
} from "../../../styles/reusable/index";
import * as Icon from "react-feather";
import { Button } from "../../../styles/reusable";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { InputWrap, InputField } from "../../../styles/authentication/index";
import EditProfile from "./../edit-profile";
import BottomNavComp from "../../reusable/bottomNav";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setUser } from "../../../store/user/reducer";
import { clearState } from "../../../store/properties/reducer";
import { useCurrentUser } from "../../../store/user/useCurrentUser";
import { removeAfterLogout } from "../../../api/instance";
import CustomRadio from "../../reusable/customRadio";
import { useGeneralState } from "../../../store/general/useGeneral";
import { EDIT_MESSAGE, POST_MESSAGE } from "../../../api/action";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../../reusable/spinner";
import { updateProposedMessageData } from "../../../store/general/reducer";
import { GET_FEEDBACK, GET_MESSAGE, GET_RESPONSE } from "../../../api/getApis";
import PageSpinner from "../../reusable/Spinner/Spinner";
import moment from "moment";
import EmptyState from "../../reusable/emptyState";
import classNames from "classnames";

const FeedbackResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState("questions");
  const [selectedFeedback, setSelectedFeedback] = useState<any>();
  const [feedback, setFeedback] = useState<any>();
  const [ratingResponse, setRatingResponse] = useState<any>();
  const [responses, setResponses] = useState<any>([]);

  function splitArrayIntoObject(array: any) {
    const result: any = {};

    array.forEach((item: any) => {
      const identifier = item.response;
      if (!result[item]) {
        result[identifier] = { title: item?.response, count: 1 };
      } else {
        result[item].count++;
      }
    });

    return result;
  }

  const { mutateAsync: getFeedback, isPending: isGettingFeedback } =
    useMutation({
      mutationFn: GET_FEEDBACK,
      onSuccess: (data) => {
        setFeedback(data?.data?.body?.feedback);
      },
    });

  const { mutateAsync: getResponse, isPending: isGettingResponse } =
    useMutation({
      mutationFn: GET_RESPONSE,
      onSuccess: (data) => {
        setResponses(data?.data?.body?.responses);
        if (selectedFeedback?.type === "rating") {
          setRatingResponse(splitArrayIntoObject(data?.data?.body?.responses));
        }
      },
    });

  useEffect(() => {
    if (id) {
      getFeedback({
        id: id ? Number(id) : 0,
      });
    }
  }, [id]);

  useEffect(() => {
    if (selectedFeedback) {
      getResponse({
        id: selectedFeedback?.id ? Number(selectedFeedback?.id) : 0,
      });
    }
  }, [selectedFeedback]);

  console.log(ratingResponse);
  return (
    <>
      <MainWrap top="0rem" width="100%" maxWidth="1200px">
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            {isGettingFeedback ? (
              <div className="h-[80vh] flex items-center justify-center">
                <PageSpinner
                  // className="border-[#000]"
                  size={"lg"}
                />
              </div>
            ) : (
              <>
                <DashboardHeader>
                  <div className="flex gap-[8px] items-center">
                    <Icon.ArrowLeft
                      onClick={() => {
                        if (phase !== "questions") {
                          setPhase("questions");
                        } else {
                          navigate(-1);
                        }
                      }}
                      className="cursor-pointer"
                    />
                    <Typography
                      text="Back"
                      color="#091525"
                      fontWeight={500}
                      fontSize="24px"
                      lineHeight="17.6px"
                      margin="4px 0 0 0"
                    />
                  </div>
                </DashboardHeader>
                {phase === "questions" ? (
                  <div className="my-[2rem]">
                    <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[2rem] uppercase">
                      General Feedback
                    </p>
                    <p className="text-[14px] text-[#898579] font-[600] mt-1">
                      {feedback?.event?.title} •{" "}
                      {moment(feedback?.event?.time).format("LL")} Feedback
                      {/* {moment(`${item?.created_at}`).startOf('hour').fromNow()} */}
                    </p>
                    <div className="flex flex-col gap-[25px] mt-[2rem] w-[100%] max-w-[750px]">
                      {feedback?.feedback_questions &&
                        feedback?.feedback_questions.length > 0 &&
                        feedback?.feedback_questions.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="relative py-[16px] px-[12px] border rounded-[8px] cursor-pointer hover:opacity-[0.5] hover:top-[-5px]"
                              onClick={() => {
                                setSelectedFeedback(item);
                                setPhase("response");
                              }}
                              style={{
                                transition: "2s",
                              }}
                            >
                              <p className="cursor-pointer font-black text-[16px] max-w-[80%]">
                                {item?.question ? item?.question : "---"}
                              </p>
                              <p className="text-[14px] text-[#898579] font-[400] mt-1">
                                {item.subtext}
                              </p>
                              <p className="text-[14px] text-[#898579] font-[400] mt-1 capitalize">
                                <b>Response Type:</b> {item.type}
                              </p>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ) : (
                  <div className="my-[2rem]">
                    <p className="text-[14px] text-[#6B6B6B] font-[400] mt-[2rem] uppercase">
                      General Feedback
                    </p>
                    <h3 className="text-[20px] text-[#23211D] font-[400] mt-[2rem] uppercase font-black">
                      {selectedFeedback?.question}
                    </h3>
                    <p className="text-[14px] text-[#898579] font-[400] mt-1">
                      {feedback?.event?.title} •{" "}
                      {moment(feedback?.event?.time).format("LL")} Feedback
                      {/* {moment(`${item?.created_at}`).startOf('hour').fromNow()} */}
                    </p>
                    <p className="text-[14px] text-[#23211D] font-[400] mt-[3rem]">
                      {selectedFeedback?.subtext}
                    </p>

                    <div className="mt-[4rem]">
                      {responses && responses.length > 0 ? (
                        <>
                          <h3>{feedback?.response_count} Responses</h3>
                          {selectedFeedback?.type === "text" ? (
                            <>
                              {responses.map((item: any, index: number) => (
                                <div className="mt-2 border-b py-4">
                                  <h3 className="text-[16px] text-[#898579]">
                                    {item?.response}
                                  </h3>
                                  <p className="text-[14px] text-[#23211D]">
                                    {item?.user?.first_name}{" "}
                                    {item?.user?.last_name}
                                  </p>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className="my-[3rem] flex flex-col gap-[20px] w-[100%]">
                              <div className="font-[500] font-[14px]">
                                <p className="mb-2">Very Satisfied</p>
                                <div
                                  className={
                                    "flex items-center gap-[10px] w-[100%]"
                                  }
                                >
                                  <div
                                    className={classNames(
                                      "py-[20px] px-[12px] rounded-[4px] text-[14px] bg-[#C5E6F4] font-[500]",
                                      `!w-[${
                                        ratingResponse["Very Satisfied"]
                                          ? (ratingResponse["Very Satisfied"]
                                              .count /
                                              responses.length) *
                                            70
                                          : 0
                                      }%]`
                                    )}
                                    style={{
                                      width: `${
                                        ratingResponse["Very Satisfied"]
                                          ? (ratingResponse["Very Satisfied"]
                                              .count /
                                              responses.length) *
                                            100
                                          : 0
                                      }%`,
                                    }}
                                  ></div>
                                  <p>
                                    {ratingResponse["Very Satisfied"]
                                      ? ratingResponse["Very Satisfied"].count
                                      : 0}
                                  </p>
                                </div>
                              </div>
                              <div className="font-[500] font-[14px]">
                                <p className="mb-2">Satisfied</p>
                                <div className="flex items-center gap-[10px] w-[60%] min-w-[20%]">
                                  <div
                                    className="py-[20px] px-[12px] rounded-[4px] text-[14px] bg-[#C5E6F4] w-[100%] font-[500]"
                                    style={{
                                      width: `${
                                        ratingResponse["Satisfied"]
                                          ? (ratingResponse["Satisfied"].count /
                                              responses.length) *
                                            100
                                          : 0
                                      }%`
                                    }}
                                  ></div>
                                  <p>
                                    {ratingResponse["Satisfied"]
                                      ? ratingResponse["Satisfied"].count
                                      : 0}
                                  </p>
                                </div>
                              </div>
                              <div className="font-[500] font-[14px]">
                                <p className="mb-2">Neutral</p>
                                <div className="flex items-center gap-[10px] w-[20%] min-w-[20%]">
                                  <div
                                    className="py-[20px] px-[12px] rounded-[4px] text-[14px] bg-[#C5E6F4] w-[100%] font-[500]"
                                    style={{
                                      width: `${
                                        ratingResponse["Neutral"]
                                          ? (ratingResponse["Neutral"].count /
                                              responses.length) *
                                            100
                                          : 0
                                      }%`,
                                    }}
                                  ></div>
                                  <p>
                                    {ratingResponse["Neutral"]
                                      ? ratingResponse["Neutral"].count
                                      : 0}
                                  </p>
                                </div>
                              </div>
                              <div className="font-[500] font-[14px]">
                                <p className="mb-2">UnSatisfied</p>
                                <div className="flex items-center gap-[10px] w-[15%] min-w-[20%]">
                                  <div
                                    className="py-[20px] px-[12px] rounded-[4px] text-[14px] bg-[#C5E6F4] w-[100%] font-[500]"
                                    style={{
                                      width: `${
                                        ratingResponse["UnSatisfied"]
                                          ? (ratingResponse["UnSatisfied"]
                                              .count /
                                              responses.length) *
                                            100
                                          : 0
                                      }%`,
                                    }}
                                  >
                                  </div>
                                  <p>
                                    {ratingResponse["Unsatisfied"]
                                      ? ratingResponse["Unsatisfied"].count
                                      : 0}
                                  </p>
                                </div>
                              </div>
                              <div className="font-[500] font-[14px]">
                                <p className="mb-2">Very UnSatisfied</p>
                                <div className="flex items-center gap-[10px] w-[40%] min-w-[20%]">
                                  <div
                                    className="py-[20px] px-[12px] rounded-[4px] text-[14px] bg-[#C5E6F4] w-[100%] font-[500]"
                                    style={{
                                      width: `${
                                        ratingResponse["Very UnSatisfied"]
                                          ? (ratingResponse["Very UnSatisfied"]
                                              .count /
                                              responses.length) *
                                            100
                                          : 0
                                      }%`,
                                    }}
                                  >
                                  </div>
                                  <p>
                                    {ratingResponse["Very Unsatisfied"]
                                      ? ratingResponse["Very Unsatisfied"].count
                                      : 0}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <EmptyState text="There are no response yet!" />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </DashboardMain>
        </DashboardFlex>
      </MainWrap>
    </>
  );
};

export default FeedbackResponse;
