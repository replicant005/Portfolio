# Portfolio Website

A beautiful, cute-themed portfolio website built with React.

## Features

- ✨ Cute pastel color theme
- 📱 Fully responsive design
- 🎨 Smooth animations and transitions
- 🖼️ Project cards with image support
- 🚀 Built with React

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Adding Your Profile Image

To add your profile image to the hero section:

1. Add your profile image to `public/images/` folder (e.g., `profile.jpg`)
2. The image will automatically appear in the greeting section
3. If the image doesn't load, it will gracefully hide (the emoji will still show)

**Recommended image specs:**
- Square image (1:1 aspect ratio)
- Size: 200x200px or larger
- Format: JPG, PNG, or WebP
- File name: `profile.jpg` (or update the path in `src/components/Hero.js`)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Technologies Used

- React 18
- CSS3 with custom properties
- Google Fonts (Poppins & Comfortaa)

