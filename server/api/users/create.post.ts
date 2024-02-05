import { PrismaClient } from "@prisma/client";
import { ref } from "vue";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let voidvodeship = ref("");
  try {
    const response = await fetch(
      `http://kodpocztowy.intami.pl/api/${body.userData.postalCode}`
    );
    const result = await response.json();
    voidvodeship.value = result[0].wojewodztwo;
    // return { data: result };
  } catch (error) {
    console.log("Error in voidvodeship fetch", error);
  }

  try {
    console.log(body);
    //@ts-ignore
    const formData = {
      id: body.userData.id,
      name: body.userData.name,
      postalCode: body.userData.postalCode,
      voidvodeship: voidvodeship.value ? voidvodeship.value : null,
      birthYear: +body.userData.birthYear,
      education: body.userData.education,
      gender: body.userData.gender,
    };
    const sentPrompt = body.prompt;

    const result = await prisma.user.upsert({
      where: { id: formData.id },
      update: {
        ...formData,
      },
      create: {
        ...formData,
      },
    });
    console.log(result);
    return { data: sentPrompt };
  } catch (error) {
    console.log("Error in creating new user", error);
  }
});
