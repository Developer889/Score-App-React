import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Score from './components/Score';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="score" element={<Score />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
