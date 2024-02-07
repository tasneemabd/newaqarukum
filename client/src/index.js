import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { AuthProvider } from "./common/header/AuthProvider"

ReactDOM.render(
  
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
