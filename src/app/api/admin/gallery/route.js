import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

export async function GET() {
  try {
    await connectDB();

    const photos = await Gallery.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      photos,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = request.cookies;
    const auth = cookieStore.get('admin_auth');

    if (!auth || auth.value !== 'true') {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    await connectDB();

    const {
      title,
      category,
      imageUrl,
      publicId,
    } = await request.json();

    const photo = await Gallery.create({
      title,
      category,
      imageUrl,
      publicId,
    });

    return NextResponse.json({
      success: true,
      photo,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}