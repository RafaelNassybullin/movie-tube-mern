import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

interface ISearchProps {
  searchModalClose: () => void;
}

export const Search = ({ searchModalClose }: ISearchProps) => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const searchHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    if (value) {
      router.push(`/search/${value}`);
      searchModalClose();
    } else {
      searchModalClose();
    }
  };

  return (
    <>
      <Block onSubmit={searchHandler}>
        <input
          type="text"
          value={value}
          placeholder="Search in the website..."
          autoFocus
          onChange={(event) => setValue(event.target.value)}
        />
      </Block>
    </>
  );
};

const Block = styled.form`
  position: fixed;
  top: 140px;
  left: 50%;
  z-index: 19;
  transform: translateX(-50%);
  overflow: hidden;
  border-radius: 8px;
  width: 760px;
  height: 60px;
  background: #312c2c89;
  backdrop-filter: blur(30px);
  box-shadow: 0px 12px 49px 13px rgba(0, 0, 0, 0.63);
  border: 1px solid crimson;
  @media (max-width: 769px) {
    width: 90%;
    top: 90px;
  }
  input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: transparent;
    color: white;
    font-size: 30px;
    padding: 0 20px;
    @media (max-width: 769px) {
      font-size: 23px;
    }
    &::placeholder {
      color: #8f8e8e;
    }
  }
`;
