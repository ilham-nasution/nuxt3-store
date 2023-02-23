<template>
  <div class="container mx-auto">
    <div class="h-screen grid place-items-center">
      <div class="card bg-base-100 shadow-xl">
        <form @submit.prevent="handleSignUp">
          <div class="card-body">
            <h2 class="card-title justify-center">Create an account</h2>
            <ErrorAlert :error-msg="authError" />
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                v-model="email"
                type="email"
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
                class="input input-bordered w-full max-w-xs"
              />
            </div>
            <div class="card-actions justify-center my-3">
              <button
                type="submit"
                class="btn btn-block btn-primary"
                :class="{ loading: isLoading }"
              >
                {{ isLoading ? "" : "sign up" }}
              </button>
            </div>
            <p class="text-center">
              Already have an account?
              <NuxtLink to="/login" class="link link-primary">Log in</NuxtLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

definePageMeta({
  layout: false,
});

async function handleSignUp() {
  isLoading.value = true;
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    authError.value = error.message;
    isLoading.value = false;
  }
}
</script>
