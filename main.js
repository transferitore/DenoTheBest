import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";

serve((_req) => {
  return new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
});



const app = new Application();

app
  .static("/", "./public");
