import { useGqlHeaders } from '#imports'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const host = window.location.host
    const subdomain = isProduction ? host.split('.')[0] : 'localhost'

    useGqlHeaders({ 'x-datasource': subdomain })
  }
})
