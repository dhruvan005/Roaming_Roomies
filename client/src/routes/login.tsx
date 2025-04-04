import { Button } from "antd";
import { createFileRoute } from "@tanstack/react-router";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="relative flex flex-col w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-6 sm:p-8 md:p-10 
          justify-center rounded-xl m-auto border border-gray-700 shadow-2xl 
          bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <div className="text-center text-2xl sm:text-3xl font-bold mb-8 text-white">
          Welcome Back
          <p className="text-sm font-normal text-gray-300 mt-2">
            Please login or create a new account
          </p>
        </div>

        <Button
          className="mt-4 bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg 
            cursor-pointer transition-all duration-300 ease-in-out text-lg font-medium
            border-none shadow-lg hover:shadow-red-700/30 hover:scale-105"
          onClick={() => (window.location.href = "/api/login")}
        >
          Login
        </Button>

        <Button
          className="mt-4 bg-green-700 hover:bg-green-600 text-white py-3 px-6 rounded-lg 
            cursor-pointer transition-all duration-300 ease-in-out text-lg font-medium
            border-none shadow-lg hover:shadow-green-700/30 hover:scale-105"
          onClick={() => (window.location.href = "/api/register")}
        >
          Register
        </Button>

        <div
          className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
            bg-red-900/50 -top-10 -left-10"
        ></div>
        <div
          className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
            bg-green-900/50 -bottom-10 -right-10"
        ></div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/login")({
  component: Login,
});


// import { Button } from "antd";
// import { createFileRoute } from "@tanstack/react-router";
// import { Sparkles, Search, Home, Users, Star } from "lucide-react";

// export function LandingPage() {
//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       {/* Hero Section */}
//       <div className="relative h-screen flex items-center">
//         {/* Background Effects */}
//         <div className="absolute -z-10 w-96 h-96 blur-3xl rounded-full bg-indigo-600/20 -top-20 -left-20 animate-pulse"></div>
//         <div className="absolute -z-10 w-96 h-96 blur-3xl rounded-full bg-pink-600/20 bottom-0 right-0 animate-pulse"></div>
//         <div className="absolute -z-10 w-80 h-80 blur-2xl rounded-full bg-cyan-600/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        
//         {/* Hero Content */}
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-12">
//             <div className="w-full md:w-1/2 space-y-6">
//               <div className="flex items-center gap-2 mb-6">
//                 <Sparkles className="text-cyan-400" size={24} />
//                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
//                   vibes check
//                 </span>
//               </div>
              
//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
//                 Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-500">Perfect</span> Roommate
//               </h1>
              
//               <p className="text-lg md:text-xl text-gray-300">
//                 Connect with roommates who match your lifestyle. List your space or find your next home — all in one place.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button
//                   className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-6 px-8 rounded-2xl 
//                   cursor-pointer transition-all duration-300 ease-in-out text-lg font-bold
//                   border-none shadow-lg hover:shadow-cyan-500/50 hover:scale-105 flex items-center justify-center gap-2"
//                   onClick={() => (window.location.href = "/search")}
//                 >
//                   <Search size={18} />
//                   Find Roommates
//                 </Button>
                
//                 <Button
//                   className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-6 px-8 rounded-2xl 
//                   cursor-pointer transition-all duration-300 ease-in-out text-lg font-bold
//                   border-none shadow-lg hover:shadow-pink-500/50 hover:scale-105 flex items-center justify-center gap-2"
//                   onClick={() => (window.location.href = "/list")}
//                 >
//                   <Home size={18} />
//                   List Your Space
//                 </Button>
//               </div>
//             </div>
            
//             {/* Placeholder for hero image */}
//             <div className="w-full md:w-1/2 relative h-80 md:h-96">
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-800/40 to-indigo-800/40 backdrop-blur-sm border border-indigo-500/30 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-6xl mb-4">🏠</div>
//                   <p className="text-xl font-medium text-gray-200">Hero Image Placeholder</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="py-24 bg-gradient-to-b from-black to-indigo-950">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               How <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">vibes check</span> Works
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Finding the perfect roommate or listing your space has never been easier
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Step 1 */}
//             <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl p-8 border border-indigo-500/30 transform transition-all duration-300 hover:scale-105">
//               <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
//                 <Search size={32} className="text-white" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
//               <p className="text-gray-300">
//                 Tell us about your lifestyle, preferences, and what you're looking for in a roommate.
//               </p>
//             </div>
            
