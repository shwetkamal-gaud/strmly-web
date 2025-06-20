

import './App.css'

import Feed from './components/Feed';
import Login from './components/Login';
import {  useGlobal } from './context/GlobalContex'

function App() {
  const { userId } = useGlobal();

  return (
    <>
      {userId ? <>
        <Feed />
      </> : <Login />}
    </>
  )
}

export default App
