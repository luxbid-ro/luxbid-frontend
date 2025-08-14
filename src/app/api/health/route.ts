import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    middleware: 'Basic Auth should be active',
    credentials: 'luxbid / luxbid2024'
  })
}
