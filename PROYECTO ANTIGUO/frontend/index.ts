import index from "./index.html"

Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/": index,
    "/world.html": {
      // Serve as raw static HTML — Bun must NOT bundle this (uses CDN globals)
      GET: () => new Response(Bun.file(import.meta.dir + "/world.html"), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }),
    },
    "/capachica.glb": {
      // Modelo 3D exportado por Blender (capachica_scene.py)
      GET: async () => {
        const file = Bun.file(import.meta.dir + "/capachica.glb");
        if (!await file.exists()) return new Response("GLB not found — run capachica_scene.py in Blender first", { status: 404 });
        return new Response(file, { headers: { "Content-Type": "model/gltf-binary" } });
      },
    },
    "/*": index,  // SPA catch-all → React Router
  },
  development: {
    hmr: true,
    console: true,
  },
})

console.log("✅ Capachica frontend on http://localhost:3000")
