<template>
  <v-container class="container flex-center login-form">
    <v-card>
      <template #title>
        <div class="header flex-center">
          <a href="/">
            <img
              :src="APP_LOGO_URL"
              alt="logo"
            >
          </a>
          <span class="title">{{ APP_TITLE }}</span>
        </div>

        <v-alert
          v-if="errorMessage"
          type="error"
        >
          {{ errorMessage }}
        </v-alert>
      </template>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="loginForm.email"
            label="Email Address"
            name="email"
          />
          <v-text-field
            v-model="loginForm.password"
            label="Password"
            type="password"
            name="Password"
          />

          <v-btn
            :loading="loading"
            type="submit"
            color="primary"
            block
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useCurrentUserStore } from "@/stores/current-user";
import request from "@/utils/request";

interface LoginForm {
  email: string;
  password: string;
}

const currentUser = useCurrentUserStore();
const loginForm = ref<LoginForm>({ email: "", password: "" });
const errorMessage = ref<string | null>(null);
const loading = ref(false);

const router = useRouter();
const route = useRoute();

const APP_LOGO_URL = import.meta.env.VITE_APP_LOGO_URL;
const APP_TITLE = import.meta.env.VITE_APP_TITLE;

const handleSubmit = async () => {
  loading.value = true;
  try {
    const res = await request.post("/auth/login", {
      ...loginForm.value,
    });

    if (res.refreshToken) {
      currentUser.setRefreshToken(res.refreshToken);
    }

    if (res.accessToken) {
      currentUser.setAccessToken(res.accessToken);
    }

    if (route.query.redirect && typeof route.query.redirect === "string") {
      router.push(route.query.redirect);
    } else {
      router.push("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorMessage.value = error.message

      if(error?.response?.data.message){
        errorMessage.value = error?.response?.data.message
      }
    } else {
      errorMessage.value = (error as string)
    }
  }

  loading.value = false;
};

onMounted(() => {
  // Reset form
  loginForm.value.email = "";
  loginForm.value.password = "";
});
</script>

<style scoped lang="scss">
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  height: 100vh;
  width: 100%;
  max-width: 380px;
  width: 100%;
  margin: 0 auto;
  .v-card {
    width: 100%;
  }
}
.header {
  text-align: center;
  a {
    text-decoration: none;
  }
  img {
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
    border-style: none;
  }
  .title {
    font-size: 33px;
    color: rgba(178, 143, 143, 0.85);
    font-weight: 600;
  }

  @media (prefers-color-scheme: dark) {
    .title {
      color: #fff;
    }
  }

  @media (prefers-color-scheme: light) {
    .title {
      color: #000;
    }
  }
}
</style>
