import { AuthContextProvider } from "./store/AuthContext";
import Router from "./routes/router/";

const App = () => (
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
);

export default App;
