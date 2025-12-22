import { Login } from "./pages/login";
import { HashRouter, Route, Routes } from "react-router-dom";
import { User } from "./pages/user";
import { Repos } from "./pages/repos";
import { LoadingContextProvider } from "./contexts/LoadingContext";

function App() {

  return (
    <LoadingContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users/:userName" element={<User />} />
          <Route path="/repos/:userName/:reposName" element={<Repos />} />
        </Routes>
      </HashRouter>
    </LoadingContextProvider>
  )
}

export default App
