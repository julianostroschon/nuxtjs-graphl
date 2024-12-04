import { useGqlHeaders } from '#imports'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const host = window.location.host
    const subdomain = isProduction ? host.split('.')[0] : 'localhost'
    console.log({ subdomain })

    useGqlHeaders({ 'x-datasource': subdomain })
  }
})
