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
import { useNavigate, useSearchParams } from "react-router-dom";
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

const PreviewMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [querySearchFn] = useSearchParams();
  const type = querySearchFn.get('type');
  const { proposedMessageData } = useGeneralState();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: type === 'edit' ? EDIT_MESSAGE : POST_MESSAGE,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: 'success',
        message: type === 'edit' ? "Saved changes successfuly" : 'Message published successfully!'
      })
      navigate("/dashboard/messaging")
      dispatch(updateProposedMessageData(null))
    },
  });

  const handlePost = () => {
    mutateAsync({
      ...proposedMessageData
    })
  }

  return (
    <>
      <MainWrap top="0rem" width="100%" maxWidth="1200px">
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            <DashboardHeader>
              <div className="flex gap-[8px] items-center">
                <Icon.ArrowLeft 
                  onClick={() => navigate(-1)}
                  className="cursor-pointer"
                />
                <Typography
                  text="Preview Message"
                  color="#091525"
                  fontWeight={500}
                  fontSize="24px"
                  lineHeight="17.6px"
                  margin="4px 0 0 0"
                />
              </div>
              {
                type !== 'view' &&
                <div className="flex gap-[8px] items-center">
                  <Button
                      bg='#F3F1EF'
                      color='#23211D'
                      onClick={() => navigate(-1)}
                  >
                      Back
                  </Button>
                  <Button
                      bg='#23211D'
                      color='#fff'
                      onClick={() => handlePost()}
                      disabled={isPending}
                  >
                    {isPending ? <Spinner /> : type === 'edit' ? "Save Changes" : "Post"}
                  </Button>
                </div>
              }
              
            </DashboardHeader>
            <div className="my-[2rem]">
                <h3 
                    style={{
                        whiteSpace: 'pre-line'
                    }}
                    className="text-[#323232] font-[600] text-[22px] leading-[120%] mb-[5px]"
                >
                    {proposedMessageData?.headline}
                </h3>
                <div
                    style={{
                        whiteSpace: 'pre-line'
                    }}
                    className="text-[14px] text-[#6B6B6B] font-[400] mt-[2rem]" 
                    dangerouslySetInnerHTML={{__html: `${proposedMessageData?.message}`}}
                >
                </div>
            </div>
          </DashboardMain>
        </DashboardFlex>
        <BottomNavComp />
      </MainWrap>
    </>
  );
};

export default PreviewMessage;
