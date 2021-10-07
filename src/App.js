import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Container, Row, Col} from 'react-bootstrap';
import Layout from './components/Layout';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography'
import NewProject from './NewProject';






const theme = createTheme({
  palette: {
    primary: {
      main: '#ab003c',
    },
    secondary: pink
  },
  typography: {
    fontFamily: 'Quicksand'
  }
});





function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route exact path="/NewProject" component={NewProject}/>

            </Switch>
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
