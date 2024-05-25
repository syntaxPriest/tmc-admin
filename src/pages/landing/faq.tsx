import React, { useState } from 'react';
import Typography from '../../components/reusable/typography';
import { FaqCard, FaqWrap, FloatingToggle } from './style';
import { RandomCircle } from '../../styles/reusable/index';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Button } from '../../styles/reusable';
import { Slide, Fade } from 'react-awesome-reveal';

const FAQ = () => {

    const [opened, setOpened] = useState<number>(-1);

    const handleToggle = (index:number) => {
        if (opened === index){
            setOpened(-1);
        }else {
            setOpened(index);
        }
    }

    return(
        <>
            <FaqWrap>
                <Typography 
                    text={'Frequently asked questions'}
                    color='#1B2229'
                    fontWeight={600}
                    fontSize='32px'
                    lineHeight='32px'
                    margin='0.2rem 0 2.5rem 0'
                    align='center'
                />
                {
                    faqs.map((item, index) => (
                        <Slide direction='right' cascade>
                            <FaqCard
                                key={index}
                            >
                                <div className='w-[90%]'>
                                    <Typography 
                                        text={item.question}
                                        color='#1B2229'
                                        fontWeight={500}
                                        fontSize='22px'
                                        lineHeight='24px'
                                        margin='0.2rem 0 0.5rem 0'
                                    />
                                    {
                                        opened === index &&
                                        <Fade>
                                            <Typography 
                                                text={item.answer}
                                                color='#1B2229'
                                                fontWeight={300}
                                                fontSize='16px'
                                                lineHeight='24px'
                                                margin='1rem 0 0 0'
                                            />
                                        </Fade>
                                    }
                                </div>
                                <FloatingToggle>
                                    <RandomCircle
                                        bg='#fff'
                                        size='40px'
                                        onClick={() => handleToggle(index)}
                                    >
                                        {
                                            opened === index ?
                                                <ChevronUpIcon className='w-6 h-6' color='#8796AD' />
                                                :
                                                <ChevronDownIcon className='w-6 h-6' color='#8796AD' />
                                        }
                                    </RandomCircle>
                                </FloatingToggle>
                            </FaqCard>
                        </Slide>
                    ))
                }
                <div className="mt-10 mx-[auto] w-[auto] flex justify-center">
                    <Button
                        bg='#fff'
                        color='var(--primary-color)'
                        border='1px solid var(--primary-color)'
                        type='button'
                        width='auto'
                    >
                        Show more
                    </Button>
                </div>
            </FaqWrap>
        </>
    )
}


export default FAQ;

const faqs = [
    {
        question: 'What is ContriBuild, and how does it work for individual savings?',
        answer: 'ContriBuild is a platform that enables individuals to save towards their dream homes. You contribute funds regularly into a dedicated account, and once the collective savings reach a predefined goal, you can use the accumulated funds to purchase your dream home or access mortgage solutions.'
    },
    {
        question: 'Is ContriBuild open to everyone?',
        answer: 'ContriBuild is a platform that enables individuals to save towards their dream homes. You contribute funds regularly into a dedicated account, and once the collective savings reach a predefined goal, you can use the accumulated funds to purchase your dream home or access mortgage solutions.'
    },
    {
        question: 'Can I choose the amount and frequency of my contributions?',
        answer: 'ContriBuild is a platform that enables individuals to save towards their dream homes. You contribute funds regularly into a dedicated account, and once the collective savings reach a predefined goal, you can use the accumulated funds to purchase your dream home or access mortgage solutions.'
    },
    {
        question: 'What happens once I reach my savings goal?',
        answer: 'ContriBuild is a platform that enables individuals to save towards their dream homes. You contribute funds regularly into a dedicated account, and once the collective savings reach a predefined goal, you can use the accumulated funds to purchase your dream home or access mortgage solutions.'
    },
]