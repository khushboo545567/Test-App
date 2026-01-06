import Queue from "bull";
import { redisConfig } from "../config/radis.js";

const resultQueue = new Queue("result-queue", {
  redis: redisConfig,
});

export default resultQueue;
