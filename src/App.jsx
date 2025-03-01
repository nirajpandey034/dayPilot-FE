import './App.css';
import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import FormContainer from '../src/components/SignUpLogIn/FormContainer';
import Container from './components/Dashboard/Container';
import ProfileContainer from './components/Profile/ProfileContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormContainer />}></Route>
        <Route path="/dashboard" element={<Container />}></Route>
        <Route path="/profile" element={<ProfileContainer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
