import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      return res.status(429).json({
        message: "Request blocked by security",
      });
    }

    next();
  } catch (error) {
    next();
  }
};
