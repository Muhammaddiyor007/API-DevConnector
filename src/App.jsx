import { useContext } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostData />} />
          <Route path="/profile/:id" element={<Profil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
