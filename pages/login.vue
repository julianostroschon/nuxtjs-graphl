<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  layout: 'login',
})
const { t } = useI18n()

const formSchema = toTypedSchema(
  z.object({
    username: z.string({ required_error: t('common.required') }),
    password: z.string({ required_error: t('common.required') }),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async values => {
  const data = await GqlLogin({
    credentials: {
      password: values.password,
      username: values.username,
    },
  })
  console.log('Form submitted!', data)
})

// const isLoading = ref(false)
// const errorMessage = ref('')
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
          <Button type="submit"> {{ t('button.access') }} </Button>
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
