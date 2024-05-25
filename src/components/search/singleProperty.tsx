import React, { useMemo, useEffect, useState } from 'react';
import Header from '../reusable/header';
import { BoxFlex, BreadcrumbArea, DescHeader, IconFlex, MainWrap, RandomCircle } from '../../styles/reusable/index';
import Typography from '../reusable/typography';
import PropertyCard from '../reusable/propertyCard';
import FooterComp from '../reusable/footer';
import { MapPinIcon, CheckIcon } from '@heroicons/react/20/solid';
import { BedRounded, BathtubRounded } from '@mui/icons-material';
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';
import { LoneWrap, InputWrap, InputField } from '../../styles/authentication';
import { Button } from '../../styles/reusable';
import { DualPropertySection, PropertyImagesWrap, DualCard, DualFeatures, AboutSection, PostedBySection, SimilarListingCard, CarouselWrap } from './style';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { GET_PROPERTIES_BY_ID } from '../../api/property';
import commaNumber from 'comma-number';
import { useDispatch } from 'react-redux';
import { setActiveProperty } from '../../store/properties/reducer';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};


const SearchIndex = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [property, setProperty] = useState<any>([]);

    const { mutateAsync, data, isPending } = useMutation({
        mutationFn: GET_PROPERTIES_BY_ID
    })

    useMemo(() => {
        if (id){
            mutateAsync({
                id: id
            });
        }
    }, [id])

    useEffect(() => {
        if (data){
            setProperty(data.data.body.property)
        }
    }, [data])


    const toSelectUnit = () => {
        navigate(`/select-unit`)
        dispatch(setActiveProperty(property))
    }

    return(
        <>
            <Header />
            <MainWrap
                top='4rem'
            >
                <BreadcrumbArea>
                    <Typography 
                        text='Home / Property'
                        color='var(--primary-color)'
                        fontWeight={400}
                        fontSize='15px'
                        lineHeight='22.4px'
                        align='center'
                    />
                    <Typography 
                        text={property?.title}
                        color='#091525'
                        fontWeight={700}
                        fontSize='32px'
                        lineHeight='41.6px'
                        align='center'
                        margin='1rem 0 0.4rem 0'
                    />
                    <IconFlex
                        hAlign='center'
                        vAlign='flex-start'
                    >
                        <MapPinIcon className='w-6 h-6' />
                        <Typography 
                            text={`${property?.address} • Property Code: 92482230`}
                            color='#091525'
                            fontWeight={400}
                            fontSize='15px'
                            lineHeight='22.4px'
                            align='center'
                        />
                    </IconFlex>
                    <IconFlex
                        gap='24px'
                        hAlign='center'
                        margin='1.5rem 0'
                    >
                        <RandomCircle
                            size='46.15px'
                            bg='#EDF3FC'
                        >
                            <BookmarkIcon 
                                className='w-5 h-5'
                                color='#8796AD'
                            />
                        </RandomCircle>
                        <RandomCircle
                            size='46.15px'
                            bg='#EDF3FC'
                        >
                            <ShareIcon 
                                className='w-5 h-5'
                                color='#8796AD'
                            />
                        </RandomCircle>
                    </IconFlex>
                </BreadcrumbArea>
                <PropertyImagesWrap>
                    <div>
                        <img 
                            src='/images/e-house1.png'
                            alt='House'
                        />
                        <img 
                            src='/images/house2.png'
                            alt='House'
                        />
                        <img 
                            src='/images/plan1.png'
                            alt='House'
                        />
                    </div>
                </PropertyImagesWrap>
                <DualPropertySection>
                    <div>
                        <Typography 
                            text='Overview'
                            color='#0E0E0E'
                            fontWeight={600}
                            fontSize='24px'
                            lineHeight='30.12px'
                        />
                        <BoxFlex
                            gap='10px'
                            margin='30px 0'
                        >
                            <DualCard>
                                <BedRounded />
                                <p>2 beds</p>
                            </DualCard>
                            <DualCard>
                                <BathtubRounded />
                                <p>3 baths</p>
                            </DualCard>
                        </BoxFlex>
                        <BoxFlex
                            wrap={'wrap'}
                            gap='12px'
                        >
                            {
                                features.map((item, index) => (
                                    <DualFeatures key={index}>
                                        <CheckIcon className='w-5 h-4' />
                                        <p>{item}</p>
                                    </DualFeatures>
                                ))
                            }
                        </BoxFlex>
                        <AboutSection>
                            <h3>About Property</h3>
                            <p>
                                {aboutText}
                            </p>
                        </AboutSection>
                        <PostedBySection>
                            <div>
                                <p>Posted By</p>
                                <h3>Daniel Adewale</h3>
                            </div>
                            <RandomCircle
                                size='50px'
                            >
                                <img 
                                    src='/images/user.png'
                                    alt='Poster'
                                />
                            </RandomCircle>
                        </PostedBySection>
                    </div>
                    <div>
                        <LoneWrap
                            textAlign='left'
                            showBorder={true}
                            width='100%'
                        >
                            <p
                                style={{
                                    margin: '0',
                                    padding: '0',
                                    color: "#091525",
                                    fontWeight: '500'
                                }}
                            >Contribute to buy this property</p>
                            <h3>
                                ₦{commaNumber(property?.price)}
                            </h3>
                            <Typography 
                                text={`${property?.units} units available`}
                                color='#245372'
                                fontWeight={400}
                                fontSize='15px'
                                lineHeight='22.4px'
                                top='0.5rem'
                            />
                            <Button
                                bg='var(--primary-color)'
                                color='#fff'
                                type='submit'
                                width='100%'
                                top='20px'
                                onClick={() => toSelectUnit()}
                            >
                                Select Unit
                            </Button>
                        </LoneWrap>
                    </div>
                </DualPropertySection>
                <SimilarListingCard>
                    <DescHeader>
                        <h3>Similar Listings</h3>
                    </DescHeader>
                    <CarouselWrap>
                        <Carousel
                            responsive={responsive}
                            containerClass='carousel-gap'
                        >
                            {
                                properties.map((item, index) => (
                                    <PropertyCard 
                                        key={index}
                                        img={item.img}
                                        // mr='48px'
                                    />
                                ))
                            }
                        </Carousel>
                    </CarouselWrap>
                </SimilarListingCard>
            </MainWrap>
            <FooterComp />
        </>
    )
}

