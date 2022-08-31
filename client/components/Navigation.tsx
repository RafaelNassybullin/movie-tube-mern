import { useState, useEffect } from "react";
import styled from "styled-components";
import { Container } from "styles";
import Link from "next/link";
import Image from "next/image";
import { Search } from "components/Search";
import { Category } from "components/Category";
import { Overlay } from "styles";
import searchIcon from "public/search.svg";
import categoryIcon from "public/category.svg";

export const Navigation = () => {
  const [search, setSearch] = useState(false);
  const [category, setCategory] = useState(false);

  const searchModalHandler = () => {
    setSearch(!search);
  };

  const categoryModalHandler = () => {
    setCategory(!category);
  };

  const [show, setShow] = useState(true);
  const [lastScroll, setlastScroll] = useState(0);

  const showHideNavbar = () => {
    setlastScroll(window.scrollY);
    if (window.scrollY > 250 && window.scrollY > lastScroll) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", showHideNavbar);
    return () => {
      document.removeEventListener("scroll", showHideNavbar);
    };
  });

  return (
    <>
      <Header open={show}>
        <nav>
          <Container>
            <Wrapper>
              <Link href="/">
                <a>
                  <Logo>MovieTube</Logo>
                </a>
              </Link>
              <Menu>
                <MenuBtn onClick={searchModalHandler}>
                  <Image src={searchIcon} />
                </MenuBtn>
                <MenuBtn onClick={categoryModalHandler}>
                  <Image src={categoryIcon} />
                </MenuBtn>
              </Menu>
            </Wrapper>
          </Container>
        </nav>
      </Header>
      {search && (
        <>
          <Search searchModalClose={searchModalHandler} />
          <Overlay onClick={searchModalHandler} />
        </>
      )}
      {category && (
        <>
          <Category categoryModalClose={categoryModalHandler} />
        </>
      )}
    </>
  );
};

interface IHeader {
  open: boolean;
}

const Header = styled.header<IHeader>`
  width: 100%;
  background: crimson;
  backdrop-filter: blur(30px);
  padding: 19px 0;
  position: fixed;
  transition: 300ms top ease-in-out;
  top: ${(props) => (props.open ? "0" : "-100%")};
  left: 0;
  z-index: 17;
  font-family: sans-serif;
  @media (max-width: 540px) {
    padding: 15px 23px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 65px;
  font-weight: 400;
  line-height: 0;
  color: white;
  font-family: "Olgactt", sans-serif;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  @media (max-width: 540px) {
    font-size: 43px;
  }
`;

const Menu = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 30px;
`;

const MenuBtn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
`;
