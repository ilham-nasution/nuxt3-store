<template>
  <div class="h-screen grid place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <form @submit.prevent="handleSignIn">
        <div class="card-body">
          <h2 class="card-title justify-center">Login</h2>
          <div v-show="authError" class="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ authError }}</span>
            </div>
          </div>
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
            <button type="submit" class="btn btn-block btn-primary">
              Sign in
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

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const authError = ref("");
const client = useSupabaseAuthClient();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo("/");
  }
});

async function handleSignIn() {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    authError.value = "invalid email or password";
  }
}
</script>
