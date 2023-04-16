import { NextResponse } from 'next/server'
import { limiter } from '../config/limiter'

export async function GET(request: Request) {

  // rate limit requests to 3 per minute
  const origin = request.headers.get('origin')
  const remaining = await limiter.removeTokens(1)
  console.log({ remaining })
  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'Too Many Requests',
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-Type': 'text/plain'
      }
    })
  }

  return new NextResponse('hello Next.js', {
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Content-Type': 'text/plain'
    }
  })
}
