/* eslint-disable no-undef */
import MainRouter from '../src/components/router/MainRouter';
import './App.css';

console.log(process.env.REACT_APP_BACKEND_URL);

function App() {
  return (
    <div className="App">
      <MainRouter />
    </div>
  );
}

export default App;
