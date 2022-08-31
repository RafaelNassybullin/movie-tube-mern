import Link from "next/link";
import styled from "styled-components";
import { Elipsis, Container } from "styles";
import { CLIENT_URL } from "config";
import { IMovieData } from "interface";

interface IVideoPlayerProps {
  video: IMovieData;
}

export const VideoPlayer = ({ video }: IVideoPlayerProps) => {
  return (
    <Container>
      <Wrapper>
        <Playerr>
          <iframe
            src={`${CLIENT_URL}player/${video._id}`}
            scrolling="no"
            frameBorder="0"
          ></iframe>
        </Playerr>
        <Text>
          <VideoTitle>
            <h2>{video.title}</h2>
          </VideoTitle>
          <Views>{parseInt(video.views).toLocaleString("ru-RU")} viewers</Views>
          <Link href={`/category/${video.category}`}>
            <a>
              <Category>{video.category}</Category>
            </a>
          </Link>
          <h3>Description: </h3>
          <Description>
            <p>{video.description}</p>
          </Description>
        </Text>
      </Wrapper>
    </Container>
  );
};

const Playerr = styled.div`
  position: relative;
  width: 100%;
  max-height: 580px;
  background: #1c1c1c;
  overflow: hidden;
  border-radius: 10px;
  padding-top: 49%;
  @media (max-width: 530px) {
    border-radius: unset;
    padding-top: 58%;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 45px;
`;

const Text = styled.div`
  margin-top: 30px;
  font-size: 18px;
  @media (max-width: 530px) {
    padding: 0 23px;
  }
  h2 {
    font-size: 37px;
    text-transform: capitalize;
    margin-bottom: 15px;
    @media (max-width: 950px) {
      font-size: 24px;
    }
  }
  h3 {
    margin: 15px 0;
    color: black;
  }
`;

const Views = styled.div`
  color: black;
  margin-left: 7px;
`;

const Category = styled.div`
  background: white;
  margin: 7px;
  padding: 3px 10px;
  border: 1px solid gray;
  text-transform: capitalize;
  border-radius: 17px;
  letter-spacing: 1px;
  width: fit-content;
`;

const Description = styled(Elipsis)`
  -webkit-line-clamp: 3;
`;

const VideoTitle = styled(Elipsis)`
  -webkit-line-clamp: 2;
  margin-bottom: 30px;
`;
