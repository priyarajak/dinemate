import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import CustomerPage from './pages/CustomerPage';
import StartPage from './pages/StartPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/admin-login" element={<AdminPage />} />
        <Route path="/customer" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
