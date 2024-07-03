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
  import { ADD_MENU_MEAL, CREATE_INVENTORY, EDIT_INVENTORY } from "../../../api/action";
  import CustomRadio from "../../reusable/customRadio";
  import { getCdnLink } from "../../../utils/imageParser";
import { GET_INVENTORIES } from "../../../api/getApis";
  
  interface PropArgs {
    openToggle: boolean;
    event_id: number;
    closeFunc: any;
    triggerReload?: () => void;
    actionType?: string;
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
  
  const AddMeal= ({
    closeFunc,
    event_id,
    openToggle,
    triggerReload,
    actionType,
  }: PropArgs) => {

    // Event creation datas
    const [menuData, setMenuData] = useState<{category: string, meal: string}>({
        category: "",
        meal: "",
      });
    const [inventoryState, setInventoryState] = useState<any>({
        inventory: [],
    });
  
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { id, value } = e.target;
  
      setMenuData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
    };

    useEffect(() => {
        getAllMeals({
          type: "restaurant_item",
          limit: 10000
        });
    }, []);

    const { mutateAsync: getAllMeals, isPending: isGettingMeals } = useMutation({
        mutationFn: GET_INVENTORIES,
        onSuccess: (data) => {
          setInventoryState((prev:any) => {
            return {
              ...prev,
              inventory: data?.data?.body?.products,
            };
          });
        },
      });
  
    const { mutateAsync, isPending } = useMutation({
      mutationFn: ADD_MENU_MEAL,
      onSuccess: (data) => {
        enqueueSnackbar({
          variant: "success",
          message: `Meal added successfully!`,
        });
        // setInventoryCreationData({
        //   amount: 0,
        //   type: 'restaurant_item'
        // })
        triggerReload && triggerReload();
        closeFunc();
      },
    });
  
    const handleAdd = () => {
      mutateAsync({
        product_id: Number(menuData?.meal),
        event_id
      });
    };
  
    return (
      <>
        {openToggle && (
          <ModalWrap>
            <ModalChild>
              <ModalHeader>
                <h3>Add Meal</h3>
                <i>
                  <FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} />
                </i>
              </ModalHeader>
              <InputWrap>
                <InputField width="100%">
                  <p>Meal Category</p>
                  <select
                    required
                    id="category"
                    value={menuData?.category}
                    onChange={handleChange}
                  >
                    <option value="">All</option>
                    {/* <option value="lesson">Lessons</option> */}
                  </select>
                </InputField>
                <InputField width="100%">
                    <p>Meal</p>
                    <select
                        required
                        id="meal"
                        value={menuData?.meal}
                        onChange={handleChange}
                    >
                        <option value="">Select Meal</option>
                        {
                            (inventoryState?.inventory && inventoryState?.inventory.length > 0) &&
                                inventoryState?.inventory.map((item:any, index:number) => (
                                    <option value={item?.id}>{item?.title}</option>
                                ))
                        }
                    </select>
                </InputField>
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
                  onClick={() => handleAdd()}
                  disabled={
                    isPending ||
                    !menuData?.meal
                  }
                >
                  {isPending ? <Spinner /> : "Add Meal"}
                </Button>
              </div>
            </ModalChild>
          </ModalWrap>
        )}
      </>
    );
  };
  
  export default AddMeal;
  