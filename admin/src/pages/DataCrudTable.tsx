import { useState } from "react";
import styled from "styled-components";
import { Items } from "components/Items";
import { useNavigate } from "react-router-dom";
import { AreYouSure } from "components/AreYouSure";
import { useSelector, useDispatch } from "react-redux";
import {
  areYouSureModalStateReselect,
  dataAdminReselect,
  allDataCountReselect,
} from "store/selector/adminSelector";
import { Pagination } from "components/Pagination";
import { IconBurger } from "assets/icons/IconBurger";
import { logout } from "store/reducer/authSlice";
import { IMovieData } from "interface";

const DataCrudTable = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();

  const modalState = useSelector(areYouSureModalStateReselect);
  const adminData = useSelector(dataAdminReselect);
  const allDataCount = useSelector(allDataCountReselect);

  const navigate = useNavigate();

  const handler = () => {
    setOpenMenu(false);
    navigate("/add");
  };

  return (
    <Wrapper>
      <Header>
        <Container>
          <Wrap>
            <TitleCount>
              <h1>AllData</h1>
              <ItemCount>
                {parseInt(allDataCount.toString()).toLocaleString("ru-RU")}
              </ItemCount>
            </TitleCount>
            <Pagination />
            <MenuBtn onClick={() => setOpenMenu(true)}>
              <IconBurger />
            </MenuBtn>
          </Wrap>
        </Container>
      </Header>
      <Container>
        <ItemWrapper>
          {adminData.map((data: IMovieData) => (
            <Items key={data._id} data={data} />
          ))}
        </ItemWrapper>
      </Container>
      {openMenu && (
        <Overlay onClick={() => setOpenMenu(false)}>
          <Container>
            <Menu>
              <Add onClick={handler}>ADD NEW</Add>
              <Promotion onClick={() => navigate("/sponsor")}>
                Promotion
              </Promotion>
              <a href="https://angular.io/" target={"_blank"} rel="noreferrer">
                <Statistics>Metrics</Statistics>
              </a>
              <LogOut onClick={() => dispatch(logout())}>LogOut</LogOut>
            </Menu>
          </Container>
        </Overlay>
      )}

      {modalState && <AreYouSure />}
    </Wrapper>
  );
};

export default DataCrudTable;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: -20px;
`;
const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px;
  color: white;
  position: relative;

  h1 {
    user-select: none;
    cursor: default;

    &:hover {
      color: springgreen;
    }
  }
`;
const ItemWrapper = styled.div`
  padding-bottom: 47px;
`;
const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #2822233d;
  backdrop-filter: blur(30px);
  z-index: 10;
`;
const MenuBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
const Wrap = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;
const Add = styled.button`
  width: 140px;
  height: 40px;
  color: white;
  outline: none;
  font-weight: 700;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: 150ms ease-in-out;
  background: springgreen;

  &:active {
    transform: scale(0.9);
  }
`;
const Promotion = styled(Add)`
  background: blueviolet;
`;
const TitleCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 15px;
    transition: 300ms;

    &:hover {
      fill: springgreen;
      transform: scale(1.1);
      cursor: pointer;
    }
  }
`;
const ItemCount = styled.div`
  transform: translate(-10px, -12px);
  padding: 4px 8px;
  color: white;
  border-radius: 25px;
  background: crimson;

  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: default;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  top: 65px;
  right: 10px;
  width: 160px;
  height: 210px;
  border-radius: 15px;
  background: #282223;
  padding: 10px 0;
`;
const LogOut = styled(Add)`
  background: crimson;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 89;
`;
const Statistics = styled(Add)`
  background: #4b7be5;
`;
