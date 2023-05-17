import { AppShell, Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComponent from './Header';
import { setSideNavOpen } from '../modules/settings/services/actions';
import { selectSideNavOpen } from '../modules/settings/services/selectors';
import { SideNavigation } from './SideNavigation';
import SubHeader from './SubHeader';

function PageContainer(props: { children: any; pageTitle: string; back?: boolean; sideButtons?: JSX.Element }) {
  const dispatch = useDispatch();
  const sideNavOpen = useSelector(selectSideNavOpen);

  const toogleSideNav = (value: boolean) => {
    dispatch(setSideNavOpen(value));
  };

  return (
    <AppShell
      padding={0}
      style={{
        backgroundColor: '#f8f9fa',
      }}
      header={
        <HeaderComponent
          pageTitle={props.pageTitle}
          opened={sideNavOpen}
          toogleSideNav={() => toogleSideNav(!sideNavOpen)}
          back={props.back}
          sideButtons={props.sideButtons}
        />
      }
      fixed
      navbar={<SideNavigation open={sideNavOpen} />}
      navbarOffsetBreakpoint={sideNavOpen ? 'sm' : window.outerWidth + 1}>
      <SubHeader title={props.pageTitle} back={props.back} sideButtons={props.sideButtons} width={sideNavOpen ? 'calc(100% - 240px)' : '100%'} />
      <Flex direction={'column'} p={'sm'} pt={56} gap='sm'>
        {props.children}
      </Flex>
    </AppShell>
  );
}

export default PageContainer;
