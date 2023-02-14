import { createApolloProvider } from "@vue/apollo-option"

import { NuxtAppApollo } from "../types"
import { createClients } from "./clients"
import { useApollo } from "./composables"

import { defineNuxtPlugin } from "#imports"

export default defineNuxtPlugin((nuxtApp) => {
  const clients = createClients(nuxtApp as unknown as NuxtAppApollo)
  const defaultClient = clients?.default
  const apolloProvider = createApolloProvider({
    clients,
    defaultClient,
  })

  nuxtApp.vueApp.use(apolloProvider)

  return {
    provide: {
      apolloHelpers: useApollo(),
      apollo: { clients, defaultClient },
    },
  }
})
