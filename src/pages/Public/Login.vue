<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" style="width: 400px">
      <div class="col-4 mb-5">
        <q-img src="https://placeimg.com/500/300/nature" :ratio="16 / 9" />
      </div>
      <q-form class="q-gutter-md">
        <q-input filled v-model="username" label="Username" color="black" />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          color="black"
        />

        <div>
          <q-btn
            :loading="apiLoading()"
            @click="auth()"
            style="width: 100%"
            label="Entrar"
            color="orange-8"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    return {
      ...mapGetters({
        apiLoading: "user/getApiLoading",
      }),

      username: ref(""),
      password: ref(""),
    };
  },

  methods: {
    async auth() {
      if (!this.username || !this.password) {
        this.$q.notify({
          message: "Preencha todos os campos",
          color: "negative",
          position: "top",
        });
        return;
      }

      const user = {
        username: this.username,
        password: this.password,
      };

      try {
        this.$store.commit("user/setApiLoading", true);

        const response = await this.$store.dispatch("user/auth", user);
        if (response.token) {
          localStorage.setItem("tk", JSON.stringify(response.token));
        }

        this.$q.notify({
          message: "Seja bem-vindo(a)",
          color: "positive",
          position: "top",
        });

        this.$store.commit("user/setApiLoading", false);
        this.$router.push("/home");
      } catch (error) {
        this.$store.commit("user/setApiLoading", false);

        const { message } = error;
        const status = message.split(" ")[message.split(" ").length - 1];

        const unauthorizedStatus = ["401", "404"];
        if (unauthorizedStatus.includes(status)) {
          this.$q.notify({
            message: "Não autorizado!",
            color: "negative",
            position: "top",
          });

          this.username = "";
          this.password = "";

          return;
        }

        this.$q.notify({
          message: "Erro interno, tente novamente mais tarde.",
          color: "negative",
          position: "top",
        });

        this.username = "";
        this.password = "";
      }
    },
  },
});
</script>
