import { NextResponse } from 'next/server';
import sampleData from '../../../sample-data.json';

export async function GET() {
  return NextResponse.json(sampleData);
}

