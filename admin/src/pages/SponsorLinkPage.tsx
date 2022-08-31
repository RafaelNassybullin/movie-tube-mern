import { useState } from "react"
import styled from "styled-components";
import $api from "http";

export const SponsorLinkPage = () => {
  const [vastInputValue, setVastInputValue] = useState("");

  const postVastLink = async () => {
    if (vastInputValue) {
      //@ts-ignore
      await $api.post("http://localhost:7777/api/sponsorVastLink", { link: vastInputValue })
    }
    setVastInputValue("")
  }

  return (
    <Wrapper>
      <PromoWrapper>
        <h1>Sponsor link</h1>
        <InputPromotion
          value={vastInputValue}
          onChange={(e) => setVastInputValue(e.target.value)}
          type="text"
          placeholder="Type the sponsor vpaid link" />
        <button type="submit" onClick={postVastLink}>Save</button>
      </PromoWrapper>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -100px;

h1{
  color: white;
  font-family: sans-serif;
  font-size: 80px;
  margin-bottom: 30px;
}

button{
  font-size: 20px;
  outline: none;
  border: none;
  padding: 10px 40px;
  border-radius: 25px;
  margin-top: 30px;
  background: crimson;
  cursor: pointer;
  color: white;

  &:hover {
  background: springgreen;
  }
}
`;

const PromoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputPromotion = styled.input`
  width: 1100px;
  height: 40px;
  outline: none;
  border: none;
  font-size: 20px;
  padding: 20px;
  border-radius: 25px;
`;