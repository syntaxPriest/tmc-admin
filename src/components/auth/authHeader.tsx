import React from 'react';
import { AuthHeader, AuthHeaderImg } from '../../styles/authentication';
import { Link } from 'react-router-dom';

const AuthHeaderComp = () => {
    return(
        <>
            <AuthHeader>
                <Link to='/'>
                    <AuthHeaderImg 
                        src='/c-logo.png'
                        alt='Contribuild'
                    />
                </Link>
            </AuthHeader>
        </>
    )
}

export default AuthHeaderComp;