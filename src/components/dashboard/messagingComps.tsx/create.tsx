import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
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

const CreateMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookieUtils = useCookies();
  const currentUser = useCurrentUser().user;

  const [eventType, setEventType] = useState<string | boolean>('');
  const [activePage, setActivePage] = useState("Profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
                  text="Create New Message"
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
                onClick={() => navigate("/dashboard/messaging/preview")}
              >
                Preview
              </Button>
            </DashboardHeader>
            <div className="my-[2rem]">
              <InputWrap
                className="!max-w-[600px]"
              >
                <InputField width="100%">
                  <p>Recipient</p>
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
                  />
                </InputField>
                <InputField width="100%">
                  <p>Message</p>
                  <textarea
                    placeholder="Enter Message"
                    autoComplete="off"
                    required
                    className="!h-[13rem]"
                  ></textarea>
                </InputField>
              </InputWrap>
            </div>
          </DashboardMain>
        </DashboardFlex>
        <BottomNavComp />
      </MainWrap>
    </>
  );
};

export default CreateMessage;
