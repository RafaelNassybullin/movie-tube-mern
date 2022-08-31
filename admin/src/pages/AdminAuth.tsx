import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { isCheckLoaderReselect } from "store/selector/authSelector";
import { login } from "store/reducer/authSlice";

const AdminAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const isCheckLoader = useSelector(isCheckLoaderReselect);

  const handlerSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  return (
    <MainContainer>
      <Wrapper>
        <Title>Welcome to Admin!</Title>
        <div>
          <Wrap>
            <input
              type="text"
              placeholder={"Login"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Wrap>
          <Wrap>
            <input
              type="password"
              placeholder={"Password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Wrap>
        </div>
        <Submit type={"submit"} onClick={handlerSubmit}>
          Submit
        </Submit>
      </Wrapper>
      {isCheckLoader && (
        <Loader>
          <div></div>
        </Loader>
      )}
    </MainContainer>
  );
};

export default AdminAuth;

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  margin-top: -110px;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 300px;
  background: #2822233d;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

  div {
    width: 90px;
    height: 90px;
    border: white 15px solid;
    border-right-color: transparent;
    border-radius: 50%;
  }
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-top: 20px;

  input {
    font-size: 20px;
    height: 34px;
    outline: none;
    padding: 20px;
    border: none;
    background: #232323;
    color: white;
    border-radius: 25px;

    & ::placeholder {
      color: white;
    }
  }
`;

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Submit = styled.button`
  width: 320px;
  height: 40px;
  background: crimson;
  border-radius: 25px;
  color: white;
  font-size: 20px;
  outline: none;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;
