<template>
  <h1>Welcome {{ user.email }}</h1>
  <button @click="handleLogout" class="btn">logout</button>
</template>

<script setup>
const client = useSupabaseAuthClient()
const user = useSupabaseUser()
const router = useRouter()

definePageMeta({
  middleware: 'auth'
})

async function handleLogout() {
  const { error } = await client.auth.signOut()
  console.log(error);

  router.push('/login')
}
</script>