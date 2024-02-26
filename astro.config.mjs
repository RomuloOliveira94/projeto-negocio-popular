import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [icon(), tailwind(), alpinejs()],
});
