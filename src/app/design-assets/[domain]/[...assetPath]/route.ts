import { promises as fs } from "node:fs";
import path from "node:path";

const MIME_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function getContentType(filePath: string) {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
}

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      assetPath: string[];
      domain: string;
    }>;
  },
) {
  const { assetPath, domain } = await context.params;
  const assetsRoot = path.resolve(process.cwd(), "designs", domain, "assets");
  const targetPath = path.resolve(assetsRoot, ...assetPath);
  const isInsideAssetsRoot =
    targetPath === assetsRoot || targetPath.startsWith(`${assetsRoot}${path.sep}`);

  if (!isInsideAssetsRoot) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const file = await fs.readFile(targetPath);

    return new Response(file, {
      headers: {
        "Content-Type": getContentType(targetPath),
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
