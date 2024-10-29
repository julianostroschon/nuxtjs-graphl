<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { toValue } from 'vue'
import { useFormField } from '../ui/form/useFormField'
import { useI18n } from 'vue-i18n'

const { name, formMessageId } = useFormField()
const { t } = useI18n()
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    :name="toValue(name)"
    class="font-medium text-[0.8rem] text-destructive"
    v-slot="{ message }"
  >
    {{ t(message) || '' }}
  </ErrorMessage>
</template>
