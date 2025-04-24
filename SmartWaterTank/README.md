# RHEOSYNE Smart Water Tank App

This is a web-based mobile application for the RHEOSYNE smart water tank system, designed for class presentations. The app simulates real-time water quality monitoring, displays an animated water level, and allows users to order water or subscribe to a filter replacement service.

## Features

- **Home Page**: Animated water tank with real-time quality metrics
- **Order Page**: Water ordering with quantity selection and mock payment
- **Subscription Page**: Filter replacement subscription service
- **Settings Page**: Theme toggle and notification preferences

## Technical Details

- Built with HTML5, CSS3, and vanilla JavaScript
- Mobile-responsive design (optimized for devices up to 600px width)
- Animations for water level, buttons, and modals
- Mock data simulation with random variations
- Theme switching (light/dark mode)

## How to Run

1. Clone the repository
2. Open `index.html` in a web browser
3. For the best experience, use Chrome's mobile device emulator (DevTools > Toggle Device Toolbar)

## Color Scheme

- Deep blue (#003087) for headers/backgrounds
- Light blue (#00A1D6) for buttons and accent colors
- White (#FFFFFF) for text and card backgrounds

## Structure

- `index.html`: Home page with water level visualization and metrics
- `order.html`: Water ordering interface
- `subscription.html`: Filter subscription management
- `settings.html`: App settings and preferences
- `styles.css`: Styling and animations
- `script.js`: Logic for simulating data and user interactions
- `assets/`: Logo and water tank SVG images

## Design Notes

- Roboto font used for text (via Google Fonts)
- Card-based UI with rounded corners and shadows
- Animated water tank with wave effect
- Interactive toggles for settings
- Popup modals for order/subscription confirmations
