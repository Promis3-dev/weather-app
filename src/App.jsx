import Forecast from './components/Forecast'
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer} from 'react-toastify';

function App() {
  

  return (
    <div>
      <ToastContainer/>
      <Forecast/>
    </div>
  )
}

export default App
