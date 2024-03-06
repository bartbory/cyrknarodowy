// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userStore = useUserStore();
  if (user) userStore.login(user.id);
  // redirect the user to the login page
  if (!user) {
    return navigateTo({
      path: "/account/register",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
