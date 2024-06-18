import React, {
  type Dispatch,
  type SetStateAction,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
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
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { NumericFormat } from "react-number-format";
import { Spinner } from "../../reusable/spinner";
import { CREATE_INVENTORY, EDIT_INVENTORY } from "../../../api/action";
import CustomRadio from "../../reusable/customRadio";
import { getCdnLink } from "../../../utils/imageParser";

interface PropArgs {
  openToggle: boolean;
  closeFunc: any;
  triggerReload: () => void;
  actionType?: string;
  inventoryData?: inventoryDataProps
}

export interface inventoryDataProps {
  type?: string;
  vat?: number | string;
  id?: string | number;
  title?: string;
  product_id?: string;
  amount?: number;
  desc?: string;
  category?: string;
  quantity?: string;
  status?: string;
  media?: Array<{
    url: string
  }>
  cover?: {
    url: string;
  };
}

const AddInventoryItem = ({
  closeFunc,
  openToggle,
  triggerReload,
  actionType,
  inventoryData
}: PropArgs) => {
  const [inventoryType, setInventoryType] = useState<string | boolean>("");
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [coverFormDataArray, setCoverFormDataArray] = useState<FormData[]>([]);
  // Event creation datas
  const [inventoryCreationData, setInventoryCreationData] =
    useState<inventoryDataProps>({
      amount: 0,
      type: "restaurant_item",
    });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setInventoryCreationData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  useEffect(() => {
    if (actionType === 'edit' && inventoryData){
      setInventoryCreationData((prev) => {
        return {
          ...prev,
          id: inventoryData?.id,
          type: inventoryData?.type,
          quantity: inventoryData?.quantity,
          title: inventoryData?.title,
          product_id: inventoryData?.product_id,
          amount: inventoryData?.amount,
          desc: inventoryData?.desc,
          category: inventoryData?.category,
          status: inventoryData?.status,
        };
      });
    }
  }, [inventoryData, actionType])

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    files: any,
    setFiles: Dispatch<SetStateAction<any>>,
    setFormDataArray: Dispatch<SetStateAction<any>>
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      // Merge new files with existing files
      const updatedFiles = [...files, ...selectedFiles];
      setFiles(updatedFiles);
    }
  };

  const handleRemoveFile = (
    index: number,
    files: any,
    formDataArray: any,
    setFiles: Dispatch<SetStateAction<any>>,
    setFormDataArray: Dispatch<SetStateAction<any>>
  ) => {
    const updatedFiles = files.filter((_: any, i: number) => i !== index);
    setFiles(updatedFiles);

    const updatedFormDataArray = formDataArray.filter(
      (_: any, i: number) => i !== index
    );
    setFormDataArray(updatedFormDataArray);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: actionType === 'edit' ? EDIT_INVENTORY : CREATE_INVENTORY,
    onSuccess: (data) => {
      enqueueSnackbar({
        variant: "success",
        message: `Inventory ${actionType === 'edit' ? 'edited' : 'created'} successfully!`,
      });
      triggerReload();
      closeFunc();
    },
  });

  const handleCreate = () => {
    const formData: any = new FormData();
    if (
      inventoryCreationData &&
      Object.keys(inventoryCreationData).length > 0
    ) {
      Object.entries(inventoryCreationData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      coverFiles.forEach((file) => {
        formData.append("cover", file); // Use the same key for all files
      });
    }
    if ((inventoryCreationData?.type === 'booking' || inventoryCreationData?.type === 'lessons') && actionType !== 'edit'){
      formData.append("quantity", "1");
    }
    if (actionType === 'edit'){
      formData.delete("type");
      formData.delete("product_id");
    }
    mutateAsync(formData);
  };

  return (
    <>
      {openToggle && (
        <ModalWrap>
          <ModalChild>
            <ModalHeader>
              <h3>{actionType === 'edit' ? "Edit" : "Add"} Item</h3>
              <i>
                <FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} />
              </i>
            </ModalHeader>
            <InputWrap>
              <InputField width="100%">
                {/* <p>Item Name</p> */}
                <select
                  required
                  id="type"
                  disabled={actionType === 'edit'}
                  value={inventoryCreationData?.type}
                  onChange={handleChange}
                >
                  <option value="restaurant_item">Restaurant Item</option>
                  <option value="booking">Bookings & Service</option>
                  <option value="store_item">Merchandise & Store Item</option>
                  {/* <option value="lesson">Lessons</option> */}
                </select>
              </InputField>
              <div className="w-full flex justify-between items-center">
              {coverFiles && coverFiles.length < 1 ? (
                <div className="w-full my-5">
                  <p className="text-[13px]">Upload Image</p>
                  <div className="flex items-center gap-[10px] mb-2">
                    <label
                      htmlFor={
                        coverFiles && coverFiles.length > 0
                          ? ""
                          : "cover_images"
                      }
                    >
                      <div className="w-[72px] h-[72px] bg-[#F3F1EF] flex items-center justify-center rounded-[8px] cursor-pointer">
                        <CameraIcon className="w-5 h-5" />
                      </div>
                    </label>
                    <div>
                      <p className="font-[400] text-[12px]">
                        Choose from files
                      </p>
                      <label
                        htmlFor={
                          coverFiles && coverFiles.length > 0
                            ? ""
                            : "cover_images"
                        }
                      >
                        <p className="font-[400] text-[12px] bg-[#F3F1EF] rounded-[50px] mt-2 py-1 px-3 text-center cursor-pointer">
                          Upload
                        </p>
                      </label>
                    </div>
                  </div>
                  <input
                    className="hidden"
                    id="cover_images"
                    type="file"
                    multiple
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        coverFiles,
                        setCoverFiles,
                        setCoverFormDataArray
                      )
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-wrap justify-between gap-[15px] my-[1.5rem]">
                  {coverFiles &&
                    coverFiles.length > 0 &&
                    coverFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-[80px] h-[80px] rounded-[8px] object-cover"
                          onClick={() =>
                            handleRemoveFile(
                              index,
                              coverFiles,
                              coverFormDataArray,
                              setCoverFiles,
                              setCoverFormDataArray
                            )
                          }
                        />
                      </div>
                    ))}
                </div>
              )}
              {inventoryData?.cover &&
                    // inventoryData?.cover.map((file, index) => (
                      <div className="relative w-[40%]">
                        <p className="text-[14px] mb-2">Current Image</p>
                        <img
                          src={`${getCdnLink(`${inventoryData?.cover}`, 'inventory')}`}
                          alt=""
                          className="w-[80px] h-[80px] rounded-[8px] object-cover"
                        />
                      </div>
                    // ))
                    }
              </div>
              {/* {inventoryCreationData?.type !== "booking" && ( */}
                <InputField width="100%">
                  <p>Product ID</p>
                  <input
                    placeholder="Enter Product ID"
                    autoComplete="off"
                    type="text"
                    required
                    disabled={actionType === 'edit'}
                    value={inventoryCreationData?.product_id}
                    id="product_id"
                    onChange={handleChange}
                  />
                </InputField>
              {/* )} */}
              <InputField width="100%">
                <p>Item Name</p>
                <input
                  placeholder="Enter Item Name"
                  autoComplete="off"
                  type="text"
                  required
                  id="title"
                  value={inventoryCreationData?.title}
                  onChange={handleChange}
                />
              </InputField>
              <InputField width="100%">
                <p>Description</p>
                <input
                  placeholder="Enter Description"
                  autoComplete="off"
                  type="text"
                  required
                  value={inventoryCreationData?.desc}
                  id="desc"
                  onChange={handleChange}
                />
              </InputField>
              <InputField width="100%">
                <p>Price</p>
                <NumericFormat
                  placeholder="Enter Price"
                  autoComplete="off"
                  type="tel"
                  value={inventoryCreationData?.amount}
                  required
                  id="amount"
                  onChange={(e) =>
                    setInventoryCreationData((prev) => {
                      return {
                        ...prev,
                        amount: Number(e.target.value.replaceAll(",", "")),
                      };
                    })
                  }
                  thousandSeparator
                />
              </InputField>
              {(inventoryCreationData?.type !== "booking") && (
                <>
                  <InputField width="48%">
                    <p>Qty</p>
                    <input
                      placeholder="Enter Qty"
                      autoComplete="off"
                      type="number"
                      required
                      value={inventoryCreationData?.quantity}
                      id="quantity"
                      onChange={handleChange}
                    />
                  </InputField>
                  <InputField width="48%">
                    <p>Category</p>
                    <input
                      placeholder="Enter Category"
                      autoComplete="off"
                      type="text"
                      required
                      value={inventoryCreationData?.category}
                      id="category"
                      onChange={handleChange}
                    />
                  </InputField>
                </>
              )}
              {
                actionType === 'edit' &&
                <InputField width="100%">
                  <p>Status</p>
                  <select
                    required
                    id="status"
                    value={inventoryCreationData?.status}
                    onChange={handleChange}
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="low_stock">Low Stock</option>
                    {/* <option value="lesson">Lessons</option> */}
                  </select>
                </InputField>
              }
            </InputWrap>
            <div className="flex items-center justify-between mt-[1rem]">
              <Button bg="#F3F1EF" type="button" width="48%" top="0">
                Cancel
              </Button>
              <Button
                bg="#23211D"
                color="#fff"
                type="button"
                width="48%"
                top="0"
                onClick={() => handleCreate()}
                disabled={
                  isPending ||
                  ((inventoryCreationData?.type === "restaurant_item" || inventoryCreationData?.type === "store_item") &&
                    (!inventoryCreationData?.category ||
                      !inventoryCreationData?.quantity ||
                      !inventoryCreationData?.product_id)) ||
                  !inventoryCreationData?.title ||
                  !inventoryCreationData?.desc ||
                  !inventoryCreationData?.amount ||
                  (actionType !== 'edit' && 
                  coverFiles.length < 1 )
                }
              >
                {isPending ? <Spinner /> : actionType === 'edit' ? "Save Changes" :"Create"}
              </Button>
            </div>
          </ModalChild>
        </ModalWrap>
      )}
    </>
  );
};

export default AddInventoryItem;
