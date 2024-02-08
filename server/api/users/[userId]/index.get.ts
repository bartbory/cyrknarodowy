import { PrismaClient } from "@prisma/client";
import { reactive } from "vue";
import { UserData } from "~/types/types";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;

  let userData: UserData = reactive({
    id: userId!,
    name: "",
    gender: "",
    education: "",
    birthYear: null,
    postalCode: "",
    voidvodeship: "",
  });
  try {
    const response = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        gender: true,
        education: true,
        postalCode: true,
        voidvodeship: true,
        birthYear: true,
      },
    });

    if (response) {
      userData = response;
      return { userData };
    }
    return null;
  } catch (error: any) {
    //handle error here
    console.log("Error:", error);
    return { error };
  }
});
