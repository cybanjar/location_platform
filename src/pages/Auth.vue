<template>
  <q-page>
    <div>
      <div class="wrap-header">
        <q-img class="logo-search" src="../assets/Search.svg" />
        <div class="wrap-text">
          <div class="text-h5">Brebes Adventure</div>
          <div class="caption">Location Object Platform</div>
        </div>
      </div>

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
            <q-btn
              flat
              dense
              color="primary"
              type="button"
              class="text-capitalize"
              label="Forgot Password?"
              @click="seamless = true"
            />
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

    <!-- Dialog Forgot Password -->
    <q-dialog v-model="seamless" persistent position="bottom">
      <q-card style="width: 350px">
        <q-linear-progress :value="1" color="pink" />

        <q-card-section>
          <div class="text-h6 text-weight-bold text-primary">
            Forgot password!
          </div>
          <div class="text-grey-7">Please input email for forgot password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            type="email"
            placeholder="Email"
            color="primary"
            v-model="form.email"
            required
            class="q-mt-md"
            autofocus
            @keyup.enter="onForgotPassword"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="email" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            class="text-capitalize"
            @click="onCancelForgot"
          />
          <q-btn
            unelevated
            label="Forgot Password"
            color="primary"
            class="text-capitalize text-weight-bold"
            @click="onForgotPassword"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import { useStore } from "vuex";
  import { useQuasar, Notify, BottomSheet } from "quasar";
  import { useRouter, useRoute } from "vue-router";

  export default defineComponent({
    setup() {
      const store = useStore();
      const $q = useQuasar();
      const router = useRouter();
      const route = useRoute();

      const state = reactive({
        isLogin: true,
        form: {
          name: "admin",
          email: "syamsulspeedy@gmail.com",
          password: "12345678",
        },
        isPwd: true,
        seamless: false,
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
            const res = response.data;
            console.log("res", res);
            if (res.success === false) {
              NotifyCreate("negative", res.message);
              state.form.email = "";
              state.form.password = "";
              state.isPwd = false;

              $q.loading.hide();
            } else if (res.user.created_at == null) {
              NotifyCreate("negative", "Please verify email!");

              $q.loading.hide();
            } else if (res.access_token != null) {
              NotifyCreate("positive", "Welcome back, " + res.user.name);
              router.replace({ name: "home" });

              $q.loading.hide();
            }
          } catch (error) {
            // console.log("catch", error.response);
            $q.loading.hide();
          }
        }
      };

      const onForgotPassword = async () => {
        $q.loading.show();

        try {
          const res = await store.dispatch("auth/forgotPassword", state.form);
          const responseForgot = res;
          if (responseForgot.status === 200) {
            NotifyCreate("positive", responseForgot.data.status);
          }

          $q.loading.hide();
          state.seamless = false;
        } catch (error) {
          console.log("catch: ", error.response);
          const resCatch = error.response;
          if (resCatch.status === 422) {
            NotifyCreate("negative", resCatch.data.errors.email[0]);
          }

          $q.loading.hide();
          state.seamless = false;
        }

        $q.loading.hide();
      };

      const onCancelForgot = () => {
        state.form.name = "";
        state.form.email = "";
        state.form.password = "";

        state.seamless = false;
      };

      return {
        ...toRefs(state),
        swithRegister,
        swithLogin,
        onLogin,
        onForgotPassword,
        onCancelForgot,
      };
    },
  });
</script>

<style lang="scss" scoped>
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