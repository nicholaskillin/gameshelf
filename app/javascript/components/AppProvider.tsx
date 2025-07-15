import * as React from 'react'
import { createContext } from 'react'
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

// Import components
import Index from './Views/Games/Index.tsx'
import NewGameModal from './shared/NewGameModal.tsx'
import ProfileHeader from './shared/ProfileHeader.tsx'
import GameDetailsModal from './Games/GameDetailsModal.jsx'
import DeleteUserButton from './delete_user_button.jsx'

// Component registry
const components = {
  'Views/Games/Index': Index,
  'shared/ProfileHeader': ProfileHeader,
  'shared/NewGameModal': NewGameModal,
  'Games/GameDetailsModal': GameDetailsModal,
  'delete_user_button': DeleteUserButton,
}

export const ProviderProps = createContext({})

type AppProviderProps = {
  component: string
  providerProps: {
    domain: string
  }
}

const AppProvider = ({
  component,
  providerProps,
  ...props
}: AppProviderProps) => {
  const Component = components[component]
  
  if (!Component) {
    console.error(`Component "${component}" not found in AppProvider`)
    return <div>Component not found: {component}</div>
  }

  const httpLink = createHttpLink({
    uri: '/graphql/',
  })
  const csrfToken = document
    .querySelector('meta[name=csrf-token]')
    ?.getAttribute('content')

  const client = new ApolloClient({
    link: new HttpLink({
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    }),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider {...{ client }}>
      <ProviderProps.Provider value={providerProps}>
        <Component {...props} />
      </ProviderProps.Provider>
    </ApolloProvider>
  )
}

export default AppProvider
