<template>
  <div class="h-screen grid place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
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
            <button type="submit" class="btn btn-block btn-primary">
              Signup
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
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const authError = ref("");
const client = useSupabaseAuthClient();

definePageMeta({
  layout: false,
});

async function handleSignUp() {
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    authError.value = error.message;
  }

  router.push("/");
}
</script>
