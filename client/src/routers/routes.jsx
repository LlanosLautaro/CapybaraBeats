import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { Library } from "../pages/Library";
import {Configuration} from "../pages/Configuration";
import {Profile} from "../pages/Profile";
export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Library" element={< Library/>} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Configuration" element={<Configuration />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    
  );
}
