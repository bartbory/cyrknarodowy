// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
