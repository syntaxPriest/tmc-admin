import React from "react";
import { ModalWrap, ModalChild, ModalHeader, InputField, UnderlayText } from "../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../styles/reusable";
import { ClipLoader } from 'react-spinners';

interface PropArgs {
    closeFunc: any;
    setStartDate: any;
    setEndDate: any;
    action:any;
    onProcess: boolean;
}

const RangeModal = ({
    closeFunc,
    setStartDate,
    setEndDate,
    action,
    onProcess
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3>Export Data</h3>
                        <i><FeatherIcon.X onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <form onSubmit={(e) => action(e)}>
                        {/* <UnderlayText>
                            Please, enter a new email address to Invite New Users
                        </UnderlayText> */}
                        <InputField>
                            <legend>Start Date</legend>
                            <input 
                                required
                                placeholder={'Start Date'}
                                type='date'
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </InputField>
                        <InputField>
                            <legend>Start Date</legend>
                            <input 
                                required
                                placeholder={'Start Date'}
                                type='date'
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </InputField>
                        <Button
                            width='100%'
                            bg='var(--primary-color)'
                            color='#fff'
                            type='submit'
                        >
                            {onProcess ? <ClipLoader size={18} color='#fff' /> : 'Export to CSV'}
                        </Button>
                    </form>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default RangeModal;