/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "ev-tracker",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: input?.stage === "production" ? "prod" : "dev",
        },
      },
    };
  },
  async run() {
    new sst.aws.SvelteKit("PokemonEVTracker", {
      environment: {
        PRIVATE_BACKEND_URL: process.env.PRIVATE_BACKEND_URL || "WHERE_IS_ENV_VAR",
        PRIVATE_API_KEY: process.env.PRIVATE_API_KEY || "API_KEY_999",
      }
    });
  },
});
