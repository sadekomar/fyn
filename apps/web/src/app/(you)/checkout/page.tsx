import CheckoutForm from "./checkout-form";
import { QueryClient } from "@tanstack/react-query";

export default async function CheckoutPage() {
  // okay i need to do data fetching in this component
  const queryClient = new QueryClient();

  return <CheckoutForm />;
}
