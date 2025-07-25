import { NextResponse } from 'next/server'

// Force dynamic rendering to avoid build-time execution
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  // Import db dynamically to avoid build-time execution
  const { db } = await import('@/lib/db')
  try {
    const body = await req.json()
    const { id, email_addresses, first_name, image_url } = body?.data

    const email = email_addresses[0]?.email_address
    console.log('✅', body)

    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: first_name || '',
        profileImage: image_url || '',
      },
    })
    return new NextResponse('User updated in database successfully', {
      status: 200,
    })
  } catch (error) {
    console.error('Error updating database:', error)
    return new NextResponse('Error updating user in database', { status: 500 })
  }
}
