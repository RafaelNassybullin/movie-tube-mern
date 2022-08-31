import styled from "styled-components";
import {
  openAreYouSureModal,
  openEditModal,
  deleteStart,
  getAdminData,
} from "store/reducer/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { editModalStateReselect } from "store/selector/adminSelector";

export const AreYouSure = () => {
  const dispatch = useDispatch();
  const id = useSelector(editModalStateReselect);

  const closeModal = () => {
    dispatch(openAreYouSureModal(false));
    dispatch(openEditModal(""));
    document.body.style.overflow = "unset";
  };

  const deleteAndClose = () => {
    dispatch(deleteStart(id));
    closeModal();
    //@ts-ignore
    dispatch(getAdminData());
  };

  return (
    <Absolute>
      <Wrapper>
        <Modal>
          <QuestionTitle>Are you sure?</QuestionTitle>
          <Buttons>
            <Success onClick={deleteAndClose}>Yes</Success>
            <Danger onClick={closeModal}>No</Danger>
          </Buttons>
        </Modal>
      </Wrapper>
      <Overlay onClick={closeModal} />
    </Absolute>
  );
};
const Absolute = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 49;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #0000003d;
  backdrop-filter: blur(10px);
  z-index: 13;
`;
const Modal = styled.div`
  width: 400px;
  height: 250px;
  background: #2d2c2c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  transition: 150ms ease-in-out;
  z-index: 14;
`;
const QuestionTitle = styled.p`
  font-size: 45px;
  margin-bottom: 20px;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ButtonItem = styled.button`
  width: 120px;
  height: 50px;
  font-size: 25px;
  outline: none;
  border: none;
  background: #4b7be5;
  color: #fff;
  border-radius: 25px;
  margin: 10px;
  cursor: pointer;
  transition: 50ms ease-in-out;

  &:active {
    transform: scale(0.85);
  }
`;
const Success = styled(ButtonItem)`
  background: springgreen;
`;
const Danger = styled(ButtonItem)`
  background: crimson;
`;
