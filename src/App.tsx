import { Login } from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { User } from "./pages/user";
import { Repos } from "./pages/repos";
import { LoadingContextProvider } from "./contexts/LoadingContext";

function App() {

  return (
    <LoadingContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/github_users" element={<Login />} />
          <Route path="/github_users/users/:userName" element={<User />} />
          <Route path="/github_users/repos/:userName/:reposName" element={<Repos />} />
        </Routes>
      </BrowserRouter>
    </LoadingContextProvider>
  )
}

export default App
