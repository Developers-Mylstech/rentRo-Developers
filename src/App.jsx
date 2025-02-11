import React from "react";
import Header from "./Components/Header.jsx";
import Home from "./Screens/Home.jsx";
 import Services from "./Screens/Services.jsx";
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
        <Home />
      </div>
  );
}

export default App;
