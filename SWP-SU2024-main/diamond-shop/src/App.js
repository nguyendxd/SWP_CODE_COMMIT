import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar';
import HomePage from './pages/homePage';
import AppRoute from './routes/appRoute';
import { AuthProvider } from './components/authcontext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <AppRoute></AppRoute>
      </AuthProvider>
    </div>
  );
}

export default App;
