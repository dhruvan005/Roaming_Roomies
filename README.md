# Roaming Roomies

![Roaming Roomies Leanding Page](https://res.cloudinary.com/dhruvandev/image/upload/RR_landing_page_puhrzi.png)

## 🏠 About

Roaming Roomies is a modern platform designed to connect compatible roommates based on lifestyle, habits, and preferences. Our smart matching algorithm helps users find their perfect living situation with just a few clicks.

## ✨ Features

### User-Focused Experience
- **Smart Matching**: Connect with roommates who share your social preferences, lifestyle habits, and daily routines
- **Detailed User Profiles**: Create comprehensive profiles with preferences for sleep schedules, cleanliness standards, dietary habits, and more


### Intuitive Interface
- **Modern UI/UX**: Clean, responsive design with interactive elements
- **Custom Cursor Effects**: Enhanced user experience with context-aware cursor animations
- **Animated Backgrounds**: Subtle wave and line animations that create visual interest without distraction

### Roommate Finding Process
1. **Create Your Profile**: Share your lifestyle, habits, and preferences
2. **Browse Listings**: Explore available rooms that match your criteria


### Property Listing Process
1. **List Your Space**: Create detailed listings with photos, amenities, and house rules
2. **Set Preferences**: Specify the type of roommate you're looking for
3. **Review & Connect**: Review applicants and find your perfect match

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Routing**: TanStack Router (formerly React Router)
- **UI Components**: 
  - Radix UI for accessible components
  - Ant Design for advanced UI elements
  - Custom UI components with Tailwind CSS
- **Styling**: Tailwind CSS 4 with custom animations
- **Animations**: Framer Motion for smooth, interactive animations
- **State Management**: React Query for server state
- **Development**: Vite for fast development and building

### Backend
- **Framework**: Hono.js - a lightweight, high-performance web framework
- **Runtime**: Bun - a fast JavaScript runtime and package manager
- **Authentication**: Kinde Auth for secure, OAuth 2.0 compliant authentication
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API**: RESTful API architecture

### DevOps
- **Deployment**: Static site hosting with server-side rendering
- **Build System**: Vite build system for optimized production builds

## 📊 Data Model

The platform uses a comprehensive data model to facilitate effective roommate matching:

- **User Profiles**: Detailed information about users including:
  - Personal details (name, age, gender, occupation)
  - Lifestyle preferences (sleep schedule, cleanliness level)
  - Habits (smoking, alcohol, dietary preferences)
  - Social traits and interests
  - Housing preferences (desired room type, max rent, preferred locations)

## 🚀 Getting Started

### Prerequisites
- Bun (JavaScript runtime and package manager)
- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/roaming-roomies.git
cd roaming-roomies
```

2. Install dependencies
```sh
# Install client dependencies
cd client
bun install

# Install server dependencies
cd ../server
bun install
```

3. Set up environment variables
```sh
# Create .env files in both client and server directories
# See .env.example for required variables
```

4. Start development servers
```sh
# Start client
cd client
bun run dev

# Start server
cd ../server
bun run dev
```

5. Open your browser
```
Client: http://localhost:3001
Server: http://localhost:3000
```




## 🙏 Acknowledgements

- [Kinde Auth](https://kinde.com/) for authentication
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Hono.js](https://hono.dev/) for the backend framework
- [Drizzle ORM](https://orm.drizzle.team/) for database operations

