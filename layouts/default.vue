<template>
  <div>
    <Nuxt />
  </div>
</template>
<script lang="ts">
import { PortalTarget } from 'portal-vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    PortalTarget,
  },
})
export default class LayoutDefault extends Vue {}
</script>
