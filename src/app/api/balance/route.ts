import { NextRequest, NextResponse } from 'next/server';
import { fetchWalletStats } from '@/lib/rpc-client';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    if (!address || typeof address !== 'string') {
      return NextResponse.json(
        { error: 'Invalid address' },
        { status: 400 }
      );
    }

    const stats = await fetchWalletStats(address);
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Balance API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}