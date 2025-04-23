// metrics.ts
import client from 'prom-client';

// Create a custom registry
const register = new client.Registry();

// Enable default metrics and bind them to our custom registry
client.collectDefaultMetrics({ register });

// Histogram example: tracks request duration
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000],
});

// Register the histogram with our custom registry
register.registerMetric(httpRequestDuration);

export { register };
