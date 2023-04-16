import { RateLimiter } from 'limiter'

// note that create one limiter for all routes or create different limiters for different routes
export const limiter = new RateLimiter({
  tokensPerInterval: 3,
  interval: 'min',
  fireImmediately: true
})
