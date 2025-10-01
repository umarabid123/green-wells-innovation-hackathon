import { NextRequest, NextResponse } from 'next/server';

// Pakistani cities with coordinates
const cities = [
  { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore', lat: 31.5204, lng: 74.3587 },
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
  { name: 'Rawalpindi', lat: 33.5651, lng: 73.0169 },
  { name: 'Faisalabad', lat: 31.4504, lng: 73.1350 },
  { name: 'Multan', lat: 30.1575, lng: 71.5249 },
  { name: 'Peshawar', lat: 34.0151, lng: 71.5249 },
  { name: 'Quetta', lat: 30.1798, lng: 66.9750 },
  { name: 'Sialkot', lat: 32.4945, lng: 74.5229 },
  { name: 'Gujranwala', lat: 32.1877, lng: 74.1945 },
  { name: 'Hyderabad', lat: 25.3960, lng: 68.3578 },
  { name: 'Bahawalpur', lat: 29.3956, lng: 71.6836 },
  { name: 'Sargodha', lat: 32.0836, lng: 72.6711 },
  { name: 'Sukkur', lat: 27.7025, lng: 68.8601 },
  { name: 'Larkana', lat: 27.5590, lng: 68.2123 }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: cities
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}
