export interface InvoicesBody {
  id: string;
  date: number;
  payment_date: number;
  company: {
    name: string;
    address: string;
    nip: string;
  };
  customer: {
    name: string;
    address: string;
    nip: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    vat: number;
  }[];
}

export default defineEventHandler(async (event) => {
  if (event.method !== "GET") {
    return {
      status: 405,
      body: {
        message: "Method not allowed",
      },
    };
  }

  // Process
  const response: InvoicesBody[] = await $fetch(
    "http://localhost:8080/invoices/"
  );

  return response.reverse();
});
