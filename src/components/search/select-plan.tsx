import React, { useState } from 'react';
import { BoxFlex, BreadcrumbArea, DescHeader, IconFlex, Line, MainWrap, PropertyWrap, RandomCircle } from '../../styles/reusable/index';
import Typography from '../reusable/typography';
import AuthHeaderComp from '../auth/authHeader';
import { AuthBacknav } from '../../styles/authentication';
import { InputWrap, InputField } from '../../styles/authentication';
import { Button } from '../../styles/reusable';
import * as Icon from 'react-feather';
import { CalcDetailsWrap, CalculatorFlex, LineFlex, PlanCard, PlanWrap } from './style';
import Error from '../reusable/error';
import AgreementModal from './agreementModal';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { setCalculatorPlan, setCalculatorResult } from '../../store/properties/reducer';

const SelectPlan = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeHover, setActiveHover] = useState('');
    
    const selectPlanFunc = async (plan: string) => {
        await dispatch(setCalculatorPlan(plan))
        await dispatch(setCalculatorResult(null))
        navigate('/contribution-calculator')
    }

    return(
        <>
            <AuthHeaderComp />
            <MainWrap
                top='2rem'
                width='100%'
                maxWidth='1300px'
            >
                <AuthBacknav
                    onClick={() => navigate(-1)}
                >
                    <Icon.ArrowLeft 
                        color='#8796AD' 
                        size={20}
                    />
                    <p>Back</p>
                </AuthBacknav>
            </MainWrap>
            <MainWrap
                top='-0.5rem'
            >
                <Typography 
                    text='Select contribution plan'
                    color='#091525'
                    fontWeight={600}
                    fontSize='32px'
                    lineHeight='32px'
                />
                <PlanWrap>
                    {
                        plans.map((item, index) => (
                            <PlanCard
                                key={index}
                                onMouseOver={() => setActiveHover(item.name)}
                                onMouseLeave={() => setActiveHover('')}
                                style={
                                    item.name === activeHover ? {
                                        boxShadow: '0px 0px 5px var(--primary-color)'
                                    } : {}
                                }
                                onClick={() => selectPlanFunc(item?.name)}
                            >
                                <BoxFlex
                                    vAlign="center"
                                    hAlign="space-between"
                                    margin="0 0 30px 0"
                                >
                                    <h3>{item.name}</h3>
                                    {
                                        index === 1 &&
                                            <div
                                                className='py-[2px] px-[6px] text-[12px] font-[500] uppercase bg-[#EDF3FB] rounded-[4px]'
                                            >Recommended</div>
                                    }
                                </BoxFlex>
                                {
                                    item.plans.map((item, index) => (
                                        <BoxFlex
                                            key={index}
                                            margin='10px 0'
                                            vAlign='flex-start'
                                            gap='8px'
                                        >
                                            <CheckIcon className='w-5 h-5' color='var(--primary-color)' />
                                            <div
                                                style={{
                                                    width: '88%'
                                                }}
                                            >
                                                <Typography 
                                                    text={item}
                                                    color='#245372'
                                                    fontWeight={400}
                                                    fontSize='15px'
                                                    lineHeight='22.5px'
                                                />
                                            </div>
                                        </BoxFlex>
                                    ))
                                }
                                <Button
                                    bg='#fff'
                                    color='var(--primary-color)'
                                    type='button'
                                    width='80%'
                                    top='0'
                                    border='1px solid var(--primary-color)'
                                >
                                    Select
                                </Button>
                            </PlanCard>
                        ))
                    }
                </PlanWrap>
            </MainWrap>
        </>
    )
}

export default SelectPlan;

const plans = [
    {
        name: 'Plan A',
        plans: [
            'Pay 20% of property cost as downpayment to lock down the property',
            'Spread remaining 80% over the next 24 to 36 months (2-3 years)',
            'Get a provisional letter of allocation.'
        ]
    },
    {
        name: 'Plan B',
        plans: [
            'Pay down 15% of property cost to lock down this unit and get a provisional letter of allocation',
            'Contribute 15% of property cost over a period to make up 30% downpayment',
            'Access 20%-25% of RSA balance.',
            'Complete payment through Mortgage'
        ]
    },
    {
        name: 'Plan C',
        plans: [
            'Contribute 15% of property cost and over a period and get a provisional letter of allocation',
            'Spread remaining 15% of property cost to make up 30% downpayment',
            'Access 20%-25% of RSA balance',
            'Complete payment through Mortgage'
        ]
    }
]