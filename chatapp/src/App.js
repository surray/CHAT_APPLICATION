import './App.css';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Login from './pages/Login/login';
import Chat from './pages/Chat/chat';

function App() {
  return (

   <>
    <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/chat" component={Chat}/>
    </Router>
  </> 
  )
}

export default App;
