import React from "react";
import {
  ModalWrap,
  ModalChild,
  ModalHeader,
  MainModalView,
  ButtonFlex,
  BottomButtonWrap,
  BoxFlex,
  RandomCircle,
} from "../../../styles/reusable/index";
import * as FeatherIcon from "react-feather";
import { Button } from "../../../styles/reusable";
import { InputWrap, InputField } from "../../../styles/authentication/index";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Typography from "../../reusable/typography";
import { CameraIcon } from "@heroicons/react/24/outline";

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
}

const AddInventoryItem = ({ closeFunc, openToggle }: PropArgs) => {
  return (
    <>
      {openToggle && (
        <ModalWrap>
          <ModalChild>
            <ModalHeader>
              <h3>Add Item</h3>
              <i>
                <FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} />
              </i>
            </ModalHeader>
            <InputWrap>
                <div className="w-full my-5">
                    <p className="text-[13px]">Upload Image</p>
                    <div className="flex items-center gap-[10px] mb-2">
                        <div className="w-[72px] h-[72px] bg-[#F3F1EF] flex items-center justify-center rounded-[8px]">
                            <CameraIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-[400] text-[12px]">Choose from files</p>
                            <p className="font-[400] text-[12px] bg-[#F3F1EF] rounded-[50px] mt-2 py-1 px-3 text-center">Upload</p>
                        </div>
                    </div>
                </div>
                <InputField width='100%'>
                    <p>Product ID</p>
                    <input 
                        placeholder='Enter Product ID'
                        autoComplete="off"
                        type="text"
                        required
                    />
                </InputField>
                <InputField width='100%'>
                    <p>Item Name</p>
                    <input 
                        placeholder='Enter Item Name'
                        autoComplete="off"
                        type="text"
                        required
                    />
                </InputField>
                <InputField width='100%'>
                    <p>Description</p>
                    <input 
                        placeholder='Enter Description'
                        autoComplete="off"
                        type="text"
                        required
                    />
                </InputField>
                <InputField width='100%'>
                    <p>Category</p>
                    <input 
                        placeholder='Enter Category'
                        autoComplete="off"
                        type="text"
                        required
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Price</p>
                    <input 
                        placeholder='Enter Price'
                        autoComplete="off"
                        type="number"
                        required
                    />
                </InputField>
                <InputField width='48%'>
                    <p>Qty</p>
                    <input 
                        placeholder='Enter Qty'
                        autoComplete="off"
                        type="number"
                        required
                    />
                </InputField>
            </InputWrap>
            <div className="flex items-center justify-between mt-[1rem]">
                <Button
                    bg='#F3F1EF'
                    type='button'
                    width='48%'
                    top='0'
                >
                    Cancel
                </Button>
                <Button
                    bg='#23211D'
                    color='#fff'
                    type='button'
                    width='48%'
                    top='0'
                >
                    Save
                </Button>
            </div>
            
          </ModalChild>
        </ModalWrap>
      )}
    </>
  );
};

export default AddInventoryItem;
