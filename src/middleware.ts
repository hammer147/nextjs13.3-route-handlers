import { NextResponse } from 'next/server'

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000', 'https://www.google.com']
    // : ['http://localhost:3000', ]

export function middleware(request: Request) {
  // middleware run by default on all requests
  // we can use conditional logic to run middleware on specific requests AND/OR export config object with a matcher
  // example 1
  // if (request.url.includes('/api/')) {}
  // example 2
  // const regex = new RegExp('/api/*')
  // if (regex.test(request.url)) {}

  // CORS
  // Example to allow requests from google.com and localhost:3000 in development

  const origin = request.headers.get('origin')
  // using the line below will block requests with no origin, like from Postman or thunder client
  // if (!origin || (!allowedOrigins.includes(origin))) {
  // using the line below will allow requests with no origin, like from Postman or thunder client
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  return NextResponse.next()
}

// docs: https://nextjs.org/docs/advanced-features/middleware
export const config = {
  // matcher: '/api/:path*'
  matcher: '/api/hello'
}
