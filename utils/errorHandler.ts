import type { Ref } from 'vue'

interface GraphQLError {
  message: string
}

interface GraphQLErrorResponse {
  gqlErrors?: GraphQLError[]
}

export function handleGraphQLError(
  error: unknown,
  errorMessage: Ref<string>,
  t: (key: string) => string,
) {
  if (isGraphQLErrorResponse(error)) {
    if (error.gqlErrors && error.gqlErrors.length > 0) {
      errorMessage.value = error.gqlErrors[0].message || t('common.unknown')
    } else {
      errorMessage.value = t('common.unknown')
    }
  } else {
    errorMessage.value = t('common.unknown')
  }
}

function isGraphQLErrorResponse(error: unknown): error is GraphQLErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'gqlErrors' in error &&
    Array.isArray((error as GraphQLErrorResponse).gqlErrors)
  )
}
