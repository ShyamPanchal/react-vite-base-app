import { createStyles } from "@mantine/core";
import { useDispatch } from "react-redux";
import { TBButton } from "truboard-components";
import PageContainer from "../../../layouts/PageContainer";
import { logout } from "../../settings/services/actions";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.sm,
    alignItems: "center",
  },
}));

function DashboardPage(props: {}) {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <PageContainer pageTitle={"Summary"}>
      <div className={classes.container}>
        Dashboard Page
        <TBButton onClick={onLogout}>Logout</TBButton>
      </div>
    </PageContainer>
  );
}

export default DashboardPage;
