import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('=== New Lead Notification ===');
    console.log('Lead ID:', body.leadId);
    console.log('Full Name:', body.full_name);
    console.log('Phone:', body.phone);
    console.log('Service ID:', body.service_id);
    console.log('Preferred Date:', body.preferred_date || 'Not specified');
    console.log('Preferred Time:', body.preferred_time || 'Not specified');
    console.log('Car:', body.car_make_model || 'Not specified');
    console.log('Message:', body.message || 'None');
    console.log('============================');

    return NextResponse.json(
      {
        success: true,
        message: 'Lead notification logged. WhatsApp integration placeholder ready.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}
