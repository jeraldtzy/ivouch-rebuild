import { Link } from "react-router-dom";
import React from 'react'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AccountBalanceTwoTone, AddCircleTwoTone, CodeTwoTone, CreditCardTwoTone, DashboardTwoTone, ExposureTwoTone, HelpTwoTone, InfoTwoTone, ReceiptTwoTone, } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import NewProject from '../NewProject'





const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,    
    },
    drawerPaper: {
      width: drawerWidth,
      background: '#999999',
    },
    active1: {
      background: '#f4f4f4',
      borderRadius: "10px"
    },
    active2: {
      background: '#f4f4f4',
      borderRadius: '10px'
    },
    title: {
      padding: theme.spacing(1),
    },
    listItemText1: {
      fontSize:'20px'
    },
    divider: {
      marginTop: theme.spacing(47),
      marginBottom: theme.spacing(1),
      //background: '#f4f4f4',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: 'white',
    },
    leftAppBar: {
      flexGrow: 1 //takes up maximum space available on the right
    },
    toolbar: theme.mixins.toolbar, //drop the children content from appbar

    menuButton: {
      marginLeft: theme.spacing(2)
    },
    addNewIcon: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(-1),
    }
  }
})

export default function Layout ({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const menuItems1 = [
    { 
      text: 'Dashboard', 
      icon: <DashboardTwoTone color="secondary" />, 
      path: '/' 
    },
    { 
      text: 'Match Results', 
      icon: <CodeTwoTone color="secondary" />, 
      path: '/MatchResults' 
    },
    { 
      text: 'Invoices', 
      icon: <ReceiptTwoTone color="secondary" />, 
      path: '/Invoices' 
    },
    { 
      text: 'Ledger', 
      icon: <ExposureTwoTone color="secondary" />, 
      path: '/Ledger' 
    },
    { 
      text: 'Bank Statements', 
      icon: <AccountBalanceTwoTone color="secondary" />, 
      path: '/BankStatements' 
    },
    
  ];

  const menuItems2 = [
    { 
      text: 'Billing', 
      icon: <CreditCardTwoTone color="secondary" />, 
      path: '/Billing' 
    },
    { 
      text: 'Info', 
      icon: <InfoTwoTone color="secondary" />, 
      path: '/Info' 
    },
    { 
      text: 'Help', 
      icon: <HelpTwoTone color="secondary" />, 
      path: '/Help' 
    },
    
  ];

  return (
    <div className={classes.root}>
      
    {/* app bar */}
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation= {3}
      >
        <Toolbar>
          <Typography className={classes.leftAppBar} color="secondary">
            Lorem, ipsum
            <Button component={Link}to="/NewProject"  variant="contained" className={classes.menuButton} color="secondary" >
              <AddCircleTwoTone className={classes.addNewIcon}/> Add new 
            </Button>
          </Typography>
          
          <Button className={classes.rightAppBar} variant="outlined" color="secondary">
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h3" className={classes.title} color="secondary" align="center" >
            iVouch
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems1.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active1 : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} classes={{primary:classes.listItemText1}}/>
            </ListItem>
          ))}
        </List>

        <Divider className={classes.divider}/>

        <List>
          {menuItems2.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active2 : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} classes={{primary:classes.listItemText2}}/>
            </ListItem>
          ))}
        </List>
        
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}













 
