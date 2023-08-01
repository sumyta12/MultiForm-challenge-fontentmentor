import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import JobFindingMainPage from "./Component/Job-Finding-Display/JobFindingMainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobFindingMainPage />} />
          <Route path="/about" element={<h1>this is not found path</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
