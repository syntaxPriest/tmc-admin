import React from "react";
import { ModalWrap, ModalChild, ModalHeader, RandomCircle } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../../styles/reusable";
import Typography from "../../reusable/typography";

interface PropArgs {
    closeFunc: any;
    action?: any;
    prevStage?: any;
}

const Success = ({
    closeFunc,
    action,
    prevStage
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <ModalChild>
                    <ModalHeader>
                        <h3></h3>
                        <i><FeatherIcon.X strokeWidth={1} onClick={() => closeFunc()} /></i>
                    </ModalHeader>
                    <div className="mt-10">
                        <div
                            style={{
                                margin: '1.5rem 0'
                            }}
                        >
                            <RandomCircle
                                size='80px'
                                bg='#fff'
                                style={{
                                    margin: '0 auto 1rem auto'
                                }}
                            >
                                <img 
                                    src='/success.png'
                                    alt='Success'
                                />
                            </RandomCircle>
                            <Typography 
                                text='You just made a contribution'
                                color='#091525'
                                fontWeight={700}
                                fontSize='24px'
                                lineHeight='26.5px'
                                align='center'
                            />
                            <Typography 
                                text='You contribution has been received. You can monitor the progress of your contribution on your dashboard.'
                                color='#616161'
                                fontWeight={400}
                                fontSize='15px'
                                lineHeight='21px'
                                margin='0.5rem 0 2rem 0'
                                align='center'
                            />
                            <Button
                                bg='var(--primary-color)'
                                color='#fff'
                                type='submit'
                                width='100%'
                                top='5px'
                                onClick={() => action()}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </ModalChild>
            </ModalWrap>
        </>
    )
}

export default Success;