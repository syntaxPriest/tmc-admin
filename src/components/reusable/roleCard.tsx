import React from 'react';
import styled from 'styled-components';
import * as Icon from 'react-feather';

interface PropsArgs {
    text?: string;
    hasIcon?: boolean;
    iconAction?: any;
    btnAction?: any;
    color?: string;
    bg?: string;
    border?: string;
}

const RoleCardComp = ({text, hasIcon, iconAction, btnAction, color, bg, border} : PropsArgs) => {
    return(
        <>
            <RoleCard
                onClick={() => btnAction()}
                bg={bg}
                color={color}
                border={border}
            >
                {text}
                {
                    hasIcon ?
                        <Icon.X 
                            size={20}
                            onClick={() => iconAction()}
                        />
                        : null
                }
            </RoleCard>
        </>
    )
}
    
export default RoleCardComp;

export const RoleCardWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

interface RoleCardProps {
  color?: string;
  bg?: string;
  border?: string;
}

export const RoleCard = styled.div<RoleCardProps>`
  padding: 5px 15px;
  background: ${p => p.bg || 'var(--secondary-color)'};
  border-radius: 20px;
  color: ${p => p.color || '#fff'};
  border: ${p => p.border || 'none'};
  font-size: 14px;
  display: flex;
  align-items: Center;
  gap: 7px;
  max-width: 250px;
  cursor: pointer;

  > p {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :hover {
    opacity: 0.6;
  }
`;