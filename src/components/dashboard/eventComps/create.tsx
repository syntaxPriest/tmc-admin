import React, { type Dispatch, ChangeEvent, useState, SetStateAction, useEffect } from "react";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { NumericFormat } from "react-number-format";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { CREATE_EVENT, EDIT_EVENT } from "../../../api/action";
import { Spinner } from "../../reusable/spinner";
import { EventStateProps } from "./single";
import { GET_SINGLE_EVENT } from "../../../api/getApis";
import { getCdnLink } from "../../../utils/imageParser";

export interface eventDataProps {
  title?: string,
  location?: string,
  amount?: number,
  reminder_time_to_event_in_days?: string,
  expected_number_of_attendees?: string,
  special_guests?: string,
  about?: string,
  date?: string,
  time?: string,
  status?: string,
  cover?: {
    url: string;
  },
  initialCover?: {
    url: string;
  },
  media?: Array<{
    url: string;
  }>
  initialMedia?: Array<{
    url: string;
  }>
}

const CreateEvent = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const location = useLocation();

  const isStringInRoute = location.pathname.includes('edit');

  const [eventType, setEventType] = useState<string | boolean>('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryFormDataArray, setGalleryFormDataArray] = useState<FormData[]>([]);
  const [uploadsFiles, setUploadsFiles] = useState<File[]>([]);
  const [uploadsFormDataArray, setUploadsFormDataArray] = useState<FormData[]>([]);
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [coverFormDataArray, setCoverFormDataArray] = useState<FormData[]>([]);

  // Event creation datas
  const [eventCreationData, setEventCreationData] = useState<eventDataProps>()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

    const {id, value} = e.target;

    setEventCreationData((prev) => {  return {
      ...prev,
      [id]: value
    }})
  }

   const handleFileChange = (event: ChangeEvent<HTMLInputElement>, files:any, setFiles: Dispatch<SetStateAction<any>>, setFormDataArray: Dispatch<SetStateAction<any>>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      // Merge new files with existing files
      const updatedFiles = [...files, ...selectedFiles];
      setFiles(updatedFiles);

      // Create FormData objects for each file and merge with existing formDataArray
      
      const formData = new FormData();
      const newFormDataArray = selectedFiles.map((file) => {
        formData.append('fieldname', file.name);
        formData.append('file', file);
        return formData;
      });

      setFormDataArray((prevFormDataArray:any) => [...prevFormDataArray, ...newFormDataArray]);
    }
  };

  const handleRemoveFile = (index: number, files: any, formDataArray:any, setFiles: Dispatch<SetStateAction<any>>, setFormDataArray: Dispatch<SetStateAction<any>>) => {
    const updatedFiles = files.filter((_:any, i:number) => i !== index);
    setFiles(updatedFiles);

    const updatedFormDataArray = formDataArray.filter((_:any, i:number) => i !== index);
    setFormDataArray(updatedFormDataArray);
  };

  const {mutateAsync, isPending} = useMutation({
    mutationFn: isStringInRoute ? EDIT_EVENT : CREATE_EVENT,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: 'success',
        message: isStringInRoute ? 'Saved changes made successfully' : 'Event created successfully!'
      })
      navigate("/dashboard/events")
    }
  })

  const handleCreate = () => {
    const formData:any = new FormData();
    if (eventCreationData && Object.keys(eventCreationData).length > 0){
      Object.entries(eventCreationData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (isStringInRoute){
        formData.append("id", id)
      }
      formData.delete("time")
      formData.append("time", `${eventCreationData?.date} ${eventCreationData?.time}`)
      formData.delete("date")
      formData.delete("initialCover")
      formData.delete("initialMedia")

      galleryFiles.forEach((file) => {
        formData.append('media', file); // Use the same key for all files
      });


      uploadsFiles.forEach((file) => {
        formData.append('docs', file); // Use the same key for all files
      });

      coverFiles.forEach((file) => {
        formData.append('cover', file); // Use the same key for all files
      });
      formData.append('type', `${eventType.toString().replace("_", " ").toLocaleUpperCase()}`); // Use the same key for all files
    }
    mutateAsync(formData)
  }

  // EDIT ACTIONS

  const { mutateAsync:getEvent, isPending:isGettingEvent } = useMutation({
    mutationFn: GET_SINGLE_EVENT,
    onSuccess: (data) => {
      setEventCreationData({
        title: data?.data?.body?.event?.title,
        about: data?.data?.body?.event?.about,
        location: data?.data?.body?.event?.location,
        amount: data?.data?.body?.event?.amount,
        expected_number_of_attendees: data?.data?.body?.event?.expected_number_of_attendees,
        special_guests: data?.data?.body?.event?.special_guests,
        time: `${data?.data?.body?.event?.time.split('T')[1].split('.')[0]}`,
        date: data?.data?.body?.event?.time.split('T')[0],
        reminder_time_to_event_in_days: data?.data?.body?.event?.reminder_time_to_event_in_days,
        initialCover: data?.data?.body?.event?.cover,
        initialMedia: data?.data?.body?.event?.media,
      });
      setEventType(data?.data?.body?.event?.type.replaceAll(" ", "_").toLowerCase());
    },
  });

  useEffect(() => {
    if (id){
        getEvent({
            id,
        });
    }
  }, [id]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <MainWrap top="0rem" width="100%" maxWidth="1200px">
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            <DashboardHeader>
              <div className="flex gap-[8px] items-center">
                <Icon.ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
                <Typography
                  text={isStringInRoute ? "Edit Event" : "Create Event"}
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
                    id='title'
                    value={eventCreationData?.title}
                    onChange={handleChange}
                  />
                </InputField>
                <InputField width="48%">
                  <p>Location</p>
                  <input
                    placeholder="Enter Location"
                    autoComplete="off"
                    type="text"
                    required
                    value={eventCreationData?.location}
                    id='location'
                    onChange={handleChange}
                  />
                </InputField>
                <InputField width="48%">
                  <p>Date</p>
                  <input 
                    autoComplete="off" 
                    type="date" 
                    required 
                    id='date'
                    onChange={handleChange}
                    min={today}
                    value={eventCreationData?.date}
                  />
                </InputField>
                <InputField width="48%">
                  <p>Time</p>
                  <input 
                    autoComplete="off" 
                    type="time" 
                    required 
                    id='time'
                    value={eventCreationData?.time}
                    onChange={handleChange}
                  />
                </InputField>
                <InputField width="48%">
                  <p>Amount(&#8358;)</p>
                  <NumericFormat
                    placeholder="Enter Amount"
                    autoComplete="off"
                    type="tel"
                    value={eventCreationData?.amount}
                    id='amount'
                    onChange={(e) => setEventCreationData((prev) => { return {
                      ...prev,
                      amount: Number(e.target.value.replaceAll(",", "")),
                    }})}
                    thousandSeparator
                  />
                </InputField>
                <InputField width="48%">
                  <p>Set Reminder</p>
                  <select 
                    name="" 
                    id='reminder_time_to_event_in_days'
                    onChange={handleChange}
                    value={eventCreationData?.reminder_time_to_event_in_days}
                  >
                    <option value="">Select</option>
                    {
                      [1, 2, 3, 4, 5].map((item) => (
                        <option value={item}>{item} {item > 1 ? "days" : "day"} to event</option>
                      ))
                    }
                  </select>
                </InputField>
                <InputField width="48%">
                  <p>Expected Number of Attendees</p>
                  <input
                    autoComplete="off"
                    type="number"
                    required
                    placeholder="Enter Number of expected attendees"
                    id='expected_number_of_attendees'
                    onChange={handleChange}
                    value={eventCreationData?.expected_number_of_attendees}
                  />
                </InputField>
                <InputField width="48%">
                  <p>Special Guest(s) - Optional</p>
                  <input
                    placeholder="Enter Special Guest"
                    autoComplete="off"
                    type="text"
                    id='special_guests'
                    onChange={handleChange}
                    value={eventCreationData?.special_guests}
                  />
                </InputField>
                <InputField width="100%">
                  <p>About this event</p>
                  <textarea
                    placeholder="Enter Event Description"
                    autoComplete="off"
                    required
                    className="!h-[10rem]"
                    id='about'
                    onChange={handleChange}
                    maxLength={500}
                    value={eventCreationData?.about}
                  ></textarea>
                </InputField>
              </InputWrap>
              <div className="border-b pt-[2rem] pb-[0.5rem]">
                <div className="flex items-center justify-between">
                  <div className="w-[40%]">
                    <h3 className="font-[500] text-[#898579]">Add Event Cover Image</h3>
                  </div>
                  <input 
                    className="hidden" 
                    id="cover_images" 
                    type="file" 
                    multiple={false} 
                    onChange={(e) => handleFileChange(
                      e,
                      coverFiles,
                      setCoverFiles,
                      setCoverFormDataArray
                    )} 
                  />
                  <label htmlFor={coverFiles && coverFiles.length > 0 ? "" : "cover_images"}>
                    <div
                      className={classNames("cursor-pointer bg-[#F3F1EF] text-[#23211D] rounded-[8px] py-3 px-5 font-[500]", coverFiles && coverFiles.length > 0 ? "opacity-[0.4]" :"")}
                    >
                      Add
                    </div>
                  </label>
                </div>
                <div className="flex justify-between flex-wrap gap-[15px] my-[1.5rem]">
                  {
                    (coverFiles && coverFiles.length > 0) && 
                      coverFiles.map((file, index) => (
                        <div 
                          key={index}
                          className="relative"
                        >
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt=""
                            className="w-[100px] h-[100px] rounded-[8px] object-cover" 
                            onClick={() => handleRemoveFile(
                              index,
                              coverFiles,
                              coverFormDataArray,
                              setCoverFiles,
                              setCoverFormDataArray
                            )}
                          />
                        </div>
                      ))
                  }
                  {
                    (eventCreationData?.initialCover && Object.keys(eventCreationData?.initialCover).length > 0) && 
                        <div 
                          className="relative"
                        >
                          <img 
                            src={`${getCdnLink(eventCreationData?.initialCover?.url, 'event')}`} 
                            alt=""
                            className="w-[100px] h-[100px] rounded-[8px] object-cover" 
                          />
                        </div>
                  }
                </div>
              </div>
              <div className="border-b pt-[2rem] pb-[0.5rem]">
                <div className="flex items-center justify-between">
                  <div className="w-[40%]">
                    <h3 className="font-[500] text-[#898579]">Uploads</h3>
                  </div>
                  <input 
                    className="hidden" 
                    id="uploads_images" 
                    type="file" 
                    multiple 
                    onChange={(e) => handleFileChange(
                      e,
                      uploadsFiles,
                      setUploadsFiles,
                      setUploadsFormDataArray
                    )} 
                  />
                  <label htmlFor="uploads_images">
                    <div
                      className="cursor-pointer bg-[#F3F1EF] text-[#23211D] rounded-[8px] py-3 px-5 font-[500]"
                    >
                      Add
                    </div>
                  </label>
                </div>
                <div className="flex flex-wrap gap-[15px] my-[1.5rem]">
                  {
                    (uploadsFiles && uploadsFiles.length > 0) && 
                      uploadsFiles.map((file, index) => (
                        <div 
                          key={index}
                          className="relative"
                        >
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt=""
                            className="w-[100px] h-[100px] rounded-[8px] object-cover" 
                            onClick={() => handleRemoveFile(
                              index,
                              uploadsFiles,
                              uploadsFormDataArray,
                              setUploadsFiles,
                              setUploadsFormDataArray
                            )}
                          />
                        </div>
                      ))
                  }
                </div>
              </div>
              <div className="border-b pt-[2rem] pb-[0.5rem]">
                <div className="flex items-center justify-between">
                  <div className="w-[40%]">
                    <h3 className="font-[500] text-[#898579]">Gallery</h3>
                  </div>
                  <input 
                    className="hidden" 
                    id="gallery_images" 
                    type="file" 
                    multiple 
                    onChange={(e) => handleFileChange(
                      e,
                      galleryFiles,
                      setGalleryFiles,
                      setGalleryFormDataArray
                    )} 
                  />
                  <label htmlFor="gallery_images">
                    <div
                      className="cursor-pointer bg-[#F3F1EF] text-[#23211D] rounded-[8px] py-3 px-5 font-[500]"
                    >
                      Add
                    </div>
                  </label>
                </div>
                <div className="flex flex-wrap gap-[15px] my-[1.5rem]">
                  {
                    (galleryFiles && galleryFiles.length > 0) && 
                      galleryFiles.map((file, index) => (
                        <div 
                          key={index}
                          className="relative"
                        >
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt=""
                            className="w-[100px] h-[100px] rounded-[8px] object-cover" 
                            onClick={() => handleRemoveFile(
                              index,
                              galleryFiles,
                              galleryFormDataArray,
                              setGalleryFiles,
                              setGalleryFormDataArray
                            )}
                          />
                        </div>
                      ))
                  }
                </div>
                {(eventCreationData?.initialMedia && eventCreationData?.initialMedia.length > 0) && (
                  <div>
                    <h3>Current Gallery</h3>
                      <div className="flex flex-wrap gap-[15px] my-[1.5rem]">
                        {
                          (eventCreationData?.initialMedia && eventCreationData?.initialMedia.length > 0) && 
                            eventCreationData?.initialMedia.map((file, index) => (
                              <div 
                                key={index}
                                className="relative"
                              >
                                <img 
                                  src={`${getCdnLink(file.url,'event')}`} 
                                  alt=""
                                  className="w-[100px] h-[100px] rounded-[8px] object-cover" 
                                />
                              </div>
                            ))
                        }
                      </div>
                  </div>
                )}
              </div>
              <Button
                bg="#23211D"
                color="#fff"
                type="button"
                width="auto"
                top="2rem"
                onClick={() => handleCreate()}
                disabled={
                  isPending || 
                  !eventCreationData?.title ||
                  !eventCreationData?.about || 
                  !eventCreationData?.location ||
                  !eventCreationData?.date ||
                  !eventCreationData?.time ||
                  !eventCreationData?.expected_number_of_attendees ||
                  !eventCreationData?.reminder_time_to_event_in_days ||
                  (!isStringInRoute && 
                  coverFiles.length < 1 )
                }
              >
                {isPending ? <Spinner /> : isStringInRoute ? "Save Changes" : "Create Event"}
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
