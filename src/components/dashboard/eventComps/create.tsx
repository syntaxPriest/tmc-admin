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

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookieUtils = useCookies();
  const currentUser = useCurrentUser().user;

  const [eventType, setEventType] = useState<string | boolean>('');
  const [activePage, setActivePage] = useState("Profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const logoutUser = async () => {
    await cookieUtils[2]("userToken", undefined);
    dispatch(setUser(null));
    dispatch(clearState());
    removeAfterLogout();
    window.location.href = "/login";
  };

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
                  text="Create Event"
                  color="#091525"
                  fontWeight={500}
                  fontSize="24px"
                  lineHeight="17.6px"
                  margin="4px 0 0 0"
                />
              </div>
            </DashboardHeader>
            <p className="py-3 border-b font-[500] border-[#E1E1E1] text-[#898579]">
              Basic Details
            </p>
            <div className="my-[2rem]">
              <InputWrap>
                <CustomRadio 
                    labelText='Other Event'
                    name='eventType'
                    activeValue={eventType}
                    setActiveValue={setEventType}
                    id='other'
                    width="48%"
                />
                <CustomRadio 
                    labelText="Tuesday's Lunch"
                    name='eventType'
                    activeValue={eventType}
                    setActiveValue={setEventType}
                    id='tuesday'
                    width="48%"
                />
                <InputField width="48%">
                  <p>Event Title</p>
                  <input
                    placeholder="Enter Event Title"
                    autoComplete="off"
                    type="text"
                    required
                  />
                </InputField>
                <InputField width="48%">
                  <p>Location</p>
                  <select name="" id="">
                    <option value="">Select Location</option>
                  </select>
                </InputField>
                <InputField width="48%">
                  <p>Date</p>
                  <input autoComplete="off" type="date" required />
                </InputField>
                <InputField width="48%">
                  <p>Time</p>
                  <input autoComplete="off" type="time" required />
                </InputField>
                <InputField width="48%">
                  <p>Amount</p>
                  <input
                    placeholder="Enter Amount"
                    autoComplete="off"
                    type="number"
                    required
                  />
                </InputField>
                <InputField width="48%">
                  <p>Set Reminder</p>
                  <select name="" id="">
                    <option value="">Select</option>
                  </select>
                </InputField>
                <InputField width="48%">
                  <p>Expected Number of Attendees</p>
                  <input
                    autoComplete="off"
                    type="number"
                    required
                    placeholder="Enter Number"
                  />
                </InputField>
                <InputField width="48%">
                  <p>Special Guest(s) - Optional</p>
                  <input
                    placeholder="Enter Special Guest"
                    autoComplete="off"
                    type="text"
                    required
                  />
                </InputField>
                <InputField width="100%">
                  <p>About this event</p>
                  <textarea
                    placeholder="Enter Event Description"
                    autoComplete="off"
                    required
                    className="!h-[10rem]"
                  ></textarea>
                </InputField>
              </InputWrap>
              <div className="border-b pt-[2rem] pb-[0.5rem]">
                <div className="flex items-center justify-between">
                  <div className="w-[40%]">
                    <h3 className="font-[500] text-[#898579]">Uploads</h3>
                  </div>
                  <Button
                    bg="#F3F1EF"
                    color="#23211D"
                    type="button"
                    width="auto"
                    top="0"
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="border-b pt-[2rem] pb-[0.5rem]">
                <div className="flex items-center justify-between">
                  <div className="w-[40%]">
                    <h3 className="font-[500] text-[#898579]">Gallery</h3>
                  </div>
                  <Button
                    bg="#F3F1EF"
                    color="#23211D"
                    type="button"
                    width="auto"
                    top="0"
                  >
                    Add
                  </Button>
                </div>
              </div>
              <Button
                bg="#23211D"
                color="#fff"
                type="button"
                width="auto"
                top="2rem"
              >
                Create Event
              </Button>
            </div>
          </DashboardMain>
        </DashboardFlex>
        <BottomNavComp />
      </MainWrap>
    </>
  );
};

export default CreateEvent;

const pageItems = ["Profile", "Security", "Login activities"];
