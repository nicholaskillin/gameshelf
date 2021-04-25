import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const useGraphql = () => {
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

  return { client }
}

export default useGraphql
