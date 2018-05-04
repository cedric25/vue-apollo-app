import Vue from 'vue'
import VueApollo from 'vue-apollo'
import createApolloClient from './apollo'

// Install the vue plugin
Vue.use(VueApollo)

// Config
const options = {
  ssr: false,
  base: 'http://localhost:4000',
  endpoints: {
    graphql: '/graphql',
  },
  persisting: true,
  subscriptions: false
}

// Create apollo client
export const apolloClient = createApolloClient(options)

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
