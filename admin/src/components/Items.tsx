import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { openAreYouSureModal, openEditModal } from "store/reducer/adminSlice";
import { IconPlay } from "assets/icons";
import { useNavigate } from "react-router-dom";
import { editModalStateReselect } from "store/selector/adminSelector";
import { IMovieData } from "interface";
import { SyntheticEvent } from "react";

interface IItemsProps {
  data: IMovieData;
}

interface IStyledProps {
  open: boolean;
}

export const Items = ({ data }: IItemsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector(editModalStateReselect);

  const handler = (id: any, event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(openEditModal(id));
  };

  const removeData = () => {
    dispatch(openAreYouSureModal(true));
    document.body.style.overflow = "hidden";
  };

  const editNavigator = (id: any) => {
    navigate(`/update/${id}`);
    dispatch(openEditModal(""));
  };

  return (
    <Item>
      <a
        href={`http://localhost:3000/video/${data._id}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image>
          <ImageInner>
            <img src={data.poster} alt={data.category} />
            <IconPlay width={30} height={30} fill={"white"} />
            <VideoDuration>{data.duration}</VideoDuration>
          </ImageInner>
        </Image>
      </a>

      <TextContent onClick={(e) => handler("", e)}>
        <Title>
          <EllipsisText>{data.title}</EllipsisText>
        </Title>
        <Description onClick={(e) => handler("", e)}>
          <EllipsisText>{data.description}</EllipsisText>
        </Description>
        <Metatags onClick={(e) => handler("", e)}>
          <EllipsisText>{data.metatags}</EllipsisText>
        </Metatags>
      </TextContent>
      <Actions open={selector === data._id}>
        <Overlay>
          <Edit onClick={() => editNavigator(data._id)}>
            <p>Edit</p>
          </Edit>
          <Remove onClick={removeData}>
            <p>Delete</p>
          </Remove>
        </Overlay>
      </Actions>
      <Dots onClick={(e) => handler(data._id, e)}>
        <div></div>
        <div></div>
        <div></div>
      </Dots>
    </Item>
  );
};

const Image = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 170px;
  height: 100%;
  border-radius: 15px 0 0 15px;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 300ms;
  }
`;
const ImageInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.7;
    transition: 300ms;

    &:hover {
      transform: translate(-50%, -50%) scale(1.1);

      img {
        transform: scale(1.1);
      }
    }
  }
`;
const VideoDuration = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  font-size: 12px;
`;
const Item = styled.div`
  position: relative;
  width: 100%;
  height: 90px;
  background: #3a3845;
  border-radius: 15px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: 150ms ease-in-out;

  &:nth-child(even) {
    background: #28282c;
  }
`;

const TextContent = styled.div`
  width: 77%;
  transform: translate(35px);
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled.div`
  height: 100%;
  width: 25%;
  padding: 5px 10px;
  border-right: 1px solid #000;
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const EllipsisText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 22px;
`;

const Description = styled.div`
  height: 100%;
  width: 501px;
  padding: 5px 10px;
  border-right: 1px solid #000;
  display: flex;
  align-items: center;
`;
const Metatags = styled.div`
  height: 100%;
  width: 257px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Actions = styled.div<IStyledProps>`
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  width: 80px;
  z-index: 2;
  height: 100%;
  border-radius: 0 15px 15px 0;
  transition: 150ms ease-in-out;
  transform: ${(props) =>
    props.open ? "translateX(0px)" : "translateX(80px)"};
`;
const Dots = styled.div`
  position: absolute;
  cursor: pointer;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: 300ms ease-in-out;

  &:hover {
    background: #2b2a2e;
  }

  div {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: white;

    &:nth-child(2) {
      margin: 5px 0;
    }
  }
`;
const ActionBtns = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;

  p {
    transform: rotate(-90deg);
    font-size: 24px;
    font-weight: 700;
    transition: 150ms ease-in-out;

    &:active {
      transform: rotate(-90deg) scale(0.8);
    }
  }
`;
const Overlay = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Edit = styled(ActionBtns)`
  background: #00ff7f;
`;
const Remove = styled(ActionBtns)`
  background: crimson;
`;
