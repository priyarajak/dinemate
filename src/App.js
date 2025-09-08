import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import CustomerPage from './pages/CustomerPage';
import StartPage from './pages/StartPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadOrdersFromStorage } from "./features/dinemateSlice"


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOrdersFromStorage());
  }, [dispatch]);
  return (
    <Router basename="/dinemate">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/admin-login" element={<AdminPage />} />
        <Route path="/customer" element={<CustomerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
