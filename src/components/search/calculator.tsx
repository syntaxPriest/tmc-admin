import React, { useEffect, useState } from 'react';
import { BoxFlex, BreadcrumbArea, DescHeader, IconFlex, Line, MainWrap, PropertyWrap, RandomCircle } from '../../styles/reusable/index';
import Typography from '../reusable/typography';
import AuthHeaderComp from '../auth/authHeader';
import { AuthBacknav } from '../../styles/authentication';
import { InputWrap, InputField } from '../../styles/authentication';
import { Button } from '../../styles/reusable';
import * as Icon from 'react-feather';
import { CalcDetailsWrap, CalculatorFlex, LineFlex } from './style';
import Error from '../reusable/error';
import AgreementModal from './agreementModal';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { useProperties } from '../../store/properties/useProperties';
import commaNumber from 'comma-number'; 
import { fixedNum } from '../../utils/roundFloat';
import { setCalculatorResult, setCurrentBill } from '../../store/properties/reducer';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

interface optionsargs {
    label: string;
    value: string | number
}

const SearchIndex = () => {

    const dispatch = useDispatch();
    const [showAgreement, setShowAgreement] = useState(false);
    const [durationOptions, setDurationsOpitons] = useState<Array<optionsargs>>([])
    const [interestOptions, setInterestsOpitons] = useState<Array<optionsargs>>([])
    const { calculatorPlan } = useProperties();
    const navigate = useNavigate();
    const { activeProperty, result } = useProperties();

    // Calculator States and Results
    const [calculated, setCalculated] = useState<boolean>(false)
    const [downpayment, setDownPayment] = useState(0);
    const [equity, setEquity] = useState(0)
    const [checkoutAmount, setCheckoutAmount] = useState(0)
    const [monthlyContribution, setMonthlyContribution] = useState(0)
    const [age, setAge] = useState<string | number>();
    const [duration, setDuration] = useState(0)
    const [monthlySalary, setMonthlySalary] = useState()
    const [rsaBalance, setRsaBalance] = useState(0)
    const [interest, setInterest] = useState<number>()

    useEffect(() => {
        if (result){
            setAge(result?.age)
            setDuration(result?.duration)
            setDownPayment(result?.downpayment)
            setEquity(result?.equity)
            setRsaBalance(result?.rsaBalance)
            // setInterest(result?.interest)
            setCheckoutAmount(result?.checkoutAmount)
        }
    }, [result])

    const loadDurationOptions = () => {
        for (let i:number = 0; i < 37; i++){
            if (i === 0){
                setDurationsOpitons(prev => prev.concat({
                    label: `Select Duration`,
                    value: ''
                }))
            }
            if (i > 0 && durationOptions.length < 36){
                setDurationsOpitons(prev => prev.concat({
                    label: i === 1 ? `${i} month` : `${i} months`,
                    value: i
                }))
            }
        }
    }

    // const loadInterestOptions = () => {
    //     for (let i:number = 15; i < 33; i++){
    //         if (i === 15){
    //             setInterestsOpitons(prev => prev.concat({
    //                 label: `Select Interest Rate`,
    //                 value: ''
    //             }))
    //         }
    //         if (i > 15 && durationOptions.length < 32){
    //             setInterestsOpitons(prev => prev.concat({
    //                 label: `${i}%`,
    //                 value: i
    //             }))
    //         }
    //     }
    // }

    useEffect(() => {
        loadDurationOptions();
        // loadInterestOptions();
    }, [])

    const calculate = (e:any) => {
        e.preventDefault();
        switch (calculatorPlan) {
            case 'Plan A':
                if (duration && activeProperty?.price){
                    setDownPayment((Number(activeProperty?.price) * 0.2))
                    setCheckoutAmount(Number(activeProperty?.price) * 0.2)
                    setMonthlyContribution((Number(activeProperty?.price) * 0.8) / Number(duration))
                    setCalculated(true);
                }
                break;
                case 'Plan B':
                    if (duration && activeProperty?.price && interest ){
                        setDownPayment((Number(activeProperty?.price) * 0.3))
                        setCheckoutAmount(Number(activeProperty?.price) * 0.15)
                        if (rsaBalance){
                            setMonthlyContribution(((((Number(activeProperty?.price) * 0.15) - (rsaBalance * 0.25)) + ((Number(activeProperty?.price))))) / Number(duration))
                            setEquity(((((Number(activeProperty?.price) * 0.15) - (rsaBalance * 0.25)) + ((Number(activeProperty?.price))))))
                        }else {
                            setMonthlyContribution((((Number(activeProperty?.price) * 0.15) + ((Number(activeProperty?.price))))) / Number(duration))
                            setEquity((Number(activeProperty?.price) * 0.15) + (Number(activeProperty?.price)))
                        }
                        setCalculated(true);
                    }
                    break;
                case 'Plan C':
                        if (duration && activeProperty?.price && interest ){
                            setDownPayment((Number(activeProperty?.price) * 0.3))
                            setCheckoutAmount(Number(activeProperty?.price) * 0.15)
                            if (rsaBalance){
                                setMonthlyContribution(((((Number(activeProperty?.price) * 0.15) - (rsaBalance * 0.25)) + ((Number(activeProperty?.price))))) / Number(duration))
                                setEquity(((((Number(activeProperty?.price) * 0.15) - (rsaBalance * 0.25)) + ((Number(activeProperty?.price))))))
                            }else {
                                setMonthlyContribution((((Number(activeProperty?.price) * 0.15) + ((Number(activeProperty?.price))))) / Number(duration))
                                setEquity((Number(activeProperty?.price) * 0.15) + (Number(activeProperty?.price)))
                            }
                            setCalculated(true);
                        }
                        break;
            default:
                break;
        }
    }

    const startContribution = () => {
        if (calculatorPlan === 'Plan B' || calculatorPlan === 'plan C'){
            if ((Number(age) + (duration / 12)) <= 55){
                dispatch(setCalculatorResult({
                    equity,
                    rsaBalance,
                    age,
                    downpayment,
                    checkoutAmount,
                    duration,
                    interest
                }))
                setShowAgreement(true)
            }else {
                enqueueSnackbar({
                    variant: 'error',
                    message: "Sorry, you are not eligible to start contribution. Mortgage applications will not be processed due to age requirements.",
                    autoHideDuration: 10000
                })
            }
        }
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
                <CalculatorFlex>
                    <div>
                        <Typography 
                            text='Contribution Calculator'
                            color='#091525'
                            fontWeight={600}
                            fontSize='32px'
                            lineHeight='32px'
                        />
                        <Typography 
                            text='Check if you’re eligible to contribute for a property'
                            color='#245372'
                            fontWeight={400}
                            fontSize='15px'
                            lineHeight='22.5px'
                            margin='0.5rem 0 0 0'
                        />
                        <InputWrap
                            onSubmit={(e) => calculate(e)}
                        >
                            <InputField
                                margin='2rem 0 1rem 0'
                            >
                                <p>Property Value</p>
                                <input
                                    autoComplete="off"
                                    value={`₦${commaNumber(activeProperty?.price)}`}
                                    required
                                    disabled
                                />
                                <i>
                                    <LockClosedIcon className='w-6 h-5' color='#8796AD' />
                                </i>
                            </InputField>
                            {
                                (calculatorPlan === 'Plan B' || calculatorPlan === 'Plan C') &&
                                    <>
                                        {/* <InputField
                                            margin='0 0 1rem 0'
                                        >
                                            <p>Monthly Salary</p>
                                            <input
                                                autoComplete="off"
                                                placeholder='Enter monthly salary'
                                            />
                                        </InputField> */}
                                        <InputField
                                            margin='0 0 1rem 0'
                                        >
                                            <p>Pension (RSA) Balance</p>
                                            <input
                                                autoComplete="off"
                                                placeholder='Enter RSA Balance'
                                                value={rsaBalance}
                                                onChange={(e) => setRsaBalance(Number(e.target.value))}
                                            />
                                        </InputField>
                                    </>
                            }
                            <InputField
                                margin='0 0 1rem 0'
                            >
                                <p>Age</p>
                                <input
                                    autoComplete="off"
                                    placeholder='Enter your age'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </InputField>
                            <InputField
                                margin='0rem 0 1rem 0'
                                width={'100%'}
                            >
                                <p>Duration</p>
                                <select 
                                    autoComplete="off"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    required
                                >
                                    {
                                        durationOptions && durationOptions.length > 0 &&
                                            durationOptions.map((item, index) => (
                                                <option key={index} value={item.value} >{item.label}</option>
                                            ))
                                    }
                                </select>
                            </InputField>
                            {

                            }
                            <Button
                                bg='var(--primary-color)'
                                color='#fff'
                                type='submit'
                                width='100%'
                                top='5px'
                            >
                                Calculate
                            </Button>
                        </InputWrap>
                    </div>
                    <div>
                        {
                            !calculated && 
                            <>
                                 <div className="animate-pulse flex flex-col items-center gap-[15px] mt-[20px]">
                                    <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[90%]"></div>
                                    <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[70%]"></div>
                                </div>
                                <div className="animate-pulse flex gap-[15px] mt-[50px]">
                                    <div className="w-[100%]">
                                        <div className="flex justify-between mb-[10px]">
                                            <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[50%]"></div>
                                            <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[30%]"></div>
                                        </div>
                                        <div className="flex justify-between mb-[10px]">
                                            <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[50%]"></div>
                                            <div className="h-[2rem] bg-[#EDF3FC] rounded-3xl w-[30%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            calculated &&
                                <>
                                    <Typography 
                                        text={`₦${commaNumber(fixedNum(monthlyContribution, 2))}`}
                                        color='#091525'
                                        fontWeight={600}
                                        fontSize='32px'
                                        lineHeight='32px'
                                        align='center'
                                    />
                                    <Typography 
                                        text='Minimum monthly contribution'
                                        color='#245372'
                                        fontWeight={400}
                                        fontSize='15px'
                                        lineHeight='22.5px'
                                        margin='0.5rem 0 0 0'
                                        align='center'
                                    />
                                    {
                                        calculatorPlan === 'Plan C' &&
                                            <>
                                                <Typography 
                                                    text="You'll get the allocation letter when the first target is met."
                                                    color='#245372'
                                                    fontWeight={400}
                                                    fontSize='15px'
                                                    lineHeight='22.5px'
                                                    margin='0.5rem 0 0 0'
                                                    align='center'
                                                />
                                            </>
                                    }
                                    <CalcDetailsWrap>
                                        {
                                            (calculatorPlan === 'Plan B' || calculatorPlan === 'Plan C') &&
                                            <> 
                                                <LineFlex>
                                                    <p>Total Equity Contribution</p>
                                                    <h3>₦{commaNumber(equity)}</h3>
                                                </LineFlex>
                                                <Line />
                                                {
                                                    (calculatorPlan === 'Plan B') && 
                                                    <>
                                                        <LineFlex>
                                                            <p>Required Payment (15%)</p>
                                                            <h3>₦{commaNumber(checkoutAmount)}</h3>
                                                        </LineFlex>
                                                        <Line />
                                                    </>
                                                }
                                                {
                                                    (calculatorPlan === 'Plan C') && 
                                                    <>
                                                        <LineFlex>
                                                            <p>First Target Contribution (15%)</p>
                                                            <h3>₦{commaNumber(checkoutAmount)}</h3>
                                                        </LineFlex>
                                                        <Line />
                                                        <LineFlex>
                                                            <p>Second Target Contribution (15%)</p>
                                                            <h3>₦{commaNumber(checkoutAmount)}</h3>
                                                        </LineFlex>
                                                        <Line />
                                                    </>
                                                }
                                            </>
                                        }
                                        <LineFlex>
                                            <p>Duration of Contribution</p>
                                            <h3>{duration} {duration === 1 ? 'month' : 'months'}</h3>
                                        </LineFlex>
                                    </CalcDetailsWrap>
                                    <CalcDetailsWrap>
                                        <LineFlex>
                                            <p>Property Value</p>
                                            <h3>₦{commaNumber(activeProperty?.price)}</h3>
                                        </LineFlex>
                                        <Line />
                                        <LineFlex>
                                            <p>Downpayment</p>
                                            <h3>₦{commaNumber(downpayment)}</h3>
                                        </LineFlex>
                                        {
                                            (calculatorPlan === 'Plan B' || calculatorPlan === 'Plan C') &&
                                                <>
                                                    <Line />
                                                    <LineFlex>
                                                        <p>25% RSA Value</p>
                                                        <h3>₦{commaNumber(rsaBalance * 0.25)}</h3>
                                                    </LineFlex>
                                                </> 
                                        }
                                    </CalcDetailsWrap>
                                    {
                                        (calculatorPlan === 'Plan B' || calculatorPlan === 'Plan C') &&
                                            <Error
                                                message='Equity contribution is 30% of the Property Value minus 25% of RSA Value.'
                                                color='#1B2229'
                                                bg='#F0F3F6'
                                                border='none'
                                            />
                                    }
                                    <Button
                                        bg='var(--primary-color)'
                                        color='#fff'
                                        type='submit'
                                        width='100%'
                                        top='40px'
                                        onClick={() => {
                                            startContribution()
                                        }}
                                    >
                                        Start Contribution
                                    </Button>
                                </>
                            }
                    </div>
                </CalculatorFlex>
            </MainWrap>
            {
                showAgreement ?
                    <AgreementModal 
                        closeFunc={() => setShowAgreement(false)}
                        action={() => {
                            if (calculatorPlan === 'Plan A' || calculatorPlan === 'Plan B'){
                                dispatch(setCurrentBill(checkoutAmount))
                                navigate('/send-payment');
                            }else if (calculatorPlan === 'Plan C') {
                                navigate(`/dashboard/property/property name`)
                            }
                        }}
                    />
                    : null
            }
        </>
    )
}

export default SearchIndex;