<script setup lang="ts">
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { FieldContext } from 'vee-validate'
import { ref } from 'vue'

interface Props {
  label: string
  name: string
  type?: string
  placeholder?: string
  componentField: FieldContext
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
})

const focused = ref(false)
const inputValue = ref('')

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = inputValue.value !== ''
}
</script>

<template>
  <FormItem>
    <div class="relative">
      <FormControl>
        <Input
          :type="props.type"
          :placeholder="props.placeholder"
          v-model="inputValue"
          v-bind="componentField"
          @focus="handleFocus"
          @blur="handleBlur"
          class="border-gray-300 px-3 pt-5 h-12 peer"
        />
      </FormControl>
      <FormLabel
        :for="props.name"
        class="top-1/2 left-3 absolute bg-white px-2 text-muted-foreground transform origin-left transition-all -translate-y-1/2 duration-200 pointer-events-none"
      >
        {{ props.label }}
      </FormLabel>
    </div>
    <FormMessage />
  </FormItem>
</template>

<style scoped>
.peer:focus ~ label,
.peer:not(:placeholder-shown) ~ label {
  @apply text-xs text-muted-foreground -translate-y-[1.95rem];
}

.peer:focus,
.peer:not(:placeholder-shown) {
  @apply pt-4;
}
</style>
