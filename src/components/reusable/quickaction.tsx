import React from 'react';
import { QuickActionWrap, QuickItem } from '../dashboard/style';
import Typography from './typography';
import { ArrowTopRightOnSquareIcon, LifebuoyIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const QuickActionWidget = () => {

    const navigate = useNavigate();

    const navList = [
        {
            name: 'Explore Properties',
            icon: ArrowTopRightOnSquareIcon,
            link: '/search',
            activeClass: '',
            action: () => {}
        },
        {
            name: 'Contact Support',
            icon: LifebuoyIcon,
            link: '/contact-support',
            activeClass: '',
            action: () => {}
        },
    ]
    return(
        <>
            <QuickActionWrap>
                <Typography 
                    text='Quick Actions'
                    color='#091525'
                    fontWeight={500}
                    fontSize='14px'
                    lineHeight='21px'
                    margin='0 0 0 16px'
                />
                <div
                    style={{
                        margin: '0.4rem 0 0 0'
                    }}
                >
                    {
                        navList.map((item, index) => ( 
                            <QuickItem
                                className={`nav-class ${item.activeClass ? 'active-nav' : ''}`}
                                onClick={() => navigate(item.link)}
                            >
                                <div>
                                    <p>{item.name}</p>
                                    {React.createElement(item.icon, {
                                        className: 'w-5 w-5'
                                    })}
                                </div>
                            </QuickItem>
                        ))
                    }
                </div>
            </QuickActionWrap>
        </>
    )
}

export default QuickActionWidget;