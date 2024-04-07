import React from "react";
import Navbar from "../widgets/navbar/Navbar";
import MainRoutes from "./routes/MainRoutes";
import Footer from "../widgets/footer/Footer";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <MainRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
