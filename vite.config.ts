/// <reference types="vitest" />

import { defineConfig } from "vite"

export default defineConfig({
  test: {
    coverage: {
      "100": true,
      include: ["src"],
      reporter: ["text", "json", "html"],
    },
  },
})
