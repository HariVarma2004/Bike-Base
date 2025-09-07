// import { Search, User, Menu, Star } from "lucide-react";

// function BikeShowCase() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col">
//       {/* Navbar */}
//       <header className="flex items-center justify-between px-8 py-4 border border-black">
//         {/* Logo */}
//         <div className="text-2xl font-bold">Logo</div>

//         {/* Menu */}
//         <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
//           <a href="#" className="hover:text-blue-600">Bikes</a>
//           <a href="#" className="hover:text-blue-600">Motorbikes</a>
//           <a href="#" className="hover:text-blue-600">Equipment</a>
//           <a href="#" className="hover:text-blue-600">Protective gear</a>
//         </nav>

//         {/* Icons */}
//         <div className="flex items-center gap-5 text-gray-600">
//           <Search size={22} className="cursor-pointer hover:text-blue-600" />
//           <User size={22} className="cursor-pointer hover:text-blue-600" />
//           <Menu size={24} className="cursor-pointer hover:text-blue-600 md:hidden" />
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="flex-1 flex flex-col items-center justify-center relative text-center">
//         {/* Left preview */}
//         <div className="absolute left-10 flex flex-col items-center">
//           <div className="w-28 h-20 border rounded-lg flex items-center justify-center bg-white shadow">
//             <img src="/bike-red.png" alt="Bike Red" className="w-20" />
//           </div>
//           <span className="text-xs mt-2">TCR ADVANCED 2 DISC RED</span>
//         </div>

//         {/* Right preview */}
//         <div className="absolute right-10 flex flex-col items-center">
//           <div className="w-28 h-20 border rounded-lg flex items-center justify-center bg-white shadow">
//             <img src="/bike-blue.png" alt="Bike Blue" className="w-20" />
//           </div>
//           <span className="text-xs mt-2">TCR ADVANCED 2 DISC BLUE</span>
//         </div>

//         {/* Main Bike */}
//         <img src="/bike-black.png" alt="Bike Black" className="w-[500px] max-w-full" />

//         {/* Product Info */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold">TCR ADVANCED 2 DISC BLACK</h2>

//           {/* Rating */}
//           <div className="flex justify-center mt-2">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-6 mt-6 justify-center">
//             <button className="px-6 py-2 bg-white shadow rounded-full font-medium hover:bg-gray-100">
//               View More
//             </button>
//             <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
//               Buy Now
//             </button>
//           </div>
//         </div>

//         {/* Bottom Info */}
//         <div className="absolute bottom-10 right-10 text-sm text-gray-700">
//           <div className="flex gap-2 mb-2">
//             <div className="w-4 h-2 bg-gray-400 rounded"></div>
//             <div className="w-4 h-2 bg-gray-400 rounded"></div>
//             <div className="w-4 h-2 bg-gray-400 rounded"></div>
//             <div className="w-4 h-2 bg-blue-600 rounded"></div>
//           </div>
//           <p className="font-semibold">WEIGHT: 8.45kg</p>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default BikeShowCase;
