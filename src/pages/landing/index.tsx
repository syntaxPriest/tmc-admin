import React, { useEffect } from 'react';
import Header from '../../components/reusable/header';
import FilterComp from '../../components/reusable/filter';
import { MainWrap } from '../../styles/reusable/index';
import Typography from '../../components/reusable/typography';
import FooterComp from '../../components/reusable/footer';
import { FindInput, HeroSection, LandingAbout, LandingAboutWrap, OfferCard, OffersWrap, SaveCard } from './style';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '../../styles/reusable';
import { useNavigate } from 'react-router-dom';
import FAQ from './faq';
import Contact from './contact';
import { Bounce, Fade, Zoom } from 'react-awesome-reveal';
import { useDispatch } from 'react-redux';
import { setPropertySlug } from '../../store/properties/reducer';

const LandingPageIndex = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPropertySlug('Hey man'))
    }, [])

    return(
        <>
            <Header isLanding />
            <MainWrap
                style={{
                    margin: '0 auto'
                }}
            >
                
                    <HeroSection>
                        <div
                            className='w-[560px] mx-[auto] mt-[85px] sm:[w-100%]'
                        >

                            <Bounce>
                                <Typography 
                                    text='Contribuild towards owning your own property'
                                    color='#1B2229'
                                    fontWeight={600}
                                    fontSize='40px'
                                    lineHeight='45px'
                                    align='center'
                                    className='sm:text-[0.4rem]'
                                    mobileFontSize='35px'
                                />
                            </Bounce>
                            <Fade>
                                <div
                                    className='w-[331px] mx-[auto] mt-[15px]'
                                >
                                    <Typography 
                                        text='Find the property of your dreams and start saving towards owning it!'
                                        color='#1B2229'
                                        fontWeight={400}
                                        fontSize='16px'
                                        lineHeight='22.4px'
                                        align='center'
                                    />
                                </div>
                            </Fade>
                            <Zoom>
                                <FindInput>
                                    <i>
                                        <MagnifyingGlassIcon className='w-5 h-5' />
                                    </i>
                                    <input 
                                        placeholder='Find your dream property'
                                    />
                                    <Button
                                        bg='var(--primary-color)'
                                        color='#fff'
                                        type='submit'
                                        width='7rem'
                                        onClick={() => navigate('/search')}
                                    >
                                        Search
                                    </Button>
                                </FindInput>
                            </Zoom>
                            <Zoom delay={500}>
                                <img 
                                    src='./images/hero.png'
                                    alt='Hero'
                                    className='mt-[100px]'
                                />
                            </Zoom>
                        </div>
                    </HeroSection>
            </MainWrap>
            <OffersWrap>
                <div>
                    {
                        offers.map((item, index) => (
                            <Bounce key={index} delay={(index + 1) * 500}>
                                <OfferCard>
                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <h3>{item.name}</h3>
                                    <p>{item.text}</p>
                                </OfferCard>
                            </Bounce>
                        ))
                    }
                </div>
            </OffersWrap>
            <MainWrap>
                <LandingAboutWrap>
                    {
                        landingAbouts.map((item, index) => (
                            <LandingAbout key={index}>
                                <div>
                                    <Fade>
                                        <Typography 
                                            text={item.name}
                                            color='#1B2229'
                                            fontWeight={600}
                                            fontSize='32px'
                                            lineHeight='32px'
                                        />
                                        <Typography 
                                            text={item.text}
                                            color='#1B2229'
                                            fontWeight={400}
                                            fontSize='16px'
                                            lineHeight='22.4px'
                                            margin='1rem 0 1.5rem 0'
                                        />
                                        <Button
                                            bg='#fff'
                                            color='var(--primary-color)'
                                            border='1px solid var(--primary-color)'
                                            type='button'
                                            width='auto'
                                        >
                                            {item.buttonText}
                                        </Button>
                                    </Fade>
                                </div>
                                <Zoom delay={500}>
                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </Zoom>
                            </LandingAbout>
                        ))
                    }
                </LandingAboutWrap>
                <SaveCard>
                    <div>
                        <Typography 
                            text={'Start saving towards owning your own property'}
                            color='#1B2229'
                            fontWeight={600}
                            fontSize='32px'
                            lineHeight='32px'
                        />
                        <Typography 
                            text={'Are you dreaming of owning your own home?'}
                            color='#1B2229'
                            fontWeight={400}
                            fontSize='16px'
                            lineHeight='22.4px'
                            margin='1rem 0 0rem 0'
                        />
                        <Typography 
                            text={'Discover how to ContriBuild!'}
                            color='#1B2229'
                            fontWeight={400}
                            fontSize='16px'
                            lineHeight='22.4px'
                            margin='0.2rem 0 1.5rem 0'
                        />
                        <Button
                            bg='var(--primary-color)'
                            color='#fff'
                            type='button'
                            width='auto'
                        >
                            Get Started
                        </Button>
                    </div>
                    <img 
                        src={'./images/save.png'}
                        alt={'Building'}
                    />
                </SaveCard>
                <FAQ />
                <Contact />
            </MainWrap>
            <FooterComp />
        </>
    )
}

export default LandingPageIndex;

const offers = [
    {
        name: 'Inclusivity',
        text: 'We believe that everyone should have the opportunity to own a home. ContriBuild is designed to be inclusive, regardless of your financial background.',
        image: '/icons/hand.png'
    },
    {
        name: 'Financial Security',
        text: ' Our structured savings approach helps you build a stronger financial foundation, setting you on a path to a more secure future.',
        image: '/icons/lock-closed.png'
    },
    {
        name: 'Expert Guidance',
        text: 'Our team is here to guide you every step of the way, providing expert advice and assistance to ensure your success.',
        image: '/icons/chat-alt-2.png'
    },
]

const landingAbouts = [
    {
        name: 'Find out how much you can afford',
        text: 'Check our contribution calculator to determine how much you can afford based on your income and duration of contribution.',
        image: '/images/calculator.png',
        buttonText: 'Calculate Affordability'
    },
    {
        name: 'Get help with your downpayment',
        text: 'Check our contribution calculator to determine how much you can afford based on your income and duration of contribution',
        image: '/images/wallet.png',
        buttonText: 'Contact Us'
    },
]

export const properties = [
    {
        img: '/images/house1.png',
        saved: false
    },
    {
        img: '/images/house2.png',
        saved: false
    },
    {
        img: '/images/house1.png',
        saved: false
    },
    {
        img: '/images/house2.png',
        saved: false
    },
    {
        img: '/images/house1.png',
        saved: false
    },
    {
        img: '/images/house2.png',
        saved: false
    },
    {
        img: '/images/house1.png',
        saved: false
    },
    {
        img: '/images/house2.png',
        saved: false
    },
    {
        img: '/images/house1.png',
        saved: false
    },
]