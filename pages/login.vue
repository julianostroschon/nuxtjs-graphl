<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  layout: 'login',
})
const { t } = useI18n()
const errorMessage = ref('')
const router = useRouter()
const isLoading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    username: z.string({ required_error: t('common.required') }),
    password: z.string({ required_error: t('common.required') }),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})
const authStore = useAuthStore()

const onSubmit = handleSubmit(async values => {
  errorMessage.value = ''
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const data = await GqlLogin({ credentials: values })
    const { login } = data
    authStore.setUser({ username: login?.username || '' })
    authStore.setToken(login?.token || '')
  } catch (error) {
    handleGraphQLError(error, errorMessage, t)
  } finally {
    router.push('/')
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <Card className="flex flex-col shadow-lg px-10 border rounded-xl">
      <CardHeader>
        <CardTitle className="font-bold text-2xl tracking-tighter">
          {{ t('auth.header') }}
        </CardTitle>
        <CardDescription>
          {{ t('auth.description') }}
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-8">
        <Alert v-if="errorMessage" variant="destructive">
          <AlertTitle>Erro em sua tentativa de acesso!</AlertTitle>
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>

        <form class="flex flex-col gap-4" @submit="onSubmit">
          <FormField v-slot="{ field }" name="username">
            <FormItem>
              <FormLabel>{{ t('auth.username') }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ field }" name="password">
            <FormItem>
              <FormLabel>{{ t('auth.password') }}</FormLabel>
              <FormControl>
                <Input type="password" v-bind="field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button
            type="submit"
            :loading="isLoading"
            :class="[
              'transition-colors',
              isLoading
                ? 'bg-gray-300 hover:bg-gray-300 text-gray-600'
                : 'bg-primary hover:bg-primary/90',
            ]"
          >
            <Icon
              v-if="isLoading"
              name="lucide:loader-circle"
              class="mr-2 w-6 h-6 text-slate-800 animate-spin"
            />
            <span>{{
              isLoading ? $t('auth.logging_in') : $t('auth.submit')
            }}</span>
          </Button>
        </form>
      </CardContent>
      <CardFooter class="flex flex-col gap-4">
        <div class="pt-2 border-t-2 text-center text-muted-foreground text-sm">
          {{ t('auth.footer') }}
        </div>
        <Separator />
        <!-- <LanguageSwitcher /> -->
      </CardFooter>
    </Card>
  </div>
</template>
