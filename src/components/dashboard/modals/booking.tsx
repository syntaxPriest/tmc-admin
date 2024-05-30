import React from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle, Line, PageListItemWrap, PageListItem } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import * as Icon from "iconsax-react";
import { Button } from "../../../styles/reusable";
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import Typography from "../../reusable/typography";

interface PropArgs {
    openToggle: boolean;
    closeFunc: any;
}

const BookingsInfo = ({
    closeFunc,
    openToggle 
} : PropArgs) => {
    return(
        <>
            {openToggle && (
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3></h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <BoxFlex
                        hAlign=""
                        margin='1rem 0'
                        gap="24px"
                    >
                        <img 
                            src='/images/hall.png'
                            alt='House'
                            style={{
                                width: '70px',
                                height: '70px',
                                objectFit: 'cover',
                                borderRadius: "4px"
                            }}
                        />
                        <div>
                            <Typography 
                                text='Main Hall'
                                color='#091525'
                                fontWeight={600}
                                fontSize='24px'
                                lineHeight='24px'
                            />
                            <div className="flex items-center gap-[4px]">
                                <Icon.Calendar color ='#23211D' size={15} />
                                <Typography 
                                    text='Tuesday, May 9  • 4:30 PM'
                                    color='#23211D'
                                    fontWeight={400}
                                    fontSize='12px'
                                    lineHeight='21px'
                                    margin="3px 0 0 0"
                                />
                            </div>
                        </div>
                    </BoxFlex>
                    <Line />
                    <PageListItemWrap
                        style={{
                            margin: '1rem 0 0 0'
                        }}
                    >
                        <PageListItem width='50%'>
                            <p className="font-[300] text-[12px]">Scheduled By</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">Prof. Oluwole Soyinka</p>
                        </PageListItem>
                        <PageListItem width='50%'>
                            <p className="font-[300] text-[12px]">Status</p>
                             <div className="bg-[#FCF9F2] border border-[#EBD7AD] text-[11px] py-[4px] px-[12px] rounded-[300px] text-center w-auto inline-block mt-3">
                                Upcoming
                            </div>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Venue Price</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">₦400,000</p>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Amount Paid</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">₦480,000</p>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Refundable Booking Fee</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">₦80,000</p>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Reminder</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">2 days to booking</p>
                        </PageListItem>
                    </PageListItemWrap>
                </ModalChild>
            </ModalWrap>
            )}
        </>
    )
}

export default BookingsInfo;