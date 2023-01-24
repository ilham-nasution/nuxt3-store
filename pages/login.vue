<template>
  <div class="h-screen grid place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <form @submit.prevent="handleSignIn">
        <div class="card-body">
          <h2 class="card-title justify-center">Login</h2>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="email" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="password" type="password" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="card-actions justify-center">
            <button type="submit" class="btn btn-primary">Sign in</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref("")
const password = ref("")
const client = useSupabaseAuthClient()
const router = useRouter()

async function handleSignIn() {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  router.push('/')

  if (error) {
    return alert('Something went wrong !')
  }
} 
</script>