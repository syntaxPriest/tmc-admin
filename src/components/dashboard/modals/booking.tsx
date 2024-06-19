import React from "react";
import { ModalWrap, ModalChild, ModalHeader, MainModalView, ButtonFlex, BottomButtonWrap, BoxFlex, RandomCircle, Line, PageListItemWrap, PageListItem } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import * as Icon from "iconsax-react";
import { Button } from "../../../styles/reusable";
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import Typography from "../../reusable/typography";
import { getCdnLink } from "../../../utils/imageParser";
import commaNumber from "comma-number";

interface PropArgs {
    openToggle: boolean;
    closeFunc: any;
    selectedBooking: any;
}

const BookingsInfo = ({
    closeFunc,
    openToggle,
    selectedBooking
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
                            src={selectedBooking.product?.cover ? `${getCdnLink(`${selectedBooking.product?.cover}`, 'event')}` : '/images/dummy.jpeg'}
                            alt='Inventory'
                            style={{
                                width: '70px',
                                height: '70px',
                                objectFit: 'cover',
                                borderRadius: "4px"
                            }}
                        />
                        <div>
                            <Typography 
                                text={selectedBooking.product?.title ? selectedBooking.product?.title : 'N/A'}
                                color='#091525'
                                fontWeight={600}
                                fontSize='24px'
                                lineHeight='24px'
                            />
                            <div className="flex items-center gap-[4px]">
                                <Icon.Calendar color ='#23211D' size={15} />
                                <Typography 
                                    text={`${new Date(`${selectedBooking?.start_date}`).toDateString()} • ${selectedBooking.time}`}
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
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">{selectedBooking.user?.first_name} {selectedBooking.user?.last_name}</p>
                        </PageListItem>
                        <PageListItem width='50%'>
                            <p className="font-[300] text-[12px]">Status</p>
                             <div className="bg-[#FCF9F2] border border-[#EBD7AD] text-[11px] py-[4px] px-[12px] rounded-[300px] text-center w-auto inline-block mt-3">
                                {new Date(selectedBooking?.start_date) > new Date() ?  "Upcoming" : "Completed"}
                            </div>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Venue Price</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">₦{commaNumber(selectedBooking?.amount)}</p>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Amount Paid</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">₦{commaNumber(selectedBooking?.amount)}</p>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Refundable Booking Fee</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">---</p>
                        </PageListItem>
                        <PageListItem width='50%' className="!mt-7">
                            <p className="font-[300] text-[12px]">Reminder</p>
                            <p className="!font-[600] !text-[#23211D] text-[14px] pt-2">---</p>
                        </PageListItem>
                    </PageListItemWrap>
                </ModalChild>
            </ModalWrap>
            )}
        </>
    )
}

export default BookingsInfo;