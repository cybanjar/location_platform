<template>
  <q-page>
    <div class="wrap-header">
      <q-img class="logo-search" src="../assets/Search.svg" />
      <div>
        <div class="text-h5">Brebes Adventure</div>
        <div class="caption">Location Object Platform</div>
      </div>
    </div>
    <div>
      <div class="row justify-around bg-primary wrap-switch__auth">
        <div
          @click="swithLogin"
          :class="
            isLogin === true ? 'text-white text-weight-bold' : 'opacity-30'
          "
          class="text-h5 q-py-md cursor-pointer"
        >
          Login
        </div>
        <div
          @click="swithRegister"
          :class="!isLogin ? 'text-white text-weight-bold' : 'opacity-30'"
          class="text-h5 q-py-md cursor-pointer"
        >
          Register
        </div>
      </div>
      <div class="q-pa-md wrap-form">
        <q-form @submit.prevent="onLogin">
          <q-input
            v-if="!isLogin"
            :class="!isLogin ? 'q-mt-md' : ''"
            placeholder="Name"
            color="primary"
            v-model="form.name"
            required
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="person" />
            </template>
          </q-input>
          <q-input
            type="email"
            placeholder="Email"
            color="primary"
            v-model="form.email"
            required
            class="q-mt-md"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="email" />
            </template>
          </q-input>
          <q-input
            class="q-mt-md"
            placeholder="Password"
            color="primary"
            v-model="form.password"
            autocomplete="on"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
            <template v-slot:append>
              <q-icon
                @click="isPwd = !isPwd"
                :name="isPwd ? 'visibility_off' : 'visibility'"
                color="primary"
              />
            </template>
          </q-input>
          <div class="q-mb-sm">
            <router-link class="forgot-password" to="/"
              >Lupa password?</router-link
            >
          </div>
          <q-btn
            unelevated
            color="primary"
            type="submit"
            class="q-mt-md full-width text-weight-bolder q-pa-sm btn-submit"
            :disable="form.email && form.password == ''"
            >{{ isLogin == true ? "Login" : "Register" }}</q-btn
          >
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import { useStore } from "vuex";
  import { useQuasar, Notify } from "quasar";

  export default defineComponent({
    setup() {
      const store = useStore();
      const $q = useQuasar();

      const state = reactive({
        isLogin: true,
        form: {
          name: "admin",
          email: "admin@gmail.com",
          password: "12345678",
        },
        isPwd: true,
      });

      const swithRegister = () => {
        state.isLogin = false;
      };
      const swithLogin = () => {
        state.isLogin = true;
      };

      const NotifyCreate = (type, mess) =>
        Notify.create({
          type: type,
          message: mess,
        });

      const onLogin = async () => {
        if (!state.isLogin) {
          // register
          $q.loading.show();
          try {
            const response = await store.dispatch("auth/register", state.form);

            const res = response.data.success;
            if (res) {
              NotifyCreate("positive", response.data.message);
              state.isLogin = true;
            }

            $q.loading.hide();
          } catch (error) {
            const res = error.response.data.success;
            if (!res) {
              NotifyCreate("negative", error.response.data.message);
            }

            $q.loading.hide();
          }
        } else {
          // login
          $q.loading.show();

          try {
            const response = await store.dispatch("auth/login", state.form);
            console.log("sukses", response.data);
            const res = response.data;
            if (res.success === false) {
              NotifyCreate("negative", res.message);
              state.form.email = "";
              state.form.password = "";
              state.isPwd = false;

              $q.loading.hide();
            } else if (res.access_token != null) {
              NotifyCreate("positive", "Welcome back," + res.user.name);

              $q.loading.hide();
            }
          } catch (error) {
            // console.log("catch", error.response);
            $q.loading.hide();
          }
        }
      };

      return {
        ...toRefs(state),
        swithRegister,
        swithLogin,
        onLogin,
      };
    },
  });
</script>

<style scoped>
  .logo-search {
    width: 48px;
    height: auto;
    margin-right: 8px;
  }

  .wrap-header {
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }
</style>

<style lang="scss" scoped>
  .opacity-30 {
    opacity: 0.3;
    color: white;
  }

  .btn-submit {
    border-radius: 10px;
  }

  .wrap-form {
    background-color: white;
    margin-top: -20px;
    border-radius: 20px;
  }

  .forgot-password {
    font-weight: 700;
    text-decoration: none;
    color: $primary;
  }

  .wrap-switch__auth {
    border-radius: 20px 20px 0 0;
    padding-bottom: 25px;
  }
</style>