import { BrowserRouter ,Route,Routes} from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AuthProvider from "./AuthProvider"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/DashBoard"
import ResumeBuilder from "./components/ResumeBuilder"
export default function App() {
  return (
<AuthProvider>
  <Router />
</AuthProvider>
  )
}



function Router() {
  return (
    <BrowserRouter>
      <Routes >
      <Route path="/" element={<LandingPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<LandingPage/>} />
      <Route path="/resume" element={<ResumeBuilder/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>  
    </BrowserRouter>
  )
}