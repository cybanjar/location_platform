<template>
  <q-page>
    <div>
      <HeaderAuth />

      <div class="row justify-around bg-primary wrap-switch__auth">
        <div class="text-h5 q-py-md cursor-pointer text-white text-weight-bold">
          Reset Password
        </div>
      </div>
      <div class="q-pa-md wrap-form">
        <q-form @submit.prevent="onResetPassword">
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
            required
          >
            <template v-slot:append>
              <q-icon
                @click="isPwd = !isPwd"
                :name="isPwd ? 'visibility_off' : 'visibility'"
                color="primary"
              />
            </template>
          </q-input>
          <q-input
            class="q-mt-md"
            placeholder="Confirmation Password"
            color="primary"
            v-model="form.password_confirmation"
            autocomplete="on"
            :type="isPwd2 ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) =>
                (val =
                  form.password == form.password_confirmation ||
                  'The password confirmation does not match.'),
            ]"
          >
            <template v-slot:append>
              <q-icon
                @click="isPwd2 = !isPwd2"
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                color="primary"
              />
            </template>
          </q-input>
          <q-btn
            unelevated
            color="primary"
            type="submit"
            class="q-mt-md full-width text-weight-bolder q-pa-sm btn-submit"
            :disable="
              form.email && form.password && form.password_confirmation == ''
            "
            >Reset Password</q-btn
          >
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import { useStore } from "vuex";
  import { useQuasar, Notify, BottomSheet } from "quasar";
  import { useRouter, useRoute } from "vue-router";
  import HeaderAuth from "../components/HeaderAuth.vue";

  export default defineComponent({
    components: {
      HeaderAuth,
    },
    setup() {
      const store = useStore();
      const $q = useQuasar();
      const router = useRouter();
      const route = useRoute();

      const state = reactive({
        form: {
          token: router.currentRoute.value.query.token,
          email: "syamsulspeedy@gmail.com",
          password: "123456789",
          password_confirmation: "",
        },
        isPwd: true,
        isPwd2: true,
      });

      const NotifyCreate = (type, mess) =>
        Notify.create({
          type: type,
          message: mess,
        });

      const onResetPassword = async () => {
        $q.loading.show();

        const response = await store.dispatch("auth/resetPassword", state.form);
        const res = response;
        if (res.status == 500) {
          NotifyCreate("negative", res.data.message);
        } else if (res.status == 200) {
          NotifyCreate("positive", res.data.message);
          router.replace({ name: "auth" });
        }

        $q.loading.hide();
      };

      return {
        ...toRefs(state),
        onResetPassword,
      };
    },
  });
</script>

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