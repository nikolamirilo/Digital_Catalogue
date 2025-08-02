import posthog from 'posthog-js'

posthog.init(process.env.POSTHOG_KEY, {
    api_host: process.env.POSTHOG_HOST,
    defaults: '2025-05-24'
});

