import './App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx'
import AppRoutes from './router/AppRoutes.jsx'




function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}
export default App