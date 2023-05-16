import "./App.css";
import { AuthContextProvider } from "./store/AuthContext";
import Router from "./routes/Router";
function App() {
  <AuthContextProvider>
    <Router />;
  </AuthContextProvider>;
}

export default App;
