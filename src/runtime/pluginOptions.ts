import { createApolloProvider } from "@vue/apollo-option"

import { defineNuxtPlugin } from "#app"

import { NuxtAppApollo } from "../types"
import { createClients } from "./clients"

export default defineNuxtPlugin((nuxtApp) => {
  const clients = createClients(nuxtApp as unknown as NuxtAppApollo)
  const defaultClient = clients?.default
  const apolloProvider = createApolloProvider({
    clients,
    defaultClient,
  })

  nuxtApp.vueApp.use(apolloProvider)
})
