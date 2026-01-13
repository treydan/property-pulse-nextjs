import { convertToSerializableObject } from '@/utils/convertToObject';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const SearchPage = async ({ searchParams: { location, propertyType } }) => {
  await connectDB();

  let query = {};
  if (location) {
    const locationPattern = new RegExp(location, 'i');
    query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };
  }
  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }

  const propertyDocs = await Property.find(query).lean();
  const properties = propertyDocs.map(convertToSerializableObject);
  console.log(properties.length);

  return <div>SearchPage</div>;
};

export default SearchPage;
