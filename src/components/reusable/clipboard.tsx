import React from 'react';
import styled from 'styled-components';

const CopiedNotifier = () => {

  return (
    <>
        <CopyNotifierWrap>
            <p>
                Copied to clipboard
            </p>
        </CopyNotifierWrap>
    </>
  );
};

export default CopiedNotifier;

const CopyNotifierWrap = styled.div`
    width: auto;
    margin: 0 auto;
    background: linear-gradient(0deg, rgba(20, 126, 250, 0.1), rgba(20, 126, 250, 0.1)),
    linear-gradient(0deg, #EBF4FE, #EBF4FE);
    border: 1px solid #147EFA1A;
    padding: 10px 16px;
    box-shadow: 0px 16px 25px 0px #91ACCA3D;
    position: fixed;
    top: 2.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 8px;
    z-index: 100000;

    > p {
        width: auto,
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: -0.01em;
        text-align: center;
    }

`
