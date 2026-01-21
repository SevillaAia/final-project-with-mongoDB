# The Ark - Vite + React Application

A modern, fully-featured React application built with Vite, featuring a complete routing system, multiple layouts, and FontAwesome icons.

## 🚀 Project Structure

```
the-ark/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar with routing links
│   │   ├── Footer.jsx      # Footer with contact info and social links
│   │   └── Banner.jsx      # Reusable banner component with icons
│   │
│   ├── layouts/            # Layout components for different sections
│   │   ├── MainLayout.jsx  # Main layout with navbar and footer
│   │   ├── AuthLayout.jsx  # Authentication pages layout
│   │   └── AdminLayout.jsx # Admin dashboard layout
│   │
│   ├── pages/              # Application pages
│   │   ├── Home.jsx        # Home page with features
│   │   ├── About.jsx       # About us page
│   │   ├── Services.jsx    # Services page
│   │   ├── Donate.jsx      # Donation page with form
│   │   ├── Login.jsx       # Login page
│   │   └── Register.jsx    # Registration page
│   │
│   ├── App.jsx             # Main app component with routing
│   ├── App.css             # Application styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Application entry point
│
├── public/                 # Static assets
├── package.json           # Project dependencies
└── vite.config.js        # Vite configuration
```

## 📦 Dependencies

### Core Dependencies
- **React 19.2.0** - UI library
- **React DOM 19.2.0** - React rendering for web
- **React Router DOM 7.12.0** - Client-side routing
- **Vite 7.2.4** - Build tool and dev server

### FontAwesome Icons
- `@fortawesome/fontawesome-svg-core` - Core FontAwesome library
- `@fortawesome/free-solid-svg-icons` - Solid style icons
- `@fortawesome/free-regular-svg-icons` - Regular style icons
- `@fortawesome/free-brands-svg-icons` - Brand icons (social media)
- `@fortawesome/react-fontawesome` - React component for FontAwesome

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd the-ark
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173/`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

### Components
- **Navbar**: Responsive navigation with links to all pages
- **Footer**: Contact information and social media links with FontAwesome icons
- **Banner**: Reusable banner component with customizable title and subtitle

### Layouts
- **MainLayout**: Standard layout with navbar and footer (used for Home, About, Services, Donate)
- **AuthLayout**: Centered authentication layout (used for Login, Register)
- **AdminLayout**: Sidebar layout for admin pages (Dashboard, Users, Settings)

### Pages
1. **Home**: Landing page with feature cards
2. **About**: Information about the organization
3. **Services**: Overview of available services
4. **Donate**: Donation form with preset amounts
5. **Login**: User login form
6. **Register**: User registration form

### Routing Structure
```
/ (MainLayout)
├── / - Home page
├── /about - About page
├── /services - Services page
└── /donate - Donate page

/ (AuthLayout)
├── /login - Login page
└── /register - Register page

/admin (AdminLayout)
├── /admin/dashboard - Admin dashboard
├── /admin/users - User management
└── /admin/settings - Settings
```

## 🎨 Styling

The application uses custom CSS with:
- Responsive design with media queries
- Modern gradient backgrounds
- Card-based layouts
- Smooth transitions and hover effects
- Mobile-friendly navigation

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navbar links in `src/components/Navbar.jsx`

### Adding New Icons
Import icons from FontAwesome packages:
```javascript
import { faIconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<FontAwesomeIcon icon={faIconName} />
```

## 🤝 Contributing

This is an Ironhack final project for Full Stack Development with MongoDB.

## 📄 License

This project is created for educational purposes.
