import { Todo, todoSchema } from '@/types'
import { NextResponse } from 'next/server' // Although Response.json() is valid, native TypeScript types currently shows an error, you can use NextResponse.json() for typed responses instead.
import { z } from 'zod'

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos'
const API_KEY = process.env.API_KEY as string

// GET (all)

export async function GET() {
  const response = await fetch(DATA_SOURCE_URL)
  if (!response.ok) return undefined
  const data = await response.json()
  const result = z.array(todoSchema).safeParse(data)
  return NextResponse.json({ result })
}

// DELETE

export async function DELETE(request: Request) {
  let id: string | number
  try {
    // it seems that await request.json() is not working in Next.js v13.3.0 , that's why we rolled back to v13.2.4
    const reqBody = z.object({ id: z.union([z.string(), z.number()]) }).parse(await request.json())
    id = reqBody.id
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.issues })
    return NextResponse.json({ message: 'error, delete request without body?' })
  }

  const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    }
  })

  if (!response.ok) return NextResponse.json({ message: 'failed to delete' })
  return NextResponse.json({ message: `Todo ${id} deleted` })
}

// POST

export async function POST(request: Request) {
  let postData: Partial<Todo>
  try {
    const reqBody = z.object({ userId: z.number(), title: z.string() }).parse(await request.json())
    postData = reqBody
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.issues })
    return NextResponse.json({ message: 'error, post request without body?' })
  }

  const response = await fetch(DATA_SOURCE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    },
    body: JSON.stringify({ ...postData, completed: false })
  })

  if (!response.ok) return NextResponse.json({ message: 'failed to post' })

  const data = await response.json()
  const result = todoSchema.safeParse(data)
  return NextResponse.json({ result })
}

// PUT

export async function PUT(request: Request) {
  let putData: Todo
  try {
    const reqBody = z
      .object({ id: z.number(), userId: z.number(), title: z.string(), completed: z.boolean() })
      .parse(await request.json())
    putData = reqBody
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.issues })
    return NextResponse.json({ message: 'error, put request without body?' })
  }

  const response = await fetch(`${DATA_SOURCE_URL}/${putData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    },
    body: JSON.stringify(putData)
  })

  if (!response.ok) return NextResponse.json({ message: 'failed to put' })

  const data = await response.json()
  const result = todoSchema.safeParse(data)
  return NextResponse.json({ result })
}
