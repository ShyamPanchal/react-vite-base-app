import { createStyles, Flex, Grid, Space, Title } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles(theme => {
  return {
    container: {
      backgroundColor: theme.colors['truboard-primary'][0],
      padding: theme.spacing.sm,
      color: theme.white,
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      zIndex: 2,
      // width: "100%",
    },
  };
});

function SubHeader(props: { title?: string; back?: boolean; sideButtons?: JSX.Element; width: string | number }) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container} style={{ width: props.width }}>
      <Grid style={{ flex: 1 }}>
        <Grid.Col span={12}>
          <Flex align='center' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Flex>
              {props.back && <IconArrowNarrowLeft size={24} onClick={() => navigate(-1)} />}
              <Space w='sm' />
              <Title order={5} style={{ fontWeight: 'normal' }}>
                {props.title ? props.title : ''}
              </Title>
            </Flex>
            {props.sideButtons}
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default SubHeader;
