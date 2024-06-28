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
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { useMutation } from "@tanstack/react-query";
import { GET_USERS } from "../../../api/getApis";
import { User } from "../../../utils/types";
import { CheckIcon } from "@heroicons/react/24/outline";
import { CloseCircle, CloseSquare } from "iconsax-react";
import { enqueueSnackbar } from "notistack";

const CreateMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery] = useSearchParams();

  const [largeUserData, setLargeUserData] = useState<Array<User>>([])
  const [mutableUser, setMutableUser] = useState<Array<User>>([])
  const [selectedUsers, setSelectedUsers] = useState<Array<User>>([])
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false)
  const type = searchQuery.get('type');
  const id = searchQuery.get('id');
  const { proposedMessageData } = useGeneralState();

  const {mutateAsync: getUsers, isPending:isGettingUsers} = useMutation({
		mutationFn: GET_USERS,
		onSuccess: (data) => {
			setLargeUserData(data?.data?.body?.users);
      setMutableUser(data?.data?.body?.users);
		}
	})

  useEffect(() => {
    if (proposedMessageData){
      setHeadline(proposedMessageData?.headline)
      setMessage(proposedMessageData?.message)
      if (proposedMessageData?.receivers && proposedMessageData?.receivers.length > 0){
        setRecipientArray(proposedMessageData?.receivers)
      }
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
      receivers: [...recipientArray, ...selectedUsers.map((item) => { return item.id})]
    }))
    navigate(`/dashboard/messaging/preview${type === 'edit' ? `?type=edit&id=${id}` : ""}`)
  }

  useEffect(() => {
      getUsers({
        limit: 10000
      })
  }, [])

  const handleSearch = (keyword: string) => {
    const modifiedKeyword = keyword.toLowerCase();
    let mockData: User[] = [];
    if (largeUserData && largeUserData.length > 0){
      for (let i = 0; i < largeUserData.length; i++){
        if (
          largeUserData[i].first_name?.toLowerCase().includes(modifiedKeyword) ||
          largeUserData[i].last_name?.toLowerCase().includes(modifiedKeyword) ||
          largeUserData[i].email?.toLowerCase().includes(modifiedKeyword) ||
          largeUserData[i].phone?.includes(modifiedKeyword)
        ){
          mockData.push(largeUserData[i])
        }
      }
    }
    setMutableUser(mockData)
  }

  const exists = (array: User[], id: number | string | undefined): boolean => array.some(obj => obj.id === id);

  const addUserToList = (user: User) => {
    if (!exists(selectedUsers, user?.id)){
      setSelectedUsers((prev) => prev.concat(user))
    }else {
      enqueueSnackbar({
        variant: 'warning',
        message: 'Already added!'
      })
    }
  }

  const removeUserFromList = (user: User) => {
    setSelectedUsers((prev) => prev.filter(p => p.id !== user?.id))
  }

  return (
    <>
      <MainWrap 
        top="0rem" 
        width="100%" 
        maxWidth="1200px"
        onClick={() => setShowSuggestions(false)}
      >
        <DashboardFlex>
          <SideBarWidget />
          <DashboardMain>
            <DashboardHeader
              className="sm:!flex-row sm:!items-center"
            >
              <div className="flex gap-[8px] items-center">
                <Icon.ArrowLeft 
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                />
                <Typography
                  text={type === 'edit' ? "Edit Message" : "Create New Message"}
                  color="#091525"
                  fontWeight={500}
                  fontSize={window.innerWidth > 728 ? "24px" : "18px"}
                  lineHeight="17.6px"
                  margin="4px 0 0 0"
                />
              </div>
              <Button
                bg='#23211D'
                color='#fff'
                disabled={!recipientArray || !headline || !message}
                onClick={() => {
                  handleContinueToPreview()
                }}
              >
                Preview
              </Button>
            </DashboardHeader>
            <div className="my-[2rem]">
              <InputWrap
                className="!max-w-[600px]"
              >
                <InputField width="48%">
                  <p>Recipient</p>
                  <select 
                      required
                      id='membership_type'
                      value={(recipientArray && recipientArray.length > 0) ? `${recipientArray[0]}` : ""}
                      onChange={(e) => {
                        setRecipientArray((prev:any) => [e.target.value])
                      }}
                    >
                        <option value="">Select Membership Type</option>
                        <option value="all">All Members</option>
                        {
                          membershipTypeList.map((item, index) => (
                            <option value={`${item.name}`}>{`${item.name}s`}</option>
                          ))
                        }
                    </select>
                </InputField>
                <InputField width="48%" className="!relative" >
                  <p>Search Recipients from Members</p>
                  <input
                    placeholder="Enter Recipient"
                    autoComplete="off"
                    type="text"
                    required
                    onChange={(e) => {
                      e.stopPropagation();
                      setSearchKeyword(e.target?.value)
                      handleSearch(e.target?.value);
                      // setShowSuggestions(true);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSuggestions(true)
                    }}
                  />
                  {
                      showSuggestions && 
                          <div 
                              className="suggest-card"
                              onClick={(e) => {
                                  e.stopPropagation();
                              }}
                          >
                              {
                                  mutableUser && mutableUser.length > 0 ?
                                      mutableUser.map((item, index) => (
                                          <div 
                                              className={`suggest-wrapper flex justify-between`}
                                              key={index}
                                              style={(index === mutableUser.length - 1)  ? {
                                                  border: 'none'
                                              } : {}}
                                              onClick={() => {
                                                addUserToList(item);
                                                setShowSuggestions(false)
                                              }}
                                          >
                                            <div className='flex items-center py-[0.6rem] cursor-pointer gap-[10px] w-[90%]'>
                                              <img
                                                src='/images/Avatar1.png'
                                                                        className="w-[35px] h-[35px]"
                                                alt='user'
                                              />
                                              <div className='w-[90%]'>
                                                <h3 className='font-medium text-[14px] cursor-pointer'>
                                                  {item.first_name} {item.last_name}
                                                </h3>
                                                <p className='font-light cursor-pointer text-[12px] text-[#70897B]'>
                                                  {item.email ? item.email : "N/A"}
                                                </p>
                                              </div>
                                            </div>
                                              {/* <p 
                                                  className=""
                                                  dangerouslySetInnerHTML={{__html: `${highlightFoundSearchQuery(item.name, searchQuery || '')}`}}
                                              ></p> */}
                                              {
                                                  (exists(selectedUsers, item?.id)) && (
                                                      <CheckIcon className="w-4 h-4" />
                                                  )
                                              } 
                                          </div>
                                      ))
                                  : 
                                  <p 
                                      className="indicator-text"
                                      style={{
                                          padding: '20px'
                                      }}
                                  >
                                      Sorry, no matching result
                                  </p>
                              }
                          </div>
                  }
                </InputField>

                {
                  (selectedUsers && selectedUsers.length > 0) && 
                    <div className="flex items-center gap-[6px] flex-wrap my-[1rem]">
                      {
                        selectedUsers.map((item, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-[10px] text-[12px] border border-[#E5DFD9] text-[#898579] py-1 px-3 rounded-[8px]"
                          >
                              {item.first_name} {item.last_name}
                              <CloseSquare 
                                size={15} 
                                variant="Bold" 
                                color='#898579' 
                                className="cursor-pointer"
                                onClick={() => removeUserFromList(item)}
                              />
                          </div>
                        ))
                      }
                    </div>
                }
                <InputField width="100%">
                  <p>Headline</p>
                  <input
                    placeholder="Enter Headline"
                    autoComplete="off"
                    type="text"
                    required
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </InputField>
                
                <InputField width="100%">
                  <p>Message</p>
                  <ReactQuill 
                    theme="snow" 
                    value={message} 
                    onChange={setMessage} 
                    className="!h-[13rem] !rounded-[10px]"
                    placeholder="Enter Message"
                  />
                </InputField>
              </InputWrap>
            </div>
          </DashboardMain>
        </DashboardFlex>
      </MainWrap>
    </>
  );
};

export default CreateMessage;
