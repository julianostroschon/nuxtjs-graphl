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

import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'
import ItemForm from '~/components/ui/input/ItemForm.vue'

const { t } = useI18n()

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(20),
  }),
)

function onSubmit(values: Record<string, string>) {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
    ),
  })
}
</script>

<template>
  <Form
    v-slot="{ handleSubmit }"
    as=""
    keep-values
    :validation-schema="formSchema"
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
          <!-- <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> -->
        </DialogHeader>

        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField v-slot="{ componentField }" name="username">
            <ItemForm
              :title="t('user.form.username')"
              v-bind="componentField"
              type="text"
              placeholder="username"
              description="This is your public display name."
              class="w-50"
            />
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <ItemForm
              :title="t('user.form.password')"
              v-bind="componentField"
              type="password"
              placeholder="password"
              description="This is your public display name."
              class="w-50"
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
