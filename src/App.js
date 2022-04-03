import './App.css';
import {Title} from './Components/Title';
import {Display} from  './Components/Display';
import {Buttons} from  './Components/Buttons';
import {useState} from 'react';


const App = () => {
  const [value,setValue] = useState(0);
  
  const displayFunc = (textToDisplay) => {
    setValue(textToDisplay);
  }
  
  
  return (
    <div>
        <div className="wrapper">
          <Title />
          <div className="mainParent">
              <Display value={value}/>
              <Buttons displayFunc={displayFunc}/>            
          </div>   
         </div>   
    
    </div>

  );
}

export default App;
