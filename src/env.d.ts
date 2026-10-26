declare module 'cloudflare:workers' {
  export const env: {
    DEPLOYMENT_ENV?: string;
    STRAPI_URL?: string;
    STRAPI_API_TOKEN?: string;
    PORTFOLIO_FIXTURES?: string;
    SITE_URL?: string;
    CONTACT_RATE_LIMITER?: import('./lib/contact-server').ContactRateLimiter;
    RESEND_API_KEY?: string;
    CONTACT_FROM?: string;
    CONTACT_TO?: string;
    CONTACT_ALLOWED_ORIGIN?: string;
  };
}
