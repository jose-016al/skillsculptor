import { useTheme } from './hooks/useTheme'
import { Routing } from './route/Routing'

function App() {

  useTheme();
  
  return (
    <>
      <Routing />
    </>
  )
}

export default App
