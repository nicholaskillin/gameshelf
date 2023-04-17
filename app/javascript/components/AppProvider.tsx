import React, { createContext } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

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
  const Component = window.ReactRailsUJS.getConstructor(component)
  const httpLink = createHttpLink({
    uri: '/graphql/',
  })
  const csrfToken = document
    .querySelector('meta[name=csrf-token]')
    .getAttribute('content')

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
