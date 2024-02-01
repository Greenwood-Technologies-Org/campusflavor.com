import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  return NextResponse.json({})
}

export async function POST(req: Request) {
  let body: Object | undefined

  try {
    body = await req.json()
  } catch (e: unknown) {
    body = {}
  }

  return NextResponse.json({
    body: body,
  })
}
