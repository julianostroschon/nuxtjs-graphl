<script lang="ts">
export default defineComponent({
  props: {
    // componentField: {
    //   type: Object,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    // label: {
    //   type: String,
    //   required: true,
    // },
    placeholder: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup({ title, type, placeholder, description }) {
    return { title, type, placeholder, description }
  },
})
</script>
<template>
  <FormItem>
    <FormLabel>{{ title }}</FormLabel>
    <FormControl>
      <Input v-bind="$props" />
    </FormControl>
    <FormDescription v-if="description">
      {{ description }}
    </FormDescription>
    <FormMessage />
  </FormItem>
</template>
