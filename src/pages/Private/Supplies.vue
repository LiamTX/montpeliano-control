<template>
  <q-page class="row items-center justify-evenly">
    <!-- <div v-if="loading">
      <lottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_UGvCSC/loading_animation.json"
        background="transparent"
        speed="1"
        style="width: 400px; height: 400px"
        loop
        autoplay
      ></lottie-player>
    </div> -->
    <div>
      
    </div>
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Supplies",
  setup() {
    return {
      loading: ref(true)
    }
  },
});
</script>
