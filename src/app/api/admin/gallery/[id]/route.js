import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const cookieStore = request.cookies;
    const auth = cookieStore.get("admin_auth");

    if (!auth || auth.value !== "true") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
     await connectDB();

    const photo = await Gallery.findById(id);

    if (!photo) {
      return NextResponse.json(
        { success: false, message: "Photo not found" },
        { status: 404 }
      );
    }

    await cloudinary.uploader.destroy(photo.publicId);
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Photo deleted",
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