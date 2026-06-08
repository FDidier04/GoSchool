import { NextRequest, NextResponse } from 'next/server';
import { searchListings } from '@/lib/goschool-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get('q') ?? '';
  const city = searchParams.get('city') ?? '';

  return NextResponse.json({
    success: true,
    data: searchListings(query, city),
  });
}
