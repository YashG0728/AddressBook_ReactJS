import './App.css';
import PayrollForm from './Components/Payroll-form/payroll-form';
import {BrowserRouter,Routes,Route}from "react-router-dom";
import  Homepage from "./Components/Homepage/Homepage"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route exact path = "/" element = {<PayrollForm/>} />
          <Route exact path='/submit' element = {<Homepage/>} />
          <Route exact path='/update/:id' element = {<PayrollForm/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;