import { createStyles, Navbar, NavLink, rem, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../modules/settings/services/actions";
import { NavType, sideNavMenu } from "./navigation";

const useStyles = createStyles((theme) => ({
  navbar: {
    // backgroundColor: theme.colors["truboard-accent"][0],
    overflowY: "auto",
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors["truboard-primary"][0],
    // padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.5
      ),
    },
  },

  linkTitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors["truboard-primary"][0],
    fontWeight: "bolder",
  },

  subLinkTitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors["truboard-primary"][0],
    fontWeight: "bolder",
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.15
      ),
    },
  },
}));

// const useStyles = createStyles((theme, _params, getRef) => {
//   return {
//     navbar: {
//       backgroundColor: theme.colors["truboard-accent"][0],
//       overflowY: "auto",
//     },

//     link: {
//       ...theme.fn.focusStyles(),
//       display: "flex",
//       alignItems: "center",
//       textDecoration: "none",
//       fontSize: theme.fontSizes.sm,
//       color: theme.colors["truboard-primary"][0],
//       padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
//       borderRadius: theme.radius.sm,

//       "&:hover": {
//         backgroundColor: theme.fn.lighten(
//           theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//             .background!,
//           0.5
//         ),
//       },
//     },

//     linkTitle: {
//       fontSize: theme.fontSizes.md,
//       color: theme.colors["truboard-primary"][0],
//       fontWeight: "bolder",
//     },

//     subLinkTitle: {
//       fontSize: theme.fontSizes.sm,
//       color: theme.colors["truboard-primary"][0],
//       fontWeight: "bolder",
//     },

//     linkIcon: {
//       color: theme.white,
//       opacity: 0.75,
//       marginRight: theme.spacing.sm,
//     },

//     linkActive: {
//       "&, &:hover": {
//         backgroundColor: theme.fn.lighten(
//           theme.fn.variant({ variant: "filled", color: theme.primaryColor })
//             .background!,
//           0.15
//         ),
//       },
//     },
//   };
// });

export function SideNavigation(props: { [x: string]: any; open?: boolean }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  function getNavItems(subMenus: any) {
    const renderItems: any[] = [];
    for (const subMenu of subMenus) {
      if (subMenu.type === NavType.ITEM) {
        renderItems.push(
          <Link
            key={subMenu.key}
            // component="a"
            to={subMenu.path}
            className={classes.link}
            // icon={subMenu.icon}
            style={{}}
          >
            {subMenu.isSubMenu ? (
              <span className={classes.subLinkTitle}>{subMenu.title}</span>
            ) : (
              subMenu.title
            )}
          </Link>
        );
      } else if (subMenu.type === NavType.SUBMENU) {
        renderItems.push(
          <NavLink
            key={subMenu.key}
            icon={subMenu.icon}
            label={
              <span className={classes.subLinkTitle}>{subMenu.title}</span>
            }
            defaultOpened={subMenu.defaultOpened}
            childrenOffset={24}
            className={classes.link}
          >
            {getNavItems(subMenu.items)}
          </NavLink>
        );
      }
    }
    return renderItems;
  }

  function getNavigation(menus: any) {
    const renderItems: any[] = [];
    for (const menu of menus) {
      if (menu.type === NavType.MENU) {
        renderItems.push(
          <NavLink
            key={menu.key}
            icon={menu.icon}
            label={<span className={classes.linkTitle}>{menu.title}</span>}
            defaultOpened={menu.defaultOpened}
            childrenOffset={24}
            className={classes.link}
          >
            {getNavItems(menu.items)}
          </NavLink>
        );
      }
    }
    return renderItems;
  }

  return (
    <Navbar
      width={{ sm: 240 }}
      hiddenBreakpoint={window.outerWidth + 1}
      p="md"
      hidden={!props.open}
      className={classes.navbar}
    >
      <Navbar.Section grow>{getNavigation(sideNavMenu)}</Navbar.Section>
      <span className={classes.link} onClick={onLogout}>
        <span className={classes.linkTitle}>Logout</span>
      </span>
    </Navbar>
  );
}
