import React, { useState } from "react";
import {
  ModalWrap,
  ModalChild,
  ModalHeader,
} from "../../../styles/reusable/index";
import * as FeatherIcon from "react-feather";
import { Button } from "../../../styles/reusable";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { Spinner } from "../../reusable/spinner";
import { DECLINE_ORDER } from "../../../api/action";
import { useNavigate } from "react-router-dom";

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
  id: string;
}


const DeclineOrderModal = ({ closeFunc, openToggle, id }: PropArgs) => {

    const navigate = useNavigate();
    const [reason, setReason] = useState("")

  const {mutateAsync, isPending} = useMutation({
    mutationFn: DECLINE_ORDER,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: 'success',
        message: 'Order declined successfully!'
      })
      navigate("/dashboard/orders");
      closeFunc();
    }
  })

  const handleCreate = () => {
    const payload = {
        id,
        status: "cancelled",
        reason
    }
    mutateAsync(payload);
  }

  return (
    <>
      {openToggle && (
        <ModalWrap>
          <ModalChild>
            <ModalHeader>
              <h3>Decline Order</h3>
              <i>
                <FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} />
              </i>
            </ModalHeader>
            <p className="py-0 relative top-[-1.5rem] text-[14px]">Select the reason for declining this order.</p>
            <div className="mb-[2rem]">
                <div className="py-2 flex items-center gap-[10px]">
                    <input 
                        type="checkbox" 
                        checked={reason === 'Out of stock'}
                        onChange={() => {
                            setReason('Out of stock')
                        }}
                        className="w-[20px] h-[20px]"
                    />
                    <p className="text-[14px]">Out of stock</p>
                </div>
                <div className="py-2 flex items-center gap-[10px]">
                    <input 
                        type="checkbox" 
                        checked={reason === 'Unable to fulfil order'}
                        onChange={() => {
                            setReason('Unable to fulfil order')
                        }}
                        className="w-[20px] h-[20px]"
                    />
                    <p className="text-[14px]">Unable to fulfil order</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-[1rem]">
                <Button
                    bg='#F3F1EF'
                    type='button'
                    width='48%'
                    top='0'
                    onClick={() => closeFunc()}
                >
                    Cancel
                </Button>
                <Button
                    bg='#23211D'
                    color='#fff'
                    type='button'
                    width='48%'
                    top='0'
                    onClick={() => handleCreate()}
                    disabled={
                        isPending || 
                        !reason
                    }
                >
                    {isPending ? <Spinner /> : "Decline Order"}
                </Button>
            </div>
            
          </ModalChild>
        </ModalWrap>
      )}
    </>
  );
};

export default DeclineOrderModal;
