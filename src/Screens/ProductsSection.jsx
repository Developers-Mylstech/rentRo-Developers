import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Domestic Water Filter",
    price: "AED50.00",
    image: "path-to-image/domestic-filter.png",
    rating: 3.5,
  },
  {
    id: 2,
    name: "Commercial Water Filter",
    price: "AED100.00",
    image: "path-to-image/commercial-filter.png",
    rating: 4,
  },
  {
    id: 3,
    name: "Industrial Water Filter",
    price: "AED50.00",
    image: "path-to-image/industrial-filter.png",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Water Dispenser",
    price: "AED50.00",
    image: "path-to-image/water-dispenser.png",
    rating: 4,
  },
  {
    id: 5,
    name: "Water Cooler",
    price: "AED50.00",
    image: "path-to-image/water-cooler.png",
    rating: 4,
  },
];

const brands = [
  { id: 1, name: "Rent RO", image: "path-to-brand/rentro-logo.png" },
  { id: 2, name: "Aqua Pro", image: "path-to-brand/aquapro-logo.png" },
  { id: 3, name: "Culligan", image: "path-to-brand/culligan-logo.png" },
  { id: 4, name: "Keen Water", image: "path-to-brand/keenwater-logo.png" },
  { id: 5, name: "Water Logic", image: "path-to-brand/waterlogic-logo.png" },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
};

const ProductsSection = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Products On Rent */}
      <h2 className="text-center text-xl font-semibold text-gray-700">
        Just For You
      </h2>
      <h1 className="text-center text-2xl font-bold my-4">
        Products On Monthly Rent
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-3" />
            <h3 className="text-red-500 font-bold">{product.price}</h3>
            <p className="text-gray-700 text-sm">{product.name}</p>
            <div className="mt-2">{renderStars(product.rating)}</div>
          </div>
        ))}
      </div>

      {/* Brands Section */}
      <h2 className="text-center text-2xl font-bold my-8">Our Brands</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {brands.map((brand) => (
          <img key={brand.id} src={brand.image} alt={brand.name} className="h-12" />
        ))}
      </div>

      {/* New Products Section */}
      <h2 className="text-center text-xl font-semibold text-gray-700 mt-10">
        Just For You
      </h2>
      <h1 className="text-center text-2xl font-bold my-4">New Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-3" />
            <p className="text-gray-700 text-sm">{product.name}</p>
            <div className="mt-2">{renderStars(product.rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
