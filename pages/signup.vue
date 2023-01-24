<template>
  <div class="h-screen grid place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <form @submit.prevent="handleSignUp">
        <div class="card-body">
          <h2 class="card-title justify-center">Signup</h2>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="email" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="password" type="password" class="input input-bordered w-full max-w-xs" />
          </div>
          <div class="card-actions justify-center">
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref("")
const password = ref("")
const client = useSupabaseAuthClient()

async function handleSignUp() {
  const { data, error } = await client.auth.signUp({
  email: email.value,
  password: password.value,
  })
  
  if (error) {
    return alert('Something went wrong !')
  }

  console.log(data)
  router.push('/')
}

</script>