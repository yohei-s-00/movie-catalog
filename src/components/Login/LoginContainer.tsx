import { PaperContainer } from "@components/UI/Box/PaperContainer";
import { InputField } from "@components/UI/Form/InputField";
import styled from "@emotion/styled";
import { useIsLogin } from "@hooks/globalstate";
import { useLink } from "@hooks/page";
import { Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "src/firebase/firebase";

type LoginUser = {
  email: string;
  password: string;
};

const initValue: LoginUser = {
  email: "",
  password: "",
};

const FieldBox = styled.div({
  marginTop: 40,
});

export const LoginContainer = () => {
  const navigation = useLink();
  const [isLogin, setIsLogin] = useIsLogin();
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
    // resolver: zodResolver(schema),
    defaultValues: initValue,
  });
  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLogin(true);
        navigation("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <PaperContainer title="ログイン">
      <form
        onSubmit={handleSubmit((data) => {
          try {
            onSubmit(data);
          } catch (e) {
            console.log(e);
          }
        })}
      >
        <FieldBox>
          <InputField name="email" label="メールアドレス" control={control} />
        </FieldBox>
        <FieldBox>
          <InputField name="password" label="パスワード" control={control} />
        </FieldBox>
        <FieldBox>
          <Button type="submit">ログイン</Button>
        </FieldBox>
      </form>
    </PaperContainer>
  );
};
