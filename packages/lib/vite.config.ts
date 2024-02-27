/// <reference types="vitest" />

import { defineConfig } from "vite"

export default defineConfig({
  test: {
    coverage: {
      // @ts-ignore
      "100": true,
      include: ["src"],
      reporter: ["text", "json", "html"],
    },
  },
})
