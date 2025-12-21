import { Login } from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { User } from "./pages/user";
import { Repos } from "./pages/repos";
import { LoadingContextProvider } from "./contexts/LoadingContext";

function App() {

  return (
    <LoadingContextProvider>
      <BrowserRouter basename="/github_users">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users/:userName" element={<User />} />
          <Route path="/repos/:userName/:reposName" element={<Repos />} />
        </Routes>
      </BrowserRouter>
    </LoadingContextProvider>
  )
}

export default App
