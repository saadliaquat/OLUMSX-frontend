import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import flowbitePlugin from "flowbite/plugin.js";

/** @type {import('tailwindcss').Config} */
export default {
  important: false,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [aspectRatio, forms, flowbitePlugin],
};
