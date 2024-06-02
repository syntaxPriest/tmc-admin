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

const PreviewMessage = () => {
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
                  text="Preview Message"
                  color="#091525"
                  fontWeight={500}
                  fontSize="24px"
                  lineHeight="17.6px"
                  margin="4px 0 0 0"
                />
              </div>
              <div className="flex gap-[8px] items-center">
                <Button
                    bg='#F3F1EF'
                    color='#23211D'
                >
                    Back
                </Button>
                <Button
                    bg='#23211D'
                    color='#fff'
                >
                    Post
                </Button>
              </div>
            </DashboardHeader>
            <div className="my-[2rem]">
                <h3 
                    style={{
                        whiteSpace: 'pre-line'
                    }}
                    className="text-[#323232] font-[600] text-[22px] leading-[120%] mb-[5px]"
                >
                    {`Welcome to The 
                    Metropolitan Club!`}
                </h3>
                <p
                    style={{
                        whiteSpace: 'pre-line'
                    }}
                    className="text-[14px] text-[#6B6B6B] font-[400]" 
                >
                    {`Dear Esteemed Member,

                    On behalf of The Metropolitan Club, Lagos, I extend a warm and heartfelt welcome to you.

                    It is with great pleasure that I welcome you to our distinguished community, where elegance, sophistication, and camaraderie converge. As the President of this esteemed institution, I take immense pride in the legacy and traditions that define The Metropolitan Club.

                    Founded with a vision to create a sanctuary for those who appreciate the finer things in life, our club has stood as a beacon of excellence in Lagos, providing a haven for individuals to connect, engage, and thrive in an environment of refinement and exclusivity.

                    Whether you are joining us for business networking, social gatherings, or simply seeking a respite from the hustle and bustle of everyday life, The Metropolitan Club promises to exceed your expectations at every turn. Our world-class facilities, impeccable service, and diverse array of events and activities are tailored to cater to your every need and desire.

                    As a member of The Metropolitan Club, you are not just a part of an institution; you are an integral member of a dynamic community of like-minded individuals who share a passion for culture, intellectual discourse, and the pursuit of excellence. Here, friendships are forged, ideas are exchanged, and memories are created that will last a lifetime.

                    I encourage you to take full advantage of all that our club has to offer and to immerse yourself in the rich tapestry of experiences that await you. Whether it's enjoying a gourmet meal in our exquisite dining room, unwinding with a game of tennis on our pristine courts, or attending one of our exclusive cultural events, I am confident that you will find something to delight and inspire you at every turn.

                    As you embark on this journey with us, know that you have the full support and dedication of myself, the Board of Directors, and our entire staff. We are committed to ensuring that your experience at The Metropolitan Club is nothing short of exceptional, and we look forward to welcoming you into our family with open arms.

                    Once again, welcome to The Metropolitan Club, Lagos. May your time with us be filled with joy, fulfillment, and meaningful connections that enrich your life in countless ways.

                    With warmest regards,

                    [President's Signature]

                    [President's Name]
                    President, The Metropolitan Club, Lagos`}
                </p>
            </div>
          </DashboardMain>
        </DashboardFlex>
        <BottomNavComp />
      </MainWrap>
    </>
  );
};

export default PreviewMessage;
