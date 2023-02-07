<template>
  <h1>Welcome {{ user.email }}</h1>
  <button @click="handleLogout" class="btn">logout</button>
</template>

<script setup>
const client = useSupabaseAuthClient();
const user = useSupabaseUser();

definePageMeta({
  middleware: "auth",
});

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

async function handleLogout() {
  const { error } = await client.auth.signOut();
  console.log(error);
}
</script>
