import type { APIRoute } from "astro";
import { predictHealthSignals } from "../../lib/predict";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const prediction = await predictHealthSignals(body);

    return new Response(JSON.stringify(prediction), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected prediction error";

    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
