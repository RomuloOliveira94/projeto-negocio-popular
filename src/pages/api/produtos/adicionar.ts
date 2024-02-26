import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

export const POST: APIRoute = async ({ request, redirect }) => {
  const insumos = await request.json();

  const xata = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH,
  });

  const record = await xata.db.Produtos.create({
    name: insumos.name,
    price: parseFloat(insumos.price.toFixed(2)),
  });

  console.log(record);
  return redirect("/produtos");
};
