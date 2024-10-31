import { useGqlHeaders } from '#imports'

const isProduction = process.env.NODE_ENV === 'production'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const host = window.location.host
    const subdomain = isProduction ? host.split('.')[0] : 'localhost'
    console.log('subdomain', subdomain)

    useGqlHeaders({ 'x-datasource': subdomain })
  }
})
