import classNames from 'classnames';
import React, { type Dispatch, type SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactCountryFlag from 'react-country-flag';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BoxFlex } from '../../styles/reusable/index';
import Typography from './typography';
import { Countries } from '../../utils/countryCode'

interface PropsArgs {
    className?: string;
    width?: string;
    isSearchAble?: boolean;
    setPhoneCode?: Dispatch<SetStateAction<string>>;
}
export const PhoneCodeSelect = ({width, className, isSearchAble, setPhoneCode} : PropsArgs) => {

    const [activeCode, setActiveCode] = useState('NG');
    const [openOption, setOpenOption] = useState(false);

    return(
        <>
            <CustomSelect
                width={width}
            >
                <div 
                    className="flex items-center justify-between"
                    onClick={() => setOpenOption(!openOption)}
                >
                    <ReactCountryFlag
                        svg
                        countryCode={activeCode}
                        style={{
                            fontSize: '26px',
                        }}
                        aria-label={activeCode}
                    />
                    <ChevronDownIcon className='w-5 h-5' color='#8796AD' />
                </div>
                {
                    openOption && 
                    <SelectOptionsWrap>
                        {
                            Countries && Countries.length > 0 &&
                                Countries.map((item:any, index:number) => (
                                    <BoxFlex 
                                        hAlign='space-between'
                                        vAlign='center'
                                        style={{
                                            borderBottom: '1px solid #F0F3F6',
                                            padding: '8px 0'
                                        }}
                                        key={index}
                                        canHover
                                        onClick={() => {
                                            setActiveCode(item.code);
                                            setOpenOption(false);
                                            setPhoneCode && setPhoneCode(item.mobileCode);
                                        }}
                                    >
                                        <BoxFlex
                                            width='75%'
                                        >
                                            <ReactCountryFlag
                                                svg
                                                countryCode={item.code}
                                                style={{
                                                    fontSize: '26px',
                                                }}
                                                aria-label="Nigeria"
                                            />
                                            <Typography 
                                                text={item.name}
                                                color='#7081A0'
                                                fontWeight={500}
                                                fontSize='13px'
                                                lineHeight='17.6px'
                                                align='right'
                                            />
                                        </BoxFlex>
                                        <Typography 
                                            text={item.mobileCode}
                                            color='#7081A0'
                                            fontWeight={500}
                                            fontSize='13px'
                                            lineHeight='17.6px'
                                            align='right'
                                            className='w-[21%]'
                                        />
                                    </BoxFlex>
                                ))
                        }
                    </SelectOptionsWrap>
                }
            </CustomSelect>
        </>
    )
}

interface InputWrapProps {
    width?: string;
    margin?: string;
}

export const CustomSelect = styled.div<InputWrapProps>`
    width: ${p => p.width || '100%'};
    margin: 0 auto;
    text-align:left;
    margin: ${p => p.margin || '0 0 1rem 0'};
    position:relative;

    > div {
        background:#fff;
        padding:9.5px 12px;
        font-size:14px;
        text-align:left;
        border: 1px solid #C6CACD;
        box-shadow: 0px 4px 8px 0px #0000000A;
        border-radius:8px;
        width:100%;
        color: #1B2229;
        outline:none;
        cursor:pointer;

        @media (max-width:728px){
            font-size:16px;
            padding: 11px 12px; 
        }

        :hover {
            opacity: 0.3;
        }
    }

    
`

export const SelectOptionsWrap = styled.section`
    width: 350px;
    max-height: 170.77px;
    overflow-y: auto;
    position: absolute;
    top:3rem;
    left:0;
    background: #FFFFFF;
    box-shadow: 0px 8px 16px 0px #F4F8FD;
    border: 1px solid #EDF3FC;
    border-radius: 12px;
    padding: 8px 12px;
    z-index: 1000000;

    @media (max-width:728px){
        top: 3.5rem;
        width: 320px;
    }
`