import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Form from "./components/Form";
import Detail from "./components/Details";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Form />} />
          <Route path="/home/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
