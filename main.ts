import { serve } from "https://deno.land/std/http/mod.ts";
import { lookup } from "https://deno.land/x/media_types/mod.ts";

const BASE_PATH = "./public";

const reqHandler = async (req: Request) => {
  var filePath = BASE_PATH + new URL(req.url).pathname;
  
  if (filePath==BASE_PATH+'/') {
     var filePath = BASE_PATH+'/' + 'index.html'
  }
  console.log(filePath);

  let fileSize;
  try {
    fileSize = (await Deno.stat(filePath)).size;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return new Response(null, { status: 404 });
    }
    return new Response(null, { status: 500 });
  }
  const body = (await Deno.open(filePath)).readable;
  return new Response(body, {
    headers: {
      "content-length": fileSize.toString(),
      "content-type": lookup(filePath) || "application/octet-stream",
    },
  });
};

serve(reqHandler);

