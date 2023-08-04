import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import StarRating from "./StarRating";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      className="test"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StarRating maxRating={5} color="blue" size={24} /> */}
  </React.StrictMode>
);
