import './App.css';
import { BrowserRouter as Router, Routes, Route, Data } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client";

import { JobProvider } from './utils/GlobalState';

// Components and Page imports

import CategoryMenu from './components/CategoryMenu/index'
import Dev from './pages/dev';


const httpLink = createUploadLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <JobProvider>
            <CategoryMenu />
              <Routes>
                <Route path="/dev" element={<Dev />}/>
              </Routes>
          </JobProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
