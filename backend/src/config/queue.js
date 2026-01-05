import Queue from "bull";

const resultQueue = new Queue("result-queue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export default resultQueue;
