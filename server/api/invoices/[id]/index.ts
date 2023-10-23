import { InvoicesBody } from "..";

export default defineEventHandler(async (event) => {
  if (event.method !== "GET") {
    return {
      status: 405,
      body: {
        message: "Method not allowed",
      },
    };
  }

  const params = event.context.params;

  const id = params?.id;

  if (!id) {
    return {
      status: 400,
      body: {
        message: "Missing id",
      },
    };
  }

  // Process
  const response: InvoicesBody = await $fetch(
    `http://localhost:8080/invoices/${id}`
  );

  return response;
});
