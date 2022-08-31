import styled from "styled-components";
import { Elipsis } from "styles";
import { IMovieData } from "interface";

interface ICardProps {
  data: IMovieData;
}

export const Card = ({ data }: ICardProps) => {
  return (
    <Wrapper>
      <Image>
        <Inner>
          <PlayIcon>
            <Triangle />
          </PlayIcon>
          <img src={data.poster} alt={data.title} />
        </Inner>
      </Image>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 476px;
  background: rgb(53, 53, 53);
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  user-select: none;
  padding: 10px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 650px) {
    height: 386px;
    margin-bottom: 15px;
    border-radius: 18px;
  }
  @media (max-width: 530px) {
    border-radius: unset;
  }
  @media (max-width: 435px) {
    height: 310px;
  }
  @media (max-width: 328px) {
    height: 279px;
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 650px) {
    height: 276px;
  }
  @media (max-width: 435px) {
    height: 190px;
  }
  @media (max-width: 328px) {
    height: 156px;
  }
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const PlayIcon = styled.div`
  position: absolute;
  width: 44px;
  height: 44px;
  background: crimson;
  opacity: 0.79;
  border-radius: 50%;
  top: 40%;
  left: 43%;
  transform: translate(-50% -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 7;
  @media (max-width: 650px) {
    top: 41%;
    left: 46%;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  margin-left: 3px;
  border-style: solid;
  border-width: 10px 0 10px 17px;
  border-color: transparent transparent transparent white;
`;

const Text = styled.div`
  width: 100%;
  height: 89px;
  overflow: hidden;

  @media (max-width: 328px) {
    padding: 0;
    height: 102px;
  }
`;

const Title = styled.div`
  max-height: 35px;
  overflow: hidden;
  h2 {
    font-size: 15px;
    text-transform: capitalize;
    @media (max-width: 650px) {
      font-size: 16px;
    }
  }
`;

const Paragraph = styled(Elipsis)`
  margin-top: 10px;
  height: 140px;
  overflow: hidden;
  font-size: 12px;
  -webkit-line-clamp: 3;
`;

const Time = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 39px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  font-size: 14px;
  font-weight: 700;
  z-index: 7;
`;
