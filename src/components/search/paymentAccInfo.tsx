import React from 'react';
import { MainWrap } from '../../styles/reusable/index';
import AuthHeaderComp from '../auth/authHeader';
import { AuthBacknav, LoneWrap } from '../../styles/authentication';
import { Button } from '../../styles/reusable';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import AccInfoComp from './accInfoComp';
import { useProperties } from '../../store/properties/useProperties';

const SearchIndex = () => {

    const navigate = useNavigate();
    const { currentBill } = useProperties()
    
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
                    <AuthBacknav
                        onClick={() => navigate(-1)}
                    >
                        <Icon.ArrowLeft 
                            color='#8796AD' 
                            size={20}
                        />
                        <p>Back</p>
                    </AuthBacknav>
                    <div
                        style={{
                            margin: '1.5rem 0 0 0'
                        }}
                    >
                        <AccInfoComp 
                            amount={currentBill ? currentBill : ''}
                        />
                        <Button
                            bg='var(--primary-color)'
                            color='#fff'
                            type='submit'
                            width='100%'
                            top='5px'
                            onClick={() => navigate('/contribution-response')}
                        >
                            I have sent the money
                        </Button>
                        <Button
                            bg='#fff'
                            color='var(--secondary-color)'
                            type='button'
                            width='100%'
                            top='3px'
                            onClick={() => navigate('-1')}
                        >
                            Cancel Payment
                        </Button>
                    </div>
                </LoneWrap>
                
            </MainWrap>
        </>
    )
}

export default SearchIndex;