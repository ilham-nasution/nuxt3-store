<template>
  <div class="h-screen grid place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <form @submit.prevent="handleSignIn">
        <div class="card-body">
          <h2 class="card-title justify-center">Login</h2>
          <ErrorAlert :error-msg="authError" />
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </div>
          <div class="card-actions justify-center my-3">
            <button
              type="submit"
              class="btn btn-block btn-primary"
              :class="{ loading: isLoading }"
            >
              {{ isLoading ? "" : "sign in" }}
            </button>
          </div>
          <p class="text-center">
            Don't have an account?
            <NuxtLink to="/signup" class="link link-primary">Sign up</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: false,
});

const client = useSupabaseAuthClient();
const user = useSupabaseUser();

const email = ref<string>("");
const password = ref<string>("");
const authError = ref<string>("");
const isLoading = ref<boolean>(false);

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/");
  }
});

async function handleSignIn() {
  isLoading.value = true;
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    isLoading.value = false;
    authError.value = "invalid email or password";
  }
}
</script>
