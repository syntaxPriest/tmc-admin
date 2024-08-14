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
  ProgressBar,
} from "./../style";
import QuickActionWidget from "../../reusable/quickaction";
import Typography from "../../reusable/typography";
import {
  PageToggleHeader,
  IconFlex,
  ButtonFlex,
} from "../../../styles/reusable/index";
import * as Icon from "react-feather";
import * as IconSax from "iconsax-react";
import { Button } from "../../../styles/reusable";
import { useNavigate, useParams } from "react-router-dom";
import {
  InputWrap,
  InputField,
  AuthBacknav,
} from "../../../styles/authentication/index";
import EditProfile from "./../edit-profile";
import BottomNavComp from "../../reusable/bottomNav";
import {
  ArrowLeftOnRectangleIcon,
  EllipsisVerticalIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setUser } from "../../../store/user/reducer";
import { clearState } from "../../../store/properties/reducer";
import { useCurrentUser } from "../../../store/user/useCurrentUser";
import { removeAfterLogout } from "../../../api/instance";
import TransactionCard from "../TransactionCard";
import { members } from "../members";
import PaginationComp from "../../reusable/pagination";
import { GET_ATTENDEES, GET_SINGLE_EVENT } from "../../../api/getApis";
import { useMutation } from "@tanstack/react-query";
import { eventDataProps } from "./create";
import commaNumber from "comma-number";
import PageSpinner from "../../reusable/Spinner/Spinner";
import { getCdnLink } from "../../../utils/imageParser";
import EmptyState from "../../reusable/emptyState";
import MembersSkeleton from "../../skeletons/members";
import { Paginate } from "../../reusable/paginationComp";

export interface EventStateProps {
  data: eventDataProps;
  attendees: any;
  attendeesCount: number;
}

const SingleEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const cookieUtils = useCookies();
  const currentUser = useCurrentUser().user;

  const [activePage, setActivePage] = useState("Details");
  const [page, setPage] = useState<number | undefined>(1);
  const [eventState, setEventState] = useState<EventStateProps>({
    data: {},
    attendees: [],
    attendeesCount: 0,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: GET_SINGLE_EVENT,
    onSuccess: (data) => {
      setEventState((prev) => {
        return {
          ...prev,
          data: data?.data?.body?.event,
        };
      });
    },
  });

  const { mutateAsync: getAttendees, isPending: isGettingAttendees } =
    useMutation({
      mutationFn: GET_ATTENDEES,
      onSuccess: (data) => {
        setEventState((prev) => {
          return {
            ...prev,
            attendees: data?.data?.body?.attendees,
            attendeesCount: data?.data?.body?.total_attendees,
          };
        });
      },
    });

  useEffect(() => {
    if (id) {
      mutateAsync({
        id,
      });
      getAttendees({
        id,
        offset: Number(page) - 1,
      });
    }
  }, [id]);

  return (
    <>
      <MainWrap top="0rem" width="100%" maxWidth="1200px">
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            {isPending ? (
              <div className="h-[80vh] flex items-center justify-center">
                <PageSpinner
                  // className="border-[#000]"
                  size={"lg"}
                />
              </div>
            ) : (
              <>
                <AuthBacknav onClick={() => navigate(-1)}>
                  <Icon.ArrowLeft color="#8796AD" size={20} />
                  <p>Back</p>
                </AuthBacknav>
                <div className="flex items-center justify-between py-8 border-b border-[#E1E1E1] sm:items-end">
                  <BoxFlex width="60%" gap="16px" vAlign="center">
                    <img
                      src={`${getCdnLink(
                        `${eventState?.data?.cover}`,
                        "event"
                      )}`}
                      alt="User"
                      className="w-[80px] rounded-[8px]"
                    />
                    <div className="w-[80%]">
                      <Typography
                        text={`${eventState?.data?.title}`}
                        color="#091525"
                        fontWeight={700}
                        fontSize="20px"
                        lineHeight="22px"
                        margin="0 0 0.4rem 0"
                      />
                      <Typography
                        text={
                          Number(eventState?.data?.amount)
                            ? `₦${commaNumber(
                                Number(eventState?.data?.amount)
                              )}`
                            : "Free"
                        }
                        color="#091525"
                        fontWeight={400}
                        fontSize="16px"
                        lineHeight="22px"
                        margin="0 0 0.4rem 0"
                      />
                      <div className="bg-[#FCF9F2] border border-[#EBD7AD] text-[12px] py-[4px] px-[12px] rounded-[300px] text-center w-auto inline-block capitalize">
                        {`${eventState?.data?.status}`}
                      </div>
                    </div>
                  </BoxFlex>
                  <div className="flex gap-[10px] sm:flex-col">
                    <Button
                      bg="#F3F1EF"
                      color="#23211D"
                      type="button"
                      width="auto"
                      top="0"
                      disabled
                    >
                      Export
                    </Button>
                    <Button
                      bg="#23211D"
                      color="#fff"
                      type="button"
                      width="auto"
                      top="0"
                      onClick={() => navigate(`/dashboard/event/edit/${id}`)}
                    >
                      Edit Event
                    </Button>
                  </div>
                </div>
                <PageToggleHeader hAlign="start" className="!mt-6">
                  {pageItems.map((item, index) => (
                    <PageToggleText
                      key={index}
                      active={item === activePage}
                      onClick={() => setActivePage(item)}
                    >
                      {item}
                    </PageToggleText>
                  ))}
                </PageToggleHeader>
                {activePage === "Details" ? (
                  <>
                    <DashboardInner
                      style={{
                        margin: 0,
                      }}
                      className="!justify-start"
                    >
                      <div className="grid grid-cols-3 gap-[30px] sm:grid-cols-2">
                        <div>
                          <p className="text-[13px]">Location</p>
                          <h3 className="text-[15px] font-[600]">{`${eventState?.data?.location}`}</h3>
                        </div>
                        <div>
                          <p className="text-[13px]">Date</p>
                          <h3 className="text-[15px] font-[600]">{`${new Date(
                            `${eventState?.data?.time}`
                          ).toDateString()}`}</h3>
                        </div>
                        <div>
                          <p className="text-[13px]">Time</p>
                          <h3 className="text-[15px] font-[600]">{`${new Date(
                            `${eventState?.data?.time}`
                          ).toLocaleTimeString()}`}</h3>
                        </div>
                        <div>
                          <p className="text-[13px]">Expected Attendees</p>
                          <h3 className="text-[15px] font-[600]">{`${eventState?.data?.expected_number_of_attendees}`}</h3>
                        </div>
                        <div>
                          <p className="text-[13px]">Reminders</p>
                          <h3 className="text-[15px] font-[600]">
                            {`${eventState?.data?.reminder_time_to_event_in_days}`}{" "}
                            {Number(
                              eventState?.data?.reminder_time_to_event_in_days
                            ) > 1
                              ? "days"
                              : "day"}{" "}
                            to event
                          </h3>
                        </div>
                        <div>
                          <p className="text-[13px]">Special Guest(s)</p>
                          <h3 className="text-[15px] font-[600]">{`${eventState?.data?.special_guests ? eventState?.data?.special_guests: 'Non'}`}</h3>
                        </div>
                        <div>
                          <p className="text-[13px]">Total Payment Collected</p>
                          <h3 className="text-[15px] font-[600]">---</h3>
                        </div>
                      </div>
                      <div>
                        <p className="text-[13px] mt-[2rem] mb-[0.6rem] font-[500] text-[#898579]">
                          About Event
                        </p>
                        <h3 className="text-[15px] font-[400]">{`${eventState?.data?.about}`}</h3>
                      </div>
                      {eventState?.data?.menu_items &&
                        eventState?.data?.menu_items.length > 0 && (
                          <>
                            <div className="border-b pt-[2rem] pb-[0.5rem]">
                              <div className="flex items-center justify-between">
                                <div className="w-[40%]">
                                  <h3 className="font-[500] text-[#898579]">
                                    Menu
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-start flex-wrap my-[1rem] mb-[2rem] gap-[25px]">
                              {
                                eventState?.data?.menu_items.map((item, index) => (
                                  <div 
                                    key={index}
                                    className="flex items-center gap-[10px] w-[48%]"
                                  >
                                    <img
                                      src={item?.product?.cover ? `${getCdnLink(`${item?.product?.cover}`, 'inventory')}` : "/images/eat.png"}
                                      className="w-[90px] h-[90px] rounded-[8px]"
                                      alt=""
                                    />
                                    <div className="w-[70%]">
                                      <p className="font-semibold">
                                        {item?.product?.title}
                                      </p>
                                      <p>₦{commaNumber(Number(item?.product?.amount))}</p>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </>
                        )}
                      {/* <div>
                                                <p className='text-[16px] mt-[2rem] mb-[0.6rem] font-[500] text-[#898579]'>Uploads</p>
                                                <div className="flex items-center gap-[24px]">
                                                    <div className="flex items-center gap-[10px] bg-[#FCF9F2] border border-[#E1E1E1] rounded-[10px] py-2 px-9 w-[30%]">
                                                        <PaperClipIcon className='w-5 h-5' color='#898579' />
                                                        <div>
                                                            <h3 className='text-[15px] font-[600]'>Event document</h3>
                                                            <p className='text-[13px] text-[#898579]'>2 min read</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-[10px] bg-[#FCF9F2] border border-[#E1E1E1] rounded-[10px] py-2 px-9 w-[30%]">
                                                        <PaperClipIcon className='w-5 h-5' color='#898579' />
                                                        <div>
                                                            <h3 className='text-[15px] font-[600]'>Event document</h3>
                                                            <p className='text-[13px] text-[#898579]'>2 min read</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                      <div>
                        <p className="text-[16px] mt-[2rem] mb-[0.6rem] font-[500] text-[#898579]">
                          Cover Image
                        </p>
                        <img
                          src={`${getCdnLink(
                            `${eventState?.data?.cover}`,
                            "event"
                          )}`}
                          alt="Event Cover"
                          className="w-[120px] h-[120px] rounded-[8px]"
                        />
                      </div>
                      {eventState?.data?.media &&
                        eventState?.data?.media.length > 0 && (
                          <div>
                            <p className="text-[16px] mt-[2rem] mb-[0.6rem] font-[500] text-[#898579]">
                              Gallery
                            </p>
                            <div className="flex flex-wrap gap-[15px] my-[1.5rem]">
                              {eventState?.data?.media.map(
                                (item: any, index: number) => (
                                  <img
                                    key={index}
                                    src={`${getCdnLink(item?.url, "event")}`}
                                    alt="Event Cover"
                                    className="w-[120px] h-[120px] rounded-[8px]"
                                  />
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </DashboardInner>
                  </>
                ) : null}
                {activePage === "Attendees" && (
                  <>
                    <DashboardInner
                      style={{
                        margin: 0,
                      }}
                      className="!justify-start"
                    >
                      {isGettingAttendees ? (
                        <MembersSkeleton />
                      ) : eventState?.attendees.length > 0 ? (
                        <>
                        <p className="my-5"><b>Number of registered attendees: </b> {eventState?.attendeesCount}</p>
                        <div className="overflow-x-auto">
                          {/* Table Header */}
                          <div className="flex items-end mt-[0rem] py-2 border-b gap-[10px] font-[500] text-[#23211D] sm:w-[50rem]">
                            <p className="flex-[6] text-[14px]">Member</p>
                            <p className="flex-[2] text-[14px]">ID No.</p>
                            <p className="flex-[3] text-[14px]">Phone Number</p>
                            <p className="flex-[3] text-[14px]">
                              Registered On
                            </p>
                            {/* <p className='flex-[1] text-[14px]'></p> */}
                          </div>
                          {eventState?.attendees &&
                            eventState?.attendees.length > 0 &&
                            eventState?.attendees.map(
                              (item: any, index: number) => (
                                <div
                                  className="flex items-center gap-[10px] py-[20px] cursor-pointer border-b text-[#05150C] sm:w-[50rem]"
                                  onClick={() =>
                                    navigate(`/dashboard/member/${index + 1}`)
                                  }
                                >
                                  <div className="flex flex-[6] items-center cursor-pointer gap-[10px]">
                                    <img
                                      src="/images/Avatar1.png"
                                      className="w-[35px] h-[35px]"
                                      alt="user"
                                    />
                                    <div className="w-[90%]">
                                      <h3 className="font-medium text-[14px] cursor-pointer">
                                        {item?.user?.first_name}{" "}
                                        {item?.user?.last_name}
                                      </h3>
                                      <p className="font-light cursor-pointer text-[12px] text-[#70897B]">
                                        {item?.user?.email
                                          ? item?.user?.email
                                          : "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="flex-[2] cursor-pointer text-[14px] ellipse w-[3rem]">
                                    {item?.user?.id ? item?.user?.id : "N/A"}
                                  </p>
                                  <p className="flex-[3] cursor-pointer text-[14px]">
                                    {item.phone ? item.phone : "N/A"}
                                  </p>
                                  <p className="flex-[3] cursor-pointer text-[14px]">
                                    {`${new Date(
                                      item.created_at
                                    ).toDateString()}`}
                                  </p>
                                  {/* <p className='flex-[1] text-[14px] flex justify-end text-right'>
                                                                <EllipsisVerticalIcon
                                                                    className='w-6 h-6 mr-[10px]'
                                                                    color='#70897B'
                                                                />
                                                            </p> */}
                                </div>
                              )
                              
                            )}
                          {eventState?.attendeesCount > 20 && (
                            <Paginate
                              itemsPerPage={20}
                              pageCount={Math.ceil(
                                Number(eventState?.attendeesCount) / 20
                              )}
                              page={page}
                              setPage={setPage}
                              totalItems={eventState?.attendeesCount}
                            />
                          )}
                        </div>
                        </>
                      ) : (
                        <EmptyState text="No registered attendee yet" />
                      
                      )}
                    </DashboardInner>
                  </>
                )}
              </>
            )}
          </DashboardMain>
        </DashboardFlex>
      </MainWrap>
    </>
  );
};

export default SingleEvent;

const pageItems = ["Details", "Attendees"];
