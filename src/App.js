import React from "react";
import "./styles.css";
import Pets from './components/Pets'

export default function App() {
  return (
    <div className="App">
    <Pets numero={4} />
    </div>
  );
}
