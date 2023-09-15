import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './modules/room/Home';
import View from './modules/room/View';
import Update from './modules/room/Update';
import Create from './modules/room/Create';
import Setting from './modules/room/Setting';
import 'bootstrap/dist/css/bootstrap.min.css'
import Calculate from './modules/calculate/Calculate';
import Payment from './modules/calculate/Payment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path={'/setting'} element={<Setting />}></Route>
        <Route path='/calculate/:id' element={<Calculate />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/update/:id' element={<Update />}></Route>
        <Route path='/view/:id' element={<View />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
