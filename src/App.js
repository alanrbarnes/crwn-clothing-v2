// import './categories.styles.scss'
import { Routes, Route } from 'react-router-dom'; //removed Outlett
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component'; //bring in navigation component
import SignIn from './routes/sign-in/sign-in.component';



const App = () => {
  return (
    <Routes>  
      <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} />  
          {/* <Route path='shop' element={<Shop />} />  */}
          <Route path='sign-in' element={<SignIn />} />   
      </Route>
    </Routes>
    
  );
}

export default App;
