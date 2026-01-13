'use server';
import { getSessionUser } from '@/utils/getSessionUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import connectDB from '@/config/database';
import Property from '@/models/Property';

export async function updateProperty(propertyId, formData) {
  await connectDB();

  const { user, userId } = await getSessionUser();
  if (!user || !userId) {
    throw new Error('User ID is required');
  }

  // Find the property to update
  const existingProperty = await Property.findById(propertyId);
  if (!existingProperty) {
    throw new Error('Property not found');
  }

  // Verify ownership
  if (userId !== existingProperty.owner.toString()) {
    throw new Error('Unauthorized');
  }

  const amenities = formData.getAll('amenities');

  const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty._id}`);
}
