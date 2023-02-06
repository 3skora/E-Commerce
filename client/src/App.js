import "./App.css";
import AllProducts from "./components/AllProducts.jsx";
import AppBar from "./components/AppBar.jsx";
import Login from "./pages/Login.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        {/* <AllProducts /> */}

        <Routes>
          <Route path={`/`} element={<AllProducts />} />
          <Route path={`/login`} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
