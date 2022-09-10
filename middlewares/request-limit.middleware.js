import rateLimit from 'express-rate-limit';

// ✔ create request limit middleware
const requestLimitMiddleware = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: (req, res) => console.Error('Requesting api', 'Too many request [100] in 1 min.', 'Try again later.').send(res, 429),
});

export default requestLimitMiddleware;
