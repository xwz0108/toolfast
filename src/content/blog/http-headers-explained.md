## What are HTTP Headers?

HTTP headers are key-value pairs sent with every HTTP request and response. They carry metadata about the request/response.

### Request Headers

| Header | Purpose |
|--------|---------|
| `Host` | Domain being requested |
| `User-Agent` | Browser/client info |
| `Accept` | Acceptable content types |
| `Authorization` | Auth credentials |
| `Content-Type` | Format of request body |
| `Cookie` | Stored cookies |

### Response Headers

| Header | Purpose |
|--------|---------|
| `Content-Type` | Format of response |
| `Cache-Control` | Caching directives |
| `Set-Cookie` | Set browser cookies |
| `Access-Control-Allow-Origin` | CORS setting |

### Security Headers

| Header | Protects Against |
|--------|-----------------|
| `Content-Security-Policy` | XSS attacks |
| `X-Frame-Options` | Clickjacking |
| `Strict-Transport-Security` | Protocol downgrade |
| `X-Content-Type-Options` | MIME sniffing |

### Cache-Control Directives
- `public` — Can be cached by anyone
- `private` — Browser only
- `no-cache` — Must revalidate
- `max-age=3600` — Cache for 1 hour

[Parse Headers Now →](/tools/http-headers)
