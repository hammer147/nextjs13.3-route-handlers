import { Todo, todoSchema } from '@/types'
import { NextResponse } from 'next/server' // Although Response.json() is valid, native TypeScript types currently shows an error, you can use NextResponse.json() for typed responses instead.
import { z } from 'zod'

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos'

// GET (one)

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  const response = await fetch(`${DATA_SOURCE_URL}/${id}`)
  if (!response.ok) return undefined
  const data = await response.json()
  const result = todoSchema.safeParse(data)
  return NextResponse.json({ result })
}
