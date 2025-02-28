import './App.css';
import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import FormContainer from '../src/components/SignUpLogIn/FormContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormContainer />}></Route>
        <Route path="/dashboard"></Route>
        <Route path="/profile"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
