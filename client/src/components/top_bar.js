import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PieChartIcon from "@material-ui/icons/PieChart";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import CategoryIcon from "@material-ui/icons/Category";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import * as actions from "../actions/activities";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  },
  input: {
    color: "white"
  }
}));
function MenuAppBar({ auth, children, globalDate, updateGlobalDate }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const currentPath = useLocation().pathname;

  function handleDateChange(date) {
    updateGlobalDate(date);
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function renderLinks() {
    if (auth && currentPath === "/categories") {
      return;
    }
    if (auth)
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={["year", "month"]}
            openTo="month"
            value={globalDate}
            onChange={handleDateChange}
            autoOk
            InputProps={{ className: classes.input }}
          />
        </MuiPickersUtilsProvider>
      );
    return (
      <div>
        <Button color="inherit" component={Link} to="/signup">
          Sign up
        </Button>
        <Button color="inherit" component={Link} to="/signin">
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          {auth && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            Budgy
          </Typography>
          {renderLinks()}
        </Toolbar>
      </AppBar>
      {auth && (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[
              {
                menuItemName: "Activity",
                path: "/activity",
                icon: <AssignmentIcon />
              },
              {
                menuItemName: "Dashboard",
                path: "/dashboard",
                icon: <PieChartIcon />
              },
              {
                menuItemName: "Categories",
                path: "/categories",
                icon: <CategoryIcon />
              },
              {
                menuItemName: "Logout",
                path: "/signout",
                icon: <MeetingRoomIcon />
              }
            ].map((item, index) => (
              <ListItem
                button
                key={item.menuItemName}
                component={Link}
                to={item.path}
                selected={item.path === currentPath}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.menuItemName} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    globalDate: state.activities.globalDate
  };
}
export default connect(mapStateToProps, actions)(MenuAppBar);
