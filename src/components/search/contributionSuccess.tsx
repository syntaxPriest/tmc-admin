import React, { useState } from 'react';
import { BoxFlex, BreadcrumbArea, DescHeader, IconFlex, Line, MainWrap, PropertyWrap, RandomCircle } from '../../styles/reusable/index';
import Typography from '../reusable/typography';
import AuthHeaderComp from '../auth/authHeader';
import { AuthBacknav, LoneWrap } from '../../styles/authentication';
import { InputWrap, InputField } from '../../styles/authentication';
import { Button } from '../../styles/reusable';
import * as Icon from 'react-feather';
import { CalcDetailsWrap, CalculatorFlex, LineBoxWrap, LineFlex } from './style';
import Error from '../reusable/error';
import AgreementModal from './agreementModal';
import { useNavigate } from 'react-router-dom';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import CopiedNotifier from '../reusable/clipboard';
import { copyText } from '../../utils/copyText';

const ContributionSuccess = () => {

    const navigate = useNavigate();
    
    return(
        <>
            <AuthHeaderComp />
            <MainWrap
                top='2rem'
                width='100%'
                maxWidth='1300px'
            >
                <LoneWrap
                    textAlign='center'
                    showBorder={true}
                >
                    <div
                        style={{
                            margin: '1.5rem 0 0 0'
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
                        >
                            Continue
                        </Button>
                    </div>
                </LoneWrap>
            </MainWrap>
        </>
    )
}

export default ContributionSuccess;