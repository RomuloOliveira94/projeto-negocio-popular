import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const name = formData.get("name");
  const price = formData.get("price");

  const xata = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH,
  });

  const insumo = await xata.db.Insumos.update(id, {
    name: name ? (name as string) : undefined,
    price: price ? (price as string) : undefined,
  });

  return redirect("/insumos");
};
