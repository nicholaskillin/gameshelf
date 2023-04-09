import React, { createContext } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

export const ProviderProps = createContext({})

type AppProviderProps = {
  component: string
  providerProps: {}
}

const AppProvider = ({ component, providerProps, ...props }) => {
  const Component = window.ReactRailsUJS.getConstructor(component)

  return (
    <ProviderProps.Provider value={providerProps}>
      <Component {...props} />
    </ProviderProps.Provider>
  )
}

export default AppProvider
