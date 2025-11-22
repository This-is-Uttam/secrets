import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import LogoLayout from "./components/LogoLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <LogoLayout/>
      <Manager/>
      
    </>
  );
}

export default App;
