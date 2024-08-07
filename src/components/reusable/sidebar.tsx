import React, { useState } from "react";
import {
  LogoImageWrap,
  LogoImage,
  MainWidget,
  NavHeader,
  NavOption,
  NavItem,
  CloseBtn,
} from "../../styles/reusable/sidebar";
import * as Icon from "iconsax-react";
import { NavLink, Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import * as FeatherIcon from "react-feather";
import {
  HomeIcon,
  BuildingOfficeIcon,
  BookmarkIcon,
  WalletIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { BoxFlex } from "../../styles/reusable/index";
import { RandomCircle } from "../../styles/reusable/index";
import Typography from "./typography";
import { useCurrentUser } from "../../store/user/useCurrentUser";
import AskYesOrNo from "../dashboard/modals/askYesOrNo";
import { removeAfterLogout } from "../../api/instance";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/reducer";
import { clearState } from "../../store/properties/reducer";
import { useCookies } from "react-cookie";
import classNames from "classnames";

interface SideBarProps {
  closeNav?: any;
  mobileDisplay?: string;
}

const SideBarWidget = ({ closeNav, mobileDisplay }: SideBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const cookieUtils = useCookies(["userToken"]);
  const current = location.pathname;
  const currentUser = useCurrentUser().user;
  const [askLogout, setAskLogout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Routes current and active defining.

  const activeIdentifier = (key: string, altKey?: string) => {
    return location.pathname.includes(key) || location.pathname.includes(altKey ? altKey : "...")
  }

  const overviewLinks = ["/dashboard"];
  const overviewActive = overviewLinks.includes(current);
  const membersActive = activeIdentifier("member")
  const eventsActive = activeIdentifier("event")
  const bookingsActive = activeIdentifier("booking")
  const ordersActive = activeIdentifier("order")
  const inventoryActive = activeIdentifier("inventory",  "inventories")
  const transactionsActive = activeIdentifier("transaction")
  const messagingActive = activeIdentifier("messaging")
  const feedbackActive = activeIdentifier("feedback")
  const adminsActive = activeIdentifier("admin")
  const settingsActive = activeIdentifier("settings");

  // Log User Out of app

  const redirectAfterLogOut = () => {
    localStorage.clear();
    removeAfterLogout();
    window.location.href = "/login";
    dispatch(setUser(null));
    dispatch(clearState());
    removeAfterLogout();
    cookieUtils[2]("userToken");
    localStorage.clear();
    const origin = window.location.origin;
    window.location.assign(`${origin}/login`);
  };

  // Open Option
  // const [openOption, setOpenOption] = useState(false);
  // const [activeItem, setActiveItem] = useState<number>(-1);

  const navList = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      link: "/dashboard",
      activeClass: overviewActive,
      action: () => {},
    },
    {
      name: "Members",
      icon: Icon.People,
      link: "/dashboard/members",
      activeClass: membersActive,
      action: () => {},
    },
    {
      name: "Events",
      icon: Icon.Calendar,
      link: "/dashboard/events",
      activeClass: eventsActive,
      action: () => {},
    },
    {
      name: "Bookings",
      icon: Icon.NoteText,
      link: "/dashboard/bookings",
      activeClass: bookingsActive,
      action: () => {},
    },
    {
      name: "Orders",
      icon: Icon.Bag2,
      link: "/dashboard/orders",
      activeClass: ordersActive,
      action: () => {},
    },
    {
      name: "Inventory",
      icon: Icon.Bill,
      link: "/dashboard/inventories",
      activeClass: inventoryActive,
      action: () => {},
    },
    {
      name: "Transactions",
      icon: Icon.Wallet2,
      link: "/dashboard/transactions",
      activeClass: transactionsActive,
      action: () => {},
    },
    {
      name: "Messaging",
      icon: Icon.Messages1,
      link: "/dashboard/messaging",
      activeClass: messagingActive,
      action: () => {},
    },
    {
      name: "Feedback",
      icon: Icon.LikeDislike,
      link: "/dashboard/feedback",
      activeClass: feedbackActive,
      action: () => {},
    },
    {
      name: "Admins",
      icon: Icon.Profile2User,
      link: "/dashboard/admins",
      activeClass: adminsActive,
      action: () => {},
    },
  ];

  return (
    <>
      <MainWidget mobileDisplay={mobileDisplay}>
        <div className="justify-between items-center py-3 hidden sm:flex">
          <div 
            className="w-[22%] border border-[#E1E1E1] rounded-[10rem] py-[4px] px-[8px] flex items-center gap-[8px]"
            onClick={() => setShowMenu(true)}
          >
            <Icon.HambergerMenu size={20} color="var(--primary-color)" />
            <p className="text-[12px] font-[500]">Menu</p>
          </div>
          <NavLink to="/" className="!w-[40%] flex justify-center">
            <LogoImageWrap className="!w-[auto] !m-0">
              <LogoImage width="4rem" src="/tmc.svg" alt="TMC" />
            </LogoImageWrap>
          </NavLink>
          <div className="w-[22%] flex justify-end">
            <RandomCircle 
              size={"40px"}
              onClick={() => navigate("/dashboard/settings")}
            >
              <img
                src={
                  currentUser?.avatar
                    ? currentUser?.avatar
                    : "/images/Avatar1.png"
                }
                alt="Avatar"
              />
            </RandomCircle>
          </div>
        </div>
        <div
          className={classNames(
            "sm:hidden",
            showMenu
              ? "fixed sm:!block w-[100%] h-[100vh] top-0 left-0 z-[100000] bg-black/[.70]"
              : ""
          )}
        >
          <div className={classNames("", showMenu ? "bg-[#fff] w-[80%] h-[100vh] p-[15px]" : "")}>
            <div className="hidden sm:block pt-[1rem] pb-[1rem] border-b border-[#E1E1E1] mb-[1rem]">
              <div 
                className="hidden sm:flex w-[30%] border border-[#E1E1E1] rounded-[10rem] py-[4px] px-[8px] items-center gap-[8px]"
                onClick={() => setShowMenu(false)}
              >
                <Icon.CloseCircle size={20} color="var(--primary-color)" />
                <p className="text-[12px] font-[500]">Close</p>
              </div>
            </div>
            {!showMenu && (
              <NavLink to="/">
                <LogoImageWrap>
                  <LogoImage width="6rem" src="/tmc.svg" alt="TMC" />
                </LogoImageWrap>
              </NavLink>
            )}
            {navList.map((item, index) => (
              <NavLink to={item.link ? item.link : ""} key={index}>
                <NavItem
                  className={`nav-class ${
                    item.activeClass ? "active-nav" : ""
                  }`}
                >
                  <div>
                    {React.createElement(item.icon, {
                      className: "w-5 w-5",
                      variant: "TwoTone"
                    })}
                    <p>{item.name}</p>
                  </div>
                </NavItem>
              </NavLink>
            ))}
            <div className="">
            <div className="mt-7 sm:border-t">
              <NavLink to={"/dashboard/settings"}>
                <NavItem
                  className={`nav-class ${settingsActive ? "active-nav" : ""}`}
                >
                  <div>
                    <Icon.Setting2 className="w-5 h-5" variant="TwoTone" />
                    <p>Settings</p>
                  </div>
                </NavItem>
              </NavLink>
              <NavItem
                className={`nav-class`}
                onClick={() => {
                  setAskLogout(true);
                  setShowMenu(false)
                }}
              >
                <div>
                  <Icon.LogoutCurve className="w-5 h-5" color="#c82b32" variant="TwoTone" />
                  <p className="text-[#c82b32]">Logout</p>
                </div>
              </NavItem>
            </div>
            <NavLink to="/dashboard/settings" className={"sm:hidden"}>
              <BoxFlex 
                gap="8px" 
                margin="1.5rem 0 0 0"
                className="border-t border-[#F3F1EF] pt-5"
              >
                <RandomCircle size={"40px"}>
                  <img
                    src={
                      currentUser?.avatar
                        ? currentUser?.avatar
                        : "/images/Avatar1.png"
                    }
                    alt="Avatar"
                  />
                </RandomCircle>
                <div>
                  <Typography
                    // text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                    text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                    color="#091525"
                    fontWeight={500}
                    fontSize="14px"
                    lineHeight="21px"
                  />
                  <Typography
                    // text={`${currentUser?.first_name} ${currentUser?.last_name}`}
                    text={`${currentUser?.email}`}
                    color="#091525"
                    fontWeight={300}
                    fontSize="12px"
                    lineHeight="21px"
                  />
                </div>
              </BoxFlex>
            </NavLink>
            </div>
          </div>
        </div>
      </MainWidget>
      <AskYesOrNo
        openToggle={askLogout}
        headerText="Log Out"
        question="Are you sure you want to log out of your account?"
        declineText="Cancel"
        actionText="Log Out"
        yesAction={() => redirectAfterLogOut()}
        noAction={() => setAskLogout(false)}
      />
    </>
  );
};

export default SideBarWidget;
