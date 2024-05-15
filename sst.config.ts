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
    new sst.aws.SvelteKit("PokemonEVTracker");
  },
});
