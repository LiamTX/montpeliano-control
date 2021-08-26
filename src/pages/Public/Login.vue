<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" style="width: 400px">
      <div class="col-4 mb-5">
        <q-img src="../../assets/mont-logo.png" :ratio="19 / 9" />
      </div>
      <q-form class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Username"
          color="orange-9"
          dark
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Password"
          color="orange-9"
          dark
        />

        <div>
          <q-checkbox
            dark
            v-model="save_username"
            label="Lembre-se de mim"
            color="orange-8"
          />
        </div>

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

      save_username: ref(false),

      username: ref(""),
      password: ref(""),
    };
  },

  created() {
    const username = localStorage.getItem("username");
    if (username) {
      this.save_username = true;
      this.username = username;
    }
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
        console.log(response);

        localStorage.setItem("tk", JSON.stringify(response.token));

        this.$q.notify({
          message: "Seja bem-vindo(a)",
          color: "green-9",
          position: "top",
        });

        this.$store.commit("user/setApiLoading", false);

        if (this.save_username) {
          localStorage.setItem("username", this.username);
        } else {
          localStorage.removeItem("username");
        }

        this.$router.push("/supplies");
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
