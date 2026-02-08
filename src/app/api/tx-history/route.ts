import { NextRequest, NextResponse } from 'next/server';
import { BLOCKSCOUT_ENDPOINTS } from '@/lib/constants';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const chain = searchParams.get('chain') || 'ethereum';

    if (!address) {
      return NextResponse.json(
        { error: 'Missing address parameter' },
        { status: 400 }
      );
    }

    const apiEndpoint = chain === 'base' 
      ? BLOCKSCOUT_ENDPOINTS.base 
      : BLOCKSCOUT_ENDPOINTS.ethereum;

    const response = await fetch(
      `${apiEndpoint}?module=account&action=txlist&address=${address}&page=1&offset=1&sort=desc`
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limited' },
          { status: 429 }
        );
      }
      throw new Error('Blockscout request failed');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Transaction history API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction history' },
      { status: 500 }
    );
  }
}