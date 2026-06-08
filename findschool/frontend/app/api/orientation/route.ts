import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.profile) {
    return NextResponse.json(
      {
        success: false,
        error: 'Le profil est obligatoire',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      profile: body.profile,
      classLevel: body.classLevel ?? null,
      savedAt: new Date().toISOString(),
    },
  });
}
