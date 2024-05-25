import React from 'react';
import { AlertArea, ModalChild, CloseBtn, Center, SmallBtn } from './style';
import * as Icon from 'react-feather';

interface Props {
  closeFunc: any;
  message: string;
  img: string;
  miniMessage: string
}

const Alert = ({ closeFunc, message, img, miniMessage } : Props) => {
  return (
    <>
      <AlertArea>
        <ModalChild>
          <CloseBtn onClick={() => closeFunc()}>
            <Icon.X />
          </CloseBtn>
          <Center>
            <img src={img} alt="Icon" />
            <h3>{message}</h3>
            <p>{miniMessage}</p>
            <SmallBtn onClick={() => closeFunc()}>
              <button>Done</button>
            </SmallBtn>
          </Center>
        </ModalChild>
      </AlertArea>
    </>
  );
};

export default Alert;
