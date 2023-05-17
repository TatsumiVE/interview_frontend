import { AuthContextProvider } from "./store/AuthContext";
import Router from "./routes/Router";

const App = () => (
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
);

export default App;
