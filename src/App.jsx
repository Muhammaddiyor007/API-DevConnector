import { useContext } from 'react'
import { Route, HashRouter as Router, Routes, Navigate } from 'react-router-dom'
import { AppContext } from './context/ContexApi'
import Home from './pages/Home'
import Dashboard from './pages/dashboard'
import Developers from './pages/developers'
import Login from './pages/login'
import PostData from './pages/post'
import Post from './pages/posts'
import Profil from './pages/profil'
import Registration from './pages/register'
import Header from './components/Header'
import NotFound from './pages/not-found'
import EditProfile from './pages/EditProfile'
import AddExperience from './pages/AddExperience'
import AddEducation from './pages/AddEducation'

const PrivateRoute = ({ element }) => {
  const { isToken } = useContext(AppContext)
  return isToken ? element : <Navigate to="/login" replace />
}

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="pt-16">{children}</main>
  </>
);

function App() {
  const { isToken } = useContext(AppContext)

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={isToken ? <Developers /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-experience" element={<AddExperience />} />
          <Route path="/add-education" element={<AddEducation />} />
          
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/post" element={<PrivateRoute element={<Post />} />} />
          <Route path="/post/:id" element={<PrivateRoute element={<PostData />} />} />
          <Route path="/profile/:id" element={<Profil />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
