import type { APIRoute } from "astro";
import { XataClient } from "../../../xata";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const id = formData.get("id");

  const xata = new XataClient({
    apiKey: import.meta.env.XATA_API_KEY,
    branch: import.meta.env.XATA_BRANCH,
  });

  await xata.db.Insumos.delete(id as string);

  return redirect("/insumos");
};
