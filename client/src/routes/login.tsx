// import { Button } from "antd";
import { createFileRoute } from "@tanstack/react-router";

// export function Login() {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div
//         className="relative flex flex-col w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-6 sm:p-8 md:p-10 
//           justify-center rounded-xl m-auto border border-gray-700 shadow-2xl 
//           bg-gradient-to-br from-gray-900 to-gray-800"
//       >
//         <div className="text-center text-2xl sm:text-3xl font-bold mb-8 text-white">
//           Welcome Back
//           <p className="text-sm font-normal text-gray-300 mt-2">
//             Please login or create a new account
//           </p>
//         </div>

//         <Button
//           className="mt-4 bg-red-700 hover:bg-red-600 text-white py-3 px-6 rounded-lg 
//             cursor-pointer transition-all duration-300 ease-in-out text-lg font-medium
//             border-none shadow-lg hover:shadow-red-700/30 hover:scale-105"
//           onClick={() => (window.location.href = "/api/login")}
//         >
//           Login
//         </Button>

//         <Button
//           className="mt-4 bg-green-700 hover:bg-green-600 text-white py-3 px-6 rounded-lg 
//             cursor-pointer transition-all duration-300 ease-in-out text-lg font-medium
//             border-none shadow-lg hover:shadow-green-700/30 hover:scale-105"
//           onClick={() => (window.location.href = "/api/register")}
//         >
//           Register
//         </Button>

