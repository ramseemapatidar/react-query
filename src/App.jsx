import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { ChakraProvider } from '@chakra-ui/react'
import { Routes,Route,Link } from 'react-router-dom';
import { Home } from './components/Home'
import { Post } from './components/Post';

const queryClient = new QueryClient()

export default function App() {
  return (
    <ChakraProvider>
          <QueryClientProvider client={queryClient}>
          <nav>
          <ul>
            <li>
              <Link to="/1">Home</Link>
            </li>
            <li>
              <Link to="/post/92666">Post</Link>
            </li>
            
          </ul>
        </nav>
        <Routes>
        <Route path="/:id"  element={ <Home /> } />
            <Route path="/post/:id" element={ <Post/>} />
            <Route path="*" element={<div>Page not found</div>} />

        </Routes>

          
          </QueryClientProvider>
    </ChakraProvider>

  )
}


