import {
  AppShell,
  Button,
  Card,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "../../../utils/hooks/useTranslation";
import { languages } from "../languages";
import { SETT_KEYS } from "../languages/keys";
import { requestLogin } from "../services/actions";
import { selectLoaders } from "../services/selectors";
import styles from "./index.module.css";

interface LoginForm {
  username: string;
  password: string;
}

function LoginPage() {
  const dispatch = useDispatch();
  const loader = useSelector(selectLoaders);
  const { localize } = useTranslation(languages);

  const form = useForm<LoginForm>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (username) =>
        username.length === 0 ? "Username is required to login" : null,
      password: (password) =>
        password.length === 0 ? "Password is required to login" : null,
    },
  });

  const failureCallback = (error: string) => {
    showNotification({
      title: "Login Failed",
      message: error,
      color: "red",
      autoClose: 5000,
    });
  };

  const onSubmit = (result: LoginForm) => {
    dispatch(requestLogin(result.username, result.password, failureCallback));
  };

  return (
    <AppShell padding={0} bg="truboard-primary.8">
      <div className={styles.root_container}>
        <form onSubmit={form.onSubmit(onSubmit)} className={styles.main}>
          <Card
            shadow={"md"}
            className={styles.container}
            radius={"md"}
            p="lg"
            bg={"#ffffffc9"}
          >
            <LoadingOverlay visible={loader.login} overlayBlur={2} />
            <Title order={2} color="truboard-primary.0">
              {localize(SETT_KEYS.LOGIN)}
            </Title>
            <TextInput
              className={styles.form_item}
              placeholder={localize(SETT_KEYS.USERNAME)}
              label={<Text color="truboard-primary.0">{localize(SETT_KEYS.USERNAME)}</Text>}
              radius={"md"}
              {...form.getInputProps("username")}
            ></TextInput>
            <PasswordInput
              className={styles.form_item}
              placeholder={localize(SETT_KEYS.PASSWORD)}
              label={<Text color="truboard-primary.0">{localize(SETT_KEYS.PASSWORD)}</Text>}
              radius={"md"}
              {...form.getInputProps("password")}
            ></PasswordInput>
            <Button
              radius={"md"}
              type="submit"
              color={"truboard-primary.0"}
              mt="sm"
            >
              {localize(SETT_KEYS.SUBMIT)}
            </Button>
          </Card>
        </form>
      </div>
    </AppShell>
  );
}

export default LoginPage;