export default SearchIndex;

const aboutText = 
`Introducing an exquisite residential masterpiece, a collection of 15 newly built 4-bedroom semi-detached duplexes with a BQ (Boys' Quarter), nestled in the heart of Nigeria's vibrant cityscape. This architectural marvel seamlessly blends contemporary design with luxurious comfort, offering an unparalleled living experience for discerning individuals and families.

Each unit of this splendid development boasts a spacious and well-thought-out floor plan, spanning across multiple levels to provide abundant living space. The ground floor greets you with a grand entrance leading to a tastefully designed living area, adorned with high ceilings and large windows that allow natural light to flood the interior. The thoughtfully placed dining area creates a seamless flow, perfect for hosting gatherings and creating lasting memories.`;


const features = ['Serviced Apartment', 'Newly Built', 'Swimming Pool', 'CCTV Camera', 'Big Compound', 'Street Lights' ]

const properties = [
    {
        img: '/images/house1.png',
    },
    {
        img: '/images/house2.png',
    },
    {
        img: '/images/house1.png',
    },
    {
        img: '/images/house2.png',
    },
    {
        img: '/images/house1.png',
    },
    {
        img: '/images/house2.png',
    },
    {
        img: '/images/house1.png',
    },
    {
        img: '/images/house2.png',
    },
    {
        img: '/images/house1.png',
    },
]