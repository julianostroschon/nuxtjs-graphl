<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormField } from '@/components/ui/form'

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import ItemForm from '~/components/ui/input/ItemForm.vue'

const { t } = useI18n()
const fieldSchema = toTypedSchema(
  // z.string().nonempty('Field is required').email('Must be a valid email'),
  z.object({
    username: z.string().min(5).max(50),
    password: z.string().min(8, t('user.form.passwordMinimum')),
    // confirmPassword: z.string().min(8, t('user.form.passwordMinimum')),
  }),
)
// computed(() => {
//   // console.log(fieldSchema)
//   const { value, errorMessage } = useField('confirmPassword', fieldSchema)
//   console.log(value, errorMessage)
// })

const { handleSubmit, errors } = useForm({
  fieldSchema,
})
function onSubmit(values: Record<string, string>) {
  console.log({ values, errors })
  // toast({
  //   title: 'You submitted the following values:',
  //   description: h(
  //     'pre',
  //     { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
  //     h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
  //   ),
  // })
}

function confirmPassword(value: string) {
  console.log({ values, fieldSchema })
  return value === fieldSchema.password
}

// handleSubmit(onSubmit)
</script>

<template>
  <Form
    v-slot="{ handleSubmit }"
    as="form"
    keep-values
    :validation-schema="fieldSchema"
  >
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          <Icon name="lucide:plus" class="w-4 h-4 text-green-500" />
          <span class="ml-2">{{ t('user.add') }}</span>
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ t('user.add') }}</DialogTitle>
          <DialogDescription>
            {{ t('user.form.description') }}
          </DialogDescription>
        </DialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="username">
            <ItemForm
              :title="t('user.form.username')"
              v-bind="componentField"
              type="text"
              :placeholder="t('user.form.username')"
            />
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <ItemForm
              :title="t('user.form.password')"
              v-bind="componentField"
              type="password"
              :placeholder="t('user.form.password')"
            />
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <ItemForm
              :title="t('user.form.confirmPassword')"
              v-bind="componentField"
              type="password"
              :placeholder="t('user.form.confirmPassword')"
              :rules="confirmPassword"
            />
          </FormField>
        </form>

        <DialogFooter>
          <Button type="submit" form="dialogForm">
            {{ t('common.submit') }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