//             {/* Step 2 */}
//             <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl p-8 border border-indigo-500/30 transform transition-all duration-300 hover:scale-105">
//               <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-400 rounded-2xl flex items-center justify-center mb-6">
//                 <Users size={32} className="text-white" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4">Match with Roommates</h3>
//               <p className="text-gray-300">
//                 Our algorithm finds potential roommates based on compatibility, location, and budget.
//               </p>
//             </div>
            
//             {/* Step 3 */}
//             <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl p-8 border border-indigo-500/30 transform transition-all duration-300 hover:scale-105">
//               <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
//                 <Home size={32} className="text-white" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4">Move In Together</h3>
//               <p className="text-gray-300">
//                 Connect, meet up, and find your new home or roommate. It's that simple!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Featured Listings Section */}
//       <div className="py-24 bg-gradient-to-b from-indigo-950 to-black">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">Listings</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Check out these popular rooms and apartments ready for new roommates
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* Featured Listing 1 */}
//             <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-indigo-500/30 transform transition-all duration-300 hover:scale-105">
//               <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
//                 <div className="text-4xl">🏢</div>
//               </div>
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-xl font-bold">Downtown Loft</h3>
//                   <div className="flex items-center gap-1">
//                     <Star size={16} className="text-yellow-400 fill-yellow-400" />
//                     <span>4.9</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-300 mb-4">Private room in shared apartment, $1,200/mo</p>
//                 <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl border-none">
//                   View Details
//                 </Button>
//               </div>
//             </div>
            
//             {/* Featured Listing 2 */}
//             <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-indigo-500/30 transform transition-all duration-300 hover:scale-105">
//               <div className="h-48 bg-gradient-to-br from-pink-500/20 to-orange-400/20 flex items-center justify-center">
//                 <div className="text-4xl">🏠</div>
//               </div>
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-xl font-bold">Cozy Townhouse</h3>
//                   <div className="flex items-center gap-1">
//                     <Star size={16} className="text-yellow-400 fill-yellow-400" />
//                     <span>4.7</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-300 mb-4">Shared room in townhouse, $850/mo</p>
//                 <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white py-3 rounded-xl border-none">
//                   View Details
//                 </Button>
//               </div>
//             </div>
            
//             {/* Featured Listing 3 */}
//             <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-indigo-500/30 transform transition-all duration-300 hover:scale-105">
//               <div className="h-48 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 flex items-center justify-center">
//                 <div className="text-4xl">🏡</div>
//               </div>
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="text-xl font-bold">Modern Studio</h3>
//                   <div className="flex items-center gap-1">
//                     <Star size={16} className="text-yellow-400 fill-yellow-400" />
//                     <span>4.8</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-300 mb-4">Entire studio to share, $1,500/mo</p>
//                 <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl border-none">
//                   View Details
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//           <div className="text-center mt-12">
//             <Button
//               className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 px-8 rounded-2xl 
//               cursor-pointer transition-all duration-300 ease-in-out text-lg font-bold
//               border-none shadow-lg hover:shadow-indigo-500/50 hover:scale-105"
//               onClick={() => (window.location.href = "/listings")}
//             >
//               View All Listings
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       {/* CTA Section */}
//       <div className="py-24 relative">
//         <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-violet-950/50 to-indigo-900/50"></div>
//         <div className="absolute -z-10 w-96 h-96 blur-3xl rounded-full bg-cyan-600/20 top-0 left-0 animate-pulse"></div>
//         <div className="absolute -z-10 w-96 h-96 blur-3xl rounded-full bg-pink-600/20 bottom-0 right-0 animate-pulse"></div>
        
//         <div className="container mx-auto px-6">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Ready to Find Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-500">Perfect Match</span>?
//             </h2>
//             <p className="text-xl text-gray-300 mb-12">
//               Join thousands of people who've found their ideal living situation through vibes check
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button
//                 className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-6 px-8 rounded-2xl 
//                 cursor-pointer transition-all duration-300 ease-in-out text-lg font-bold
//                 border-none shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
//                 onClick={() => (window.location.href = "/register")}
//               >
//                 Sign Up Free
//               </Button>
              
//               <Button
//                 className="bg-transparent border border-white text-white py-6 px-8 rounded-2xl 
//                 cursor-pointer transition-all duration-300 ease-in-out text-lg font-bold
//                 hover:bg-white/10"
//                 onClick={() => (window.location.href = "/login")}
//               >
//                 Log In
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export const Route = createFileRoute("/login")({
//   component: LandingPage,
// });