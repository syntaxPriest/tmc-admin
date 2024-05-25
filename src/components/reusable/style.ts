import styled from 'styled-components';

export const AlertArea = styled.div`
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: 1028px) {
    background: #ffffff;
    overflow: auto;
  }
`;

export const ModalChild = styled.div`
  width: auto;
  max-height: 90%;
  padding: 2% 3%;
  background: #ffffff;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1028px) {
    width: 86%;
    z-index: 1000000;
    margin: 0 auto;
    padding: 0 7%;
    position: fixed;
    left: 0;
    top: 0;
    border: none;
    border-radius: 0;
    height: 100%;
    box-shadow: none;
    max-height: 100%;
  }
`;

export const CloseBtn = styled.i`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #676879;

  @media (max-width: 900px) {
    top: 1rem;
    font-size: 1.5rem;
    right: 1rem;
  }
`;

export const SmallBtn = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;

  > button {
    background: var(--primary-color);
    border-radius: 4px;
    color: #ffffff;
    padding: 0.5rem 2rem;
    margin: 2rem 0 0 0;
  }
`;

export const Center = styled.div`
  width: 25rem;
  height: 100%;
  padding: 4% 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: Center;
  text-align: center;

  @media (max-width: 1028px) {
    width: 100%;
    padding: 4% 2%;
  }

  img {
    width: 5rem;
    height: 5rem;
  }

  h3 {
    font-weight: bolder;
    margin: 2rem 0 0 0;
  }

  p {
    color: #757575;
    font-size: 0.8rem;
  }
`;

export const AvatarImage = styled.img`
  width:3rem;
  height:3rem;
  border-radius: 50%;
  object-fit:cover;
`