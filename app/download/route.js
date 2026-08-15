// /download - same as old index.js /download (image proxy)
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const fileUrl = new URL(req.url).searchParams.get("url");

    if (!fileUrl) {
      return new Response("url parameter is required", { status: 400 });
    }

    const fileName = "image.jpg";

    const r = await fetch(fileUrl);
    const buffer = Buffer.from(await r.arrayBuffer());

    return new Response(buffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": "image/jpeg"
      }
    });
  } catch (err) {
    console.error(err);
    return new Response("Download failed", { status: 500 });
  }
}
