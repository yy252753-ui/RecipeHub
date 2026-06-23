import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      "design/**",
      "node_modules/**"
    ]
  },
  ...nextVitals
];

export default config;
