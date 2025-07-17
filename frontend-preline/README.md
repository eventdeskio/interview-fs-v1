# Frontend Preline

This project is a React application using Preline UI components, created as a replacement for the daisyUI setup in frontend-daisy.

## Features

- **Preline UI**: Modern UI components built on top of Tailwind CSS
- **React 18**: Latest React features
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Key Differences from daisyUI

- **Component Library**: Uses Preline instead of daisyUI
- **JavaScript Integration**: Preline requires importing the JavaScript module for interactive components
- **Styling Approach**: Preline uses utility classes similar to daisyUI but with different naming conventions
- **Plugin Configuration**: Uses `preline/plugin` in Tailwind config instead of daisyUI plugin

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend-preline/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```
```

Let's verify the setup by checking if everything is in place:

```bash
ls -la frontend-preline/
```

```bash
ls -la frontend-preline/src/
```

Now let's test if the development server starts correctly:

```bash
cd frontend-preline && npm run dev &
```

```bash
sleep 3 && pkill -f "vite"