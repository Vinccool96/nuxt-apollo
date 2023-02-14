import { defineNuxtPlugin } from "#app"

import { NuxtAppApollo } from "../types"
import { createClients } from "./clients"
import { useApollo } from "./composables"

export default defineNuxtPlugin((nuxtApp) => {
  const clients = createClients(nuxtApp as unknown as NuxtAppApollo)
  const defaultClient = clients?.default

  return {
    provide: {
      apolloHelpers: useApollo(),
      apollo: { clients, defaultClient },
    },
  }
})
