import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routing'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner'

function App() {
  

  return (
    <>

    <AuthProvider>
      <Toaster richColors position="bottom-right" />
      <RouterProvider router={router}/>
    </AuthProvider>
    </>
  )
}

export default App
