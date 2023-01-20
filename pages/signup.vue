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
import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

const config = useRuntimeConfig()
const supabaseUrl = 'https://hipydpadmuujyavkgdtr.supabase.co'
const supabaseKey = config.supabaseKey
const supabase = createClient(supabaseUrl, supabaseKey)

const email = ref("")
const password = ref("")

async function handleSignUp() {
  const { data, error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value,
  })
  console.log("email", email.value)
  console.log("response data", data)
}

</script>