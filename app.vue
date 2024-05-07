<script setup>
const supabase = useSupabaseClient();
const userStore = useUserStore();
const {
  data: { user },
} = await supabase.auth.getUser();
if (user) {
  userStore.isLogged = true;
  userStore.userId = user.id;
}
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
