import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    // Don't ship source maps to production (reduces bundle size and avoids exposing source)
    sourcemap: false,
    // Raise the warning threshold slightly — Radix UI components are large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — changes rarely, maximises caching
          "react-vendor":   ["react", "react-dom"],
          // TanStack Router + Query
          "tanstack":       ["@tanstack/react-router", "@tanstack/react-query"],
          // Supabase client
          "supabase":       ["@supabase/supabase-js"],
          // All Radix UI primitives in one chunk — they tree-shake well but always travel together
          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
          // Form & validation
          "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          // Carousel
          "carousel": ["embla-carousel-react"],
        },
      },
    },
  },
});
