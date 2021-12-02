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
            :type="form.isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
            <template v-slot:append>
              <q-icon
                @click="form.isPwd = !form.isPwd"
                :name="form.isPwd ? 'visibility_off' : 'visibility'"
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
            >{{ isLogin == true ? "Login" : "Register" }}</q-btn
          >
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, reactive, toRefs, computed } from "vue";
  import { Notify } from "quasar";
  import { useStore } from "vuex";

  export default defineComponent({
    setup() {
      const store = useStore();

      const state = reactive({
        isLogin: true,
        form: {
          name: "",
          email: "",
          password: "",
          isPwd: true,
        },
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

      const onLogin = () => {
        // NotifyCreate("positive", "Ok");
        if (!state.isLogin) {
          console.log("register!");
        } else {
          console.log("login");
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
    padding: 32px 0;
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