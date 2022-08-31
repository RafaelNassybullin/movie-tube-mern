import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { categoryArray } from "api";
import { useDispatch } from "react-redux";
import { addStart } from "store/reducer/adminSlice";

interface IStyle {
  colors?: any;
}

export const AddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    title: yup.string().required("is not valid"),
    description: yup.string().required(),
    poster: yup.string().url().required(),
    urlvideo: yup.string().url().required(),
    metatags: yup.string().required(),
    category: yup.string().required(),
    duration: yup.string().min(5).max(5).required(),
    views: yup.number().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      poster: "",
      urlvideo: "",
      metatags: "",
      category: "action",
      duration: "00:00",
      views: Math.floor(Math.random() * 500000) + 1,
    },
    resolver: yupResolver(schema),
  });

  const submitData = (data: any): void => {
    dispatch(addStart(data));
    navigate("/");
  };

  return (
    <>
      <AddWrapper>
        <h1 style={{ color: "white", marginTop: "-110px", fontSize: "69px" }}>
          Add new data
        </h1>
        <Overlay>
          <WrapperForm>
            <div>
              <Text colors={!errors.title}>
                {!errors.title ? "Title:" : "Title couldn't be empty..."}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    colors={errors.title}
                    value={value}
                    placeholder="Type the title..."
                    onFocus={(e) => e.target.select()}
                    onChange={onChange}
                  />
                )}
                name="title"
              />
            </div>
            <div>
              <Text colors={!errors.description}>
                {!errors.description
                  ? "Description:"
                  : "Description couldn't be empty..."}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  //@ts-ignore
                  <TextArea
                    rows="4"
                    cols="50"
                    colors={errors.description}
                    value={value}
                    placeholder="Type the title..."
                    onChange={onChange}
                    onFocus={(e) => e.target.select()}
                  />
                )}
                name="description"
              />
            </div>

            <div>
              <Text colors={!errors.poster}>
                {!errors.poster ? "Poster:" : "Poster url is not valid"}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Link
                    className="link"
                    colors={errors.poster}
                    value={value}
                    onFocus={(e) => e.target.select()}
                    placeholder="Type the poster url..."
                    onChange={onChange}
                  />
                )}
                name="poster"
              />
            </div>
            <div>
              <Text colors={!errors.urlvideo}>
                {!errors.urlvideo ? "Video url:" : "Video url is not valid"}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Link
                    className="link"
                    colors={errors.urlvideo}
                    value={value}
                    onFocus={(e) => e.target.select()}
                    placeholder="Type the poster url..."
                    onChange={onChange}
                  />
                )}
                name="urlvideo"
              />
            </div>
            <div>
              <Text colors={!errors.metatags}>
                {!errors.metatags
                  ? "MetaTags:"
                  : "MetaTags couldn't be empty..."}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  //@ts-ignore
                  <TextArea
                    rows="4"
                    cols="50"
                    colors={errors.metatags}
                    value={value}
                    placeholder="Type the metatags..."
                    onChange={onChange}
                    onFocus={(e) => e.target.select()}
                  />
                )}
                name="metatags"
              />
            </div>
            <BottomWrapper>
              <div>
                <Text colors={!errors.category}>Category:</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <select value={value} onChange={onChange}>
                      {categoryArray.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  )}
                  name="category"
                />
              </div>
              <div>
                <Text colors={!errors.views}>Random views:</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <InputNumber
                      colors={errors.views}
                      value={value}
                      placeholder="Type the number..."
                      onFocus={(e) => e.target.select()}
                      onChange={onChange}
                    />
                  )}
                  name="views"
                />
              </div>
              <div>
                <Text colors={!errors.duration}>
                  {!errors.duration ? "Duration:" : "Is not valid..."}
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <InputNumber
                      colors={errors.duration}
                      value={value}
                      placeholder="Type the duration..."
                      onFocus={(e) => e.target.select()}
                      onChange={onChange}
                    />
                  )}
                  name="duration"
                />
              </div>
              <Button
                colors={errors.title}
                type={"submit"}
                onClick={handleSubmit(submitData)}
              >
                Add
              </Button>
            </BottomWrapper>
          </WrapperForm>
        </Overlay>
      </AddWrapper>
    </>
  );
};
const AddWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 70px 0;
`;
const Overlay = styled.div`
  background: #00000045;
  backdrop-filter: blur(25px);
  padding: 15px 30px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;
const WrapperForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 1120px;

  div {
    width: 100%;
  }
`;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  select {
    width: 280px;
    height: 48px;
    border-radius: 25px;
    outline: none;
    color: white;
    padding: 0 20px;
    font-size: 20px;
    border: none;
    background: #232323;
    cursor: pointer;
    text-transform: capitalize;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  button {
    color: white;
    outline: none;
    height: 48px;
    font-size: 20px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: 150ms ease-in-out;
    background: springgreen;

    &:active {
      transform: scale(0.9);
    }
  }
`;
const Button = styled.button<IStyle>`
  padding: 5px 70px;
`;
const Input = styled.input<IStyle>`
  width: 100%;
  font-size: 20px;
  height: 34px;
  outline: none;
  padding: 20px;
  border: ${(props) =>
    props.colors ? "1px solid crimson" : "1px solid transparent"};
  background: #232323;
  color: white;
  border-radius: 25px;

  &:focus {
    background: #343333;
  }

  &::placeholder {
    color: white;
  }
`;
const InputNumber = styled(Input)<IStyle>`
  width: unset;
  height: 48px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;
const Link = styled(Input)<IStyle>`
  color: ${(props) => (props.colors ? "white" : "springgreen")};
`;
const TextArea = styled.textarea<IStyle>`
  padding: 10px 20px;
  width: 100%;
  resize: none;
  font-family: "Poppins", sans-serif;
  border-radius: 15px;
  background: #232323;
  color: white;
  border: ${(props) =>
    props.colors ? "1px solid crimson" : "1px solid transparent"};
  outline: none;
  font-size: 20px;

  &:focus {
    background: #343333;
  }

  &::placeholder {
    color: white;
  }
`;
const Text = styled.p<IStyle>`
  color: ${(props) => (props.colors ? "springgreen" : "crimson")};
  margin-top: 20px;
  margin-left: 15px;
  font-size: 29px;
`;
