
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from './Component/Form.jsx'
import Header from './Component/Header.jsx'
import Searcher from './Component/Searcher.jsx'
import './App.css'

function App() {
  

  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/buscar" element={<Searcher />} />
      </Routes>
    </Router>
    // <>
    //   <div>
    //     <Header />
    //     {/* <Searcher /> */}
    //     <Form />
    //   </div>
    // </>
  )
}

export default App
