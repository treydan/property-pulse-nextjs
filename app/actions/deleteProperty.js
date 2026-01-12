'use server';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';

export async function deleteProperty(propertyId) {
  const { user, userId } = await getSessionUser();
  if (!user || !userId) {
    throw new Error('User ID is required');
  }

  await connectDB();

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }

  if (userId != property.owner.toString()) {
    throw new Error('Unauthorized');
  }

  const imageIds = property.images.map(imageUrl => {
    const parts = imageUrl.split('/');

    return parts.at(-1).split('.')[0];
  });

  for (const id of imageIds) {
    await cloudinary.uploader.destroy(`propertypulse/${id}`);
  }

  await property.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;
