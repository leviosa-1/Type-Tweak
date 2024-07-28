import './App.css';
import React,{useState} from 'react';
import Navbar from './components/Navbar';
import TextArea from './components/TextArea';
import Alert from './components/Alert'
import About from './components/About'
import PlagiarismCheck from './components/PlagiarismCheck'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [mode,setMode] = useState('light');
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type) =>{
    setAlert({
      msg : message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  const toggleMode = () => {
    if(mode ==='light'){
      setMode('dark');
      document.body.style.backgroundColor="gray";
      showAlert("Dark mode has been enabled","success");
    }
    else{
      setMode('light');
      document.body.style.backgroundColor="white";
      showAlert("Light mode has been enabled","success");
    }
  }
  return (
<>
<Router>
 <Navbar title="TypeTweak" About="About" mode={mode}  toggleMode={toggleMode}/>
 <Alert alert={alert}/>
  <div className="container">
      <Routes>
        <Route exact path ="/" element ={<TextArea showAlert={showAlert} heading="Enter the text to analyze below" mode={mode} />} />
        <Route exact path="/about" element={<About/>}/>
        <Route exact path='/checkPlagiarism' element={<PlagiarismCheck heading="Enter the text to check Plagiarism Content" showAlert={showAlert} mode={mode} />}/>
      </Routes>
  </div>
</Router>
</>
  );
}

export default App;
