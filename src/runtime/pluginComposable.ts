import { ApolloClients, provideApolloClients } from "@vue/apollo-composable"

import { defineNuxtPlugin } from "#app"

import { NuxtAppApollo } from "../types"
import { useApollo } from "./composables"
import { createClients } from "./clients"

export default defineNuxtPlugin((nuxtApp) => {
  const clients = createClients(nuxtApp as unknown as NuxtAppApollo)
  provideApolloClients(clients)
  nuxtApp.vueApp.provide(ApolloClients, clients)
  useApollo()
})
