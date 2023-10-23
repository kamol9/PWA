import { InvoicesBody } from ".";
import { currentDate } from "@/functions/date";

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    return {
      status: 405,
      body: {
        message: "Method not allowed",
      },
    };
  }

  // Date
  const body = await readBody<Omit<InvoicesBody, "id" | "date">>(event);

  const date: InvoicesBody = {
    ...body,
    date: currentDate(),
    id: body.company.nip + currentDate(),
  };

  const response: InvoicesBody = await $fetch(
    "http://localhost:8080/invoices/",
    {
      method: "POST",
      body: JSON.stringify(date),
    }
  );

  return response;
});
