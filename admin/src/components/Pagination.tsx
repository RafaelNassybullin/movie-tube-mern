import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAdminData } from "store/reducer/adminSlice";
import { countAdminReselect } from "store/selector/adminSelector";

export const Pagination = () => {
  const [currentButton, setCurrentButton] = useState<any>(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);
  const dispatch = useDispatch();
  const dataCount = useSelector(countAdminReselect);

  const numberOfPages: any = [];

  for (let i = 1; i <= dataCount; i++) {
    numberOfPages.push(i);
  }

  useEffect(() => {
    let tempNumberOfPages: any = [...arrOfCurrButtons];
    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";
    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }
    setArrOfCurrButtons(tempNumberOfPages);

    if (
      currentButton === "..." ||
      currentButton === "... " ||
      currentButton === " ..."
    ) {
    } else {
      dispatch(getAdminData(currentButton));
    }
  }, [currentButton, dataCount]);

  return (
    <Wrapper>
      <Prev
        className={`${currentButton === 1 ? "disabled" : ""}`}
        onClick={() =>
          setCurrentButton((prev:any) => (prev <= 1 ? prev : prev - 1))
        }
      >
        <svg
          width="25px"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          id="b385ca18-4b85-46d4-bb4b-571c73a19812"
          data-name="b922a425-e5e0-4ef1-881c-5748460fd139"
          viewBox="0 0 30.125 18.1738"
        >
          <path
            d="M29.75,9.3948,21.5281,1.1735a.8479.8479,0,0,0-.601-.261L20.9124.9119a.8526.8526,0,0,0-.5956.2409.8642.8642,0,0,0-.0027,1.23l6.7618,6.7611H.7316a.8566.8566,0,1,0,0,1.7131H27.0759l-6.7591,6.7591a.8576.8576,0,0,0-.0214,1.2113.8462.8462,0,0,0,.61.2583.8949.8949,0,0,0,.621-.2556l8.2233-8.224A.8587.8587,0,0,0,29.75,9.3948Z"
            transform="translate(0.125 -0.9119)"
          ></path>
        </svg>
        <p>Prev</p>
      </Prev>
      <PagesWrap>
        {arrOfCurrButtons.map((item, index) => (
          <Page
            key={index}
            className={`${currentButton === item ? "active" : ""}`}
            onClick={() => setCurrentButton(item)}
          >
            {item}
          </Page>
        ))}
      </PagesWrap>
      <Next
        className={`${
          currentButton === numberOfPages.length ? "disabled" : ""
        }`}
        onClick={() =>
          setCurrentButton((prev:any) =>
            prev >= numberOfPages.length ? prev : prev + 1
          )
        }
      >
        <p>Next</p>
        <svg
          width="25px"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          id="b385ca18-4b85-46d4-bb4b-571c73a19812"
          data-name="b922a425-e5e0-4ef1-881c-5748460fd139"
          viewBox="0 0 30.125 18.1738"
        >
          <path
            d="M29.75,9.3948,21.5281,1.1735a.8479.8479,0,0,0-.601-.261L20.9124.9119a.8526.8526,0,0,0-.5956.2409.8642.8642,0,0,0-.0027,1.23l6.7618,6.7611H.7316a.8566.8566,0,1,0,0,1.7131H27.0759l-6.7591,6.7591a.8576.8576,0,0,0-.0214,1.2113.8462.8462,0,0,0,.61.2583.8949.8949,0,0,0,.621-.2556l8.2233-8.224A.8587.8587,0,0,0,29.75,9.3948Z"
            transform="translate(0.125 -0.9119)"
          ></path>
        </svg>
      </Next>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 630px;
  height: 45px;
  background: #2a2a2f;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  padding: 5px;
  border-radius: 4px;
`;
const Move = styled.div`
  background: crimson;
  color: white;
  padding: 5px 7px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;

  &:hover {
    background: rgb(182, 53, 79);
  }
`;
const PagesWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .active {
    background: white;
    color: black;
    &:hover {
      background: white;
    }
  }
`;
const Page = styled.p`
  padding: 5px;
  margin-left: 7px;
  background: #454450;
  border-radius: 3px;
  display: flex;
  user-select: none;
  transition: background-color 0.2s;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:last-child {
    margin-right: 5px;
  }
  &:hover {
    background: #3a3942;
  }
`;
const Prev = styled(Move)`
  margin-right: 5px;
  user-select: none;
  &.disabled {
    opacity: 0.2;
  }
  svg {
    transform: rotate(180deg);
  }
  p {
    margin-left: 5px;
  }
`;
const Next = styled(Move)`
  margin-left: 5px;
  user-select: none;
  &.disabled {
    opacity: 0.2;
  }
  p {
    margin-right: 5px;
  }
`;
