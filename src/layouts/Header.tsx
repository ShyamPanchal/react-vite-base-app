import {
  Burger,
  createStyles,
  Flex,
  Grid,
  Header,
  Text,
  useMantineTheme,
} from "@mantine/core";
import * as dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Trulogo from "../assets/TruConnect.png";
import { languages } from "../modules/settings/languages";
import { SETT_KEYS } from "../modules/settings/languages/keys";
import { requestUserProfile } from "../modules/settings/services/actions";
import { selectUserProfile } from "../modules/settings/services/selectors";
import { getUserName } from "../utils";
import { DATE_TIME_FORMAT } from "../utils/constants";
import useTranslation from "../utils/hooks/useTranslation";

const useStyles = createStyles((theme) => ({
  logo: {
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.sm,
  },
}));

function HeaderComponent(props: {
  pageTitle?: string;
  toogleSideNav?: () => void;
  opened?: boolean;
  back?: boolean;
  sideButtons?: JSX.Element;
}) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { localize } = useTranslation(languages);

  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    if (userProfile === undefined) {
      dispatch(requestUserProfile());
    }
  }, [userProfile, dispatch]);

  return (
    <Header height={{ sm: 60 }} p={0} withBorder>
      <Grid style={{ padding: theme.spacing.sm }}>
        <Grid.Col span={8}>
          <Flex align="center">
            <Burger
              opened={!!props.opened}
              onClick={props.toogleSideNav}
              size="sm"
              color={theme.colors.gray[6]}
            />
            <img src={Trulogo} alt="" className={classes.logo} />
          </Flex>
        </Grid.Col>
        <Grid.Col span={4} style={{ textAlign: "right" }}>
          <Text mr="sm" fz="sm" fw={"700"}>
            {localize(SETT_KEYS.HELLO) + " "}
            {userProfile && getUserName(userProfile)}
          </Text>
          <Text mr="sm" fz="xs">
            Last Login:{" "}
            {dayjs(userProfile?.last_login).format(DATE_TIME_FORMAT)}
          </Text>
        </Grid.Col>
      </Grid>
    </Header>
  );
}

export default HeaderComponent;
