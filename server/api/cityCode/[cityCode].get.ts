export default defineEventHandler(async (event) => {
  const cityCode = event.context.params?.cityCode;
  try {
    const response = await fetch(
      `http://kodpocztowy.intami.pl/api/${cityCode}`
    );

    const result = await response.json();

    const data = result;

    return { data: data };
  } catch (error) {
    // console.log(error);
  }
});
