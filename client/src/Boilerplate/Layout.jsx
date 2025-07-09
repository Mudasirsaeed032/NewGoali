import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow px-4 py-6">{children}</main>

      <Footer />
    </>
  )
}

export default Layout
