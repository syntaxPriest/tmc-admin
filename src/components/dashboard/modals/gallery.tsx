import React from "react";
import { ModalWrap } from "../../../styles/reusable/index";
import * as FeatherIcon from 'react-feather';
import { Button } from "../../../styles/reusable";
import { BottomDownloadBtn, FullImageDisplay, ModalImageWrap } from "./style";
import Carousel from "react-multi-carousel";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { CloseBtn } from "../../reusable/style";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

interface PropArgs {
    closeFunc: any;
    action?: any;
    prevStage?: any;
}

const GalleryDisplay = ({
    closeFunc,
} : PropArgs) => {
    return(
        <>
            <ModalWrap>
                <CloseBtn
                    style={{
                        zIndex: '1000000000000000000',
                        cursor: 'pointer'
                    }}
                >
                    <FeatherIcon.X 
                        color='#fff' 
                        onClick={() => closeFunc()}
                    />
                </CloseBtn>
                <ModalImageWrap
                >
                    <Carousel
                        responsive={responsive}
                    >
                        {
                            photos.map((item, index) => (
                                <FullImageDisplay 
                                    key={index}
                                >
                                    <img 
                                        src={item}
                                        alt='Property'
                                    />
                                    <BottomDownloadBtn>
                                        <a href={item} target="_blank" rel="noreferrer" download>
                                            <Button
                                                bg='rgba(0, 0, 0, 0.7)'
                                                color='#fff'
                                                type='button'
                                                width='auto'
                                                top='0'
                                                border='none'
                                            >
                                                <ArrowDownTrayIcon  className="w-5 h-5" color='#fff' />
                                                Download
                                            </Button>
                                        </a>
                                    </BottomDownloadBtn>
                                </FullImageDisplay>
                            ))
                        }
                    </Carousel>
                </ModalImageWrap>
            </ModalWrap>
        </>
    )
}

export default GalleryDisplay;

const photos = ['/images/e-house2.png', '/images/e-house.png', '/images/house1.png']