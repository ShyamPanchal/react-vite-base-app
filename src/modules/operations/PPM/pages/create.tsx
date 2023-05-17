import { createStyles } from "@mantine/core";
import PageContainer from "../../../../layouts/PageContainer";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.sm,
    alignItems: "center",
  },
}));

function CreatePPMPage(props: {}) {
  const { classes } = useStyles();
  return (
    <PageContainer pageTitle={"Create PPM"}>
      <div className={classes.container}>Create PPM Page</div>
    </PageContainer>
  );
}

export default CreatePPMPage;
