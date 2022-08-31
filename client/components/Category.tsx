import styled from "styled-components";
import { Overlay, Container } from "styles";
import Link from "next/link";

export const categoryData = [
  "dorama",
  "anime",
  "action",
  "adventure",
  "comedy",
  "horrors",
  "drama",
  "fantasy",
  "horror",
  "mystery",
  "thriller",
  "western",
];

interface ICategoryProps {
  categoryModalClose: () => void;
}

export const Category = ({ categoryModalClose }: ICategoryProps) => {
  return (
    <>
      <Main>
        <Container>
          <Wrapper>
            <p>Category: </p>
            <ul>
              {categoryData.map((data, index) => (
                <Link key={index} href={`/category/${data}`}>
                  <a>
                    <CategoryItem onClick={() => categoryModalClose()}>
                      {data}
                    </CategoryItem>
                  </a>
                </Link>
              ))}
            </ul>
          </Wrapper>
        </Container>
        <Overlay onClick={() => categoryModalClose()} />
      </Main>
    </>
  );
};

const Main = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 112;
  user-select: none;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 76px;
  right: 49px;
  width: 290px;
  height: 460px;
  background: white;
  box-shadow: 0px 12px 49px 13px rgba(0, 0, 0, 0.63);
  border: 1px solid crimson;
  border-radius: 15px;
  padding: 12px;
  z-index: 19;
  @media (max-width: 530px) {
    right: 25px;
  }
  p {
    color: crimson;
  }
  &::before {
    content: "";
    position: absolute;
    border-top: 1px solid crimson;
    border-left: 1px solid crimson;
    top: -13px;
    right: 30px;
    background: white;
    width: 25px;
    height: 25px;
    border-radius: 7px 0 0 0;
    z-index: 18;
    transform: rotate(45deg);
  }
`;

const CategoryItem = styled.li`
  width: 100%;
  height: 35px;
  display: flex;
  cursor: pointer;
  font-size: 18px;
  align-items: flex-end;
  color: black;
  border-bottom: 1px solid gray;
  text-transform: capitalize;

  &:hover {
    color: gray;
  }
`;
