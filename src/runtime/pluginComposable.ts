import { ApolloClients, provideApolloClients } from "@vue/apollo-composable"

import { NuxtAppApollo } from "../types"
import { useApollo } from "./composables"
import { createClients } from "./clients"

import { defineNuxtPlugin } from "#imports"

export default defineNuxtPlugin((nuxtApp) => {
  const clients = createClients(nuxtApp as unknown as NuxtAppApollo)
  provideApolloClients(clients)
  nuxtApp.vueApp.provide(ApolloClients, clients)

  const defaultClient = clients?.default

  return {
    provide: {
      apolloHelpers: useApollo(),
      apollo: { clients, defaultClient },
    },
  }
})
