
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherPage from './weather';
function App() {
  
  return (
    <>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<WeatherPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )

}

export default App
