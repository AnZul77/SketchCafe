import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

const isProduction = process.env.NODE_ENV === "production";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,

  characteristics: ["ip.src"],

  rules: [
    shield({
      mode: isProduction ? "LIVE" : "DRY_RUN",
    }),

    detectBot({
      mode: isProduction ? "LIVE" : "DRY_RUN",

      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR"],
    }),

    tokenBucket({
      mode: isProduction ? "LIVE" : "DRY_RUN",

      refillRate: 20,
      interval: 60,
      capacity: 50,
    }),
  ],
});
