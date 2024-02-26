import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

export const POST: APIRoute = async ({ request, redirect }) => {
  const insumos = await request.json();

  console.log(insumos);

  const xata = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH,
  });

  return redirect("/produtos");
};