//         <div
//           className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
//             bg-red-900/50 -top-10 -left-10"
//         ></div>
//         <div
//           className="absolute -z-10 w-[200px] h-[200px] blur-[120px] rounded-full 
//             bg-green-900/50 -bottom-10 -right-10"
//         ></div>
//       </div>
//     </div>
//   );
// }
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Users, Search, CheckCircle, MessageSquare, ArrowRight, ChevronDown, Star } from "lucide-react"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      border: "2px solid rgba(59, 130, 246, 0.6)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      zIndex: 999,
    },
    button: {
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      border: "3px solid rgba(59, 130, 246, 0.4)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      scale: 1.2,
      zIndex: 999,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    card: {
      x: cursorPosition.x - 30,
      y: cursorPosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(59, 130, 246, 0.08)",
      border: "2px solid rgba(59, 130, 246, 0.3)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      scale: 1.1,
      zIndex: 999,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    text: {
      x: cursorPosition.x - 12,
      y: cursorPosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(59, 130, 246, 0)",
      border: "1.5px solid rgba(59, 130, 246, 0.8)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      scale: 1,
      zIndex: 999,
    },
    link: {
      x: cursorPosition.x - 20,
      y: cursorPosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
      border: "2px solid rgba(59, 130, 246, 0.6)",
      mixBlendMode: "normal" as const,
      borderRadius: "50%",
      scale: 1.1,
      zIndex: 999,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  }

  const enterButton = () => setCursorVariant("button")
  const enterCard = () => setCursorVariant("card")
  const enterText = () => setCursorVariant("text")
  const enterLink = () => setCursorVariant("link")
  const leaveButton = () => setCursorVariant("default")
  const leaveCard = () => setCursorVariant("default")
  const leaveText = () => setCursorVariant("default")
  const leaveLink = () => setCursorVariant("default")

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 md:cursor-none cursor-default">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white opacity-70" />
        <svg className="absolute top-0 right-0 opacity-10" width="800" height="800" viewBox="0 0 800 800">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-white to-white opacity-70" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className=" flex h-16 items-center justify-evenly">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold">Roaming Roomies</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-blue-500 transition-colors relative group"
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#features"
              className="text-sm font-medium hover:text-blue-500 transition-colors relative group"
              onMouseEnter={enterLink}
              onMouseLeave={leaveLink}
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              className="bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
              onClick={() => (window.location.href = "/api/login")}
            >
              Sign Up / Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Animated Lines Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-500"
                style={{
                  height: '2px',
                  width: '100%',
                  left: 0,
                  top: `${i * 10}%`,
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 15 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5,
                }}
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-indigo-500"
                style={{
                  width: '2px',
                  height: '100%',
                  top: 0,
                  left: `${i * 7}%`,
                }}
                animate={{
                  y: ['-100%', '100%'],
                }}
                transition={{
                  duration: 20 + i * 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        <div className=" relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl boldonse-regular leading-tight  mb-6">

              Life's too short for bad <span className="inline-block bg-blue-200 text-blue-700 px-2 py-1 rounded-md transform rotate-3 relative">Roommates</span> find your <span className="inline-block bg-indigo-200 text-indigo-600 px-2 py-1 rounded-md transform -rotate-3 relative">Perfect</span> match
            </h1>
            <p className="text-lg text-gray-600 mb-4" onMouseEnter={enterText} onMouseLeave={leaveText}>
              Connect with compatible roommates based on lifestyle, habits, and preferences. Your perfect living
              situation is just a few clicks away.
            </p>
            <p className="text-lg text-blue-600 italic mb-8 font-medium" onMouseEnter={enterText} onMouseLeave={leaveText}>
              <span className="relative inline-block">
                <span className="absolute -left-2 -top-2 text-3xl text-blue-300 opacity-50">"</span>
                Where strangers become roommates, and roommates become friends.
                <span className="absolute -bottom-2 -right-2 text-3xl text-blue-300 opacity-50">"</span>
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-blue-500 hover:bg-blue-600 h-12 px-8 text-lg shadow-lg hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
                onClick={() => (window.location.href = "/api/login")}
              >
                Find a Room
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 text-lg border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
                onClick={() => (window.location.href = "/api/login")}
              >
                List Your Space
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </section>

      {/* Scroll Down Indicator */}
      <div className="flex justify-center -mt-10 mb-10">
        <motion.a
          href="#how-it-works"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center text-gray-500 hover:text-blue-500 transition-colors"
          onMouseEnter={enterLink}
          onMouseLeave={leaveLink}
        >
          <span className="text-sm font-medium mb-2">Scroll to learn more</span>
          <ChevronDown className="h-6 w-6" />
        </motion.a>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%233b82f6' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Animated Waves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bottom-0 left-0 w-[200%] h-16 opacity-10"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%233b82f6'%3E%3C/path%3E%3C/svg%3E\")",
              backgroundSize: "100% 100%",
            }}
            animate={{
              x: [0, -600],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[200%] h-12 opacity-10"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%236366f1'%3E%3C/path%3E%3C/svg%3E\")",
              backgroundSize: "100% 100%",
            }}
            animate={{
              x: [-600, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-0 left-0 w-[200%] h-14 opacity-10"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z' fill='%233b82f6'%3E%3C/path%3E%3C/svg%3E\")",
              backgroundSize: "100% 100%",
            }}
            animate={{
              x: [0, -600],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className=" relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: scrollY > 100 ? 1 : 0, y: scrollY > 100 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" onMouseEnter={enterText} onMouseLeave={leaveText}>
              Whether you're looking for a room or have one to offer, our platform makes the process simple and
              effective.
            </p>
          </motion.div>

          <Tabs defaultValue="find" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-12 bg-blue-50 p-1 h-12 gap-3">
              <TabsTrigger
                value="find"
                className="text-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300 h-12"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                I Need a Room
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="text-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-300 h-12"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                I Have a Room
              </TabsTrigger>
            </TabsList>
            <TabsContent value="find">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onMouseEnter={enterCard}
                  onMouseLeave={leaveCard}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white">
                    <CardContent className="pt-6 p-6">
                      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <Users className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Create Your Profile
                      </h3>
                      <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                        Share your lifestyle, habits, and preferences to find compatible roommates.
                      </p>
                      <div className="h-1 w-0 bg-blue-400 mt-4 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onMouseEnter={enterCard}
                  onMouseLeave={leaveCard}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white">
                    <CardContent className="pt-6 p-6">
                      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <Search className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Browse Listings
                      </h3>
                      <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                        Explore available rooms that match your criteria and preferences.
                      </p>
                      <div className="h-1 w-0 bg-blue-400 mt-4 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onMouseEnter={enterCard}
                  onMouseLeave={leaveCard}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white">
                    <CardContent className="pt-6 p-6">
                      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <MessageSquare className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Connect & Move In
                      </h3>
                      <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                        Message potential roommates, schedule viewings, and find your new home.
                      </p>
                      <div className="h-1 w-0 bg-blue-400 mt-4 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
            <TabsContent value="list">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onMouseEnter={enterCard}
                  onMouseLeave={leaveCard}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white">
                    <CardContent className="pt-6 p-6">
                      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <Home className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        List Your Space
                      </h3>
                      <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                        Create a detailed listing with photos, amenities, and house rules.
                      </p>
                      <div className="h-1 w-0 bg-blue-400 mt-4 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onMouseEnter={enterCard}
                  onMouseLeave={leaveCard}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white">
                    <CardContent className="pt-6 p-6">
                      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <CheckCircle className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Set Preferences
                      </h3>
                      <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                        Specify the type of roommate you're looking for based on lifestyle and habits.
                      </p>
                      <div className="h-1 w-0 bg-blue-400 mt-4 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onMouseEnter={enterCard}
                  onMouseLeave={leaveCard}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-white">
                    <CardContent className="pt-6 p-6">
                      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <MessageSquare className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Review & Connect
                      </h3>
                      <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                        Review applicants, chat with potential roommates, and find your perfect match.
                      </p>
                      <div className="h-1 w-0 bg-blue-400 mt-4 group-hover:w-full transition-all duration-500 rounded-full"></div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-blue-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#3b82f6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className=" relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: scrollY > 600 ? 1 : 0, y: scrollY > 600 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Smart Matching Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" onMouseEnter={enterText} onMouseLeave={leaveText}>
              Our platform uses advanced matching algorithms to connect compatible roommates.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: scrollY > 700 ? 1 : 0, x: scrollY > 700 ? 0 : -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex gap-4 group" onMouseEnter={enterCard} onMouseLeave={leaveCard}>
                <div className="rounded-full bg-blue-100 w-12 h-12 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 transform group-hover:scale-110">
                  <Users className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    Social Compatibility
                  </h3>
                  <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                    Match with roommates who share your social preferences, whether you're an introvert, extrovert, or
                    somewhere in between.
                  </p>
                </div>
                <div className="ml-auto text-blue-500 font-bold flex items-center gap-1">
                  <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                  92% Match
                </div>
              </div>
              <div className="flex gap-4 group" onMouseEnter={enterCard} onMouseLeave={leaveCard}>
                <div className="rounded-full bg-blue-100 w-12 h-12 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 transform group-hover:scale-110">
                  <Home className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    Lifestyle Matching
                  </h3>
                  <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                    Find roommates with compatible sleeping schedules, cleanliness standards, and daily routines.
                  </p>
                </div>
                <div className="ml-auto text-blue-500 font-bold flex items-center gap-1">
                  <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                  92% Match
                </div>
              </div>
              <div className="flex gap-4 group" onMouseEnter={enterCard} onMouseLeave={leaveCard}>
                <div className="rounded-full bg-blue-100 w-12 h-12 flex-shrink-0 flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300 transform group-hover:scale-110">
                  <CheckCircle className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    Verified Profiles
                  </h3>
                  <p className="text-gray-600" onMouseEnter={enterText} onMouseLeave={leaveText}>
                    All users go through a verification process to ensure safety and authenticity.
                  </p>
                </div>
                <div className="ml-auto text-blue-500 font-bold flex items-center gap-1">
                  <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                  92% Match
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: scrollY > 700 ? 1 : 0, scale: scrollY > 700 ? 1 : 0.9 }}
              transition={{ duration: 0.6 }}
              className="relative"
              onMouseEnter={enterCard}
              onMouseLeave={leaveCard}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl transform rotate-3 scale-105" />
              <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Sarah, 28</h4>
                      <p className="text-sm text-gray-500">Professional, Non-smoker</p>
                    </div>
                    <div className="ml-auto text-blue-500 font-bold flex items-center gap-1">
                      <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
                      92% Match
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                      <p className="text-gray-500">Sleeping Schedule</p>
                      <p className="font-medium">Night Owl</p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                      <p className="text-gray-500">Cleanliness</p>
                      <p className="font-medium">Very Tidy</p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                      <p className="text-gray-500">Guests</p>
                      <p className="font-medium">Occasionally</p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                      <p className="text-gray-500">Pets</p>
                      <p className="font-medium">Cat Friendly</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-gray-600 mb-4" onMouseEnter={enterText} onMouseLeave={leaveText}>
                      "I'm a software developer who works from home. I enjoy quiet evenings and the occasional weekend
                      outing with friends."
                    </p>
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1"
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    >
                      Connect with Sarah
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-200 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute -bottom-10 -left-10 w-72 h-72 opacity-10"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1.5C87,13.4,81.4,26.8,73.6,38.6C65.8,50.4,55.8,60.6,43.7,67.1C31.7,73.7,17.8,76.5,2.9,72.9C-12,69.3,-23.9,59.2,-36.9,51.2C-49.9,43.2,-63.9,37.3,-70.3,27C-76.7,16.7,-75.5,2,-72.4,-11.7C-69.3,-25.4,-64.3,-38.2,-55.5,-47.2C-46.7,-56.2,-34.1,-61.5,-21.8,-69.5C-9.6,-77.5,2.3,-88.3,16.1,-88.7C29.8,-89.1,45.5,-79.1,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            className="absolute -top-10 -right-10 w-72 h-72 opacity-10"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M39.9,-65.7C54.1,-60,69.5,-53.8,77.9,-42.5C86.3,-31.2,87.6,-15.6,85.8,-1.1C84,13.5,79,26.9,70.8,37.8C62.5,48.7,50.9,57.1,38.4,62.9C25.9,68.7,12.9,71.9,-0.2,72.2C-13.4,72.5,-26.8,70,-39.2,64.1C-51.6,58.3,-63,49.2,-70.8,37.4C-78.5,25.5,-82.7,10.8,-81.7,-3.4C-80.7,-17.6,-74.6,-31.1,-65.8,-41.9C-57,-52.7,-45.5,-60.7,-33.4,-67.7C-21.2,-74.7,-8.6,-80.7,2.4,-84.8C13.3,-88.9,26.7,-91.1,39.9,-65.7Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className=" relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: scrollY > 1800 ? 1 : 0, y: scrollY > 1800 ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Roommate?</h2>
            <p className="text-xl mb-8 opacity-90" onMouseEnter={enterText} onMouseLeave={leaveText}>
              Join thousands of users who have found their ideal living situation through Roaming Roomies.
            </p>
            <Button
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
              onClick={() => (window.location.href = "/api/login")}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="">

          <div className=" border-gray-800  text-center text-sm">
            <p> {new Date().getFullYear()} Roaming Roomies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const Route = createFileRoute("/login")({
  component: LandingPage,
});
