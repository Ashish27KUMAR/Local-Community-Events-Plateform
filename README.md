# Local Community Events Platform

A beautiful, responsive web application for discovering and joining local community events. Built as a Frontend Developer Intern assignment for StarLabs.

---

## 📸 Screenshot

> `Home` Section  

<img width="1892" height="867" alt="image" src="https://github.com/user-attachments/assets/319a8d28-ef98-4c64-9d64-a0e7b78a4dc0" />

<br/>
<br/>

> `Events` Section  

<img width="1894" height="928" alt="image" src="https://github.com/user-attachments/assets/d74b51c3-45ef-48e7-8283-01f5bbc8ec87" />

<br/>
<br/>

> `About` Section  

<img width="1899" height="929" alt="image" src="https://github.com/user-attachments/assets/e43fc024-60df-4dd7-b976-927d5c4cb528" />

<br/>
<br/>

> `Host Event` Section  

<img width="1896" height="926" alt="image" src="https://github.com/user-attachments/assets/7b8b88fa-7d29-45fb-828a-da6fbbe7992a" />





---

## 🚀 Features

- **Discover Events**: Browse through a curated list of local events across various categories.
- **Search & Filter**: Find exactly what you're looking for with real-time search and filters by Type, Location, and Date.
- **Detailed Event Pages**: View comprehensive information about events, including date, location, and host details.
- **RSVP System**: Join events seamlessly with a beautifully animated confirmation modal.
- **Create Event**: (Bonus Feature) Host your own event using a fully validated form.
- **Responsive Design**: Flawlessly adapts to any screen size, from mobile phones to high-res desktop monitors.
- **Premium UI/UX**: Built with modern aesthetics, glassmorphism, micro-animations, and a cohesive design system using Tailwind CSS V4.

## 🛠 Tech Stack

- **React 18** (via Vite)
- **React Router v7** (Routing)
- **Tailwind CSS v4** (Styling engine)
- **Context API** (State Management)
- **Lucide React** (Icons)
- **date-fns** (Date formatting & manipulation)

## 📦 Setup & Installation Guide

1. **Clone the repository** (if applicable) or download the files.

2. **Navigate to the project directory**:
   ```bash
   cd "Local Community Events Plateform"
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Open `http://localhost:5173` in your browser to view the application.

## 🎨 Design Decisions

- **Color Palette**: Selected a vibrant secondary-complementary palette (`primary` shades with deep violets and cool slate greys) to make the aesthetic pop.
- **Typography**: Chose `Inter` from Google Fonts for immense readability, a crisp modern feel, and sophisticated tracking.
- **Component Architecture**: Built reusable generic UI components (`Button`, `Card`, `Modal`, `Select`, `Input`, `Badge`) located in `src/components/ui/` to ensure a consistent design language.
- **Interactions**: CSS transitions and pseudo-classes were carefully used for delicate micro-interactions (e.g., hover-lifts on cards, focus rings on inputs, animated modal entrances via `tailwind-merge` and `clsx`).

## 📁 Project Structure

- `src/components/`: Reusable UI components and specific application components (Navbar, EventCard, Layout).
- `src/pages/`: Main view components (Home, EventDetails, CreateEvent).
- `src/context/`: Contains `EventContext.jsx` for global state.
- `src/data/`: Contains `events.json` mock data.

## ✅ Build for Production

To create a production-ready build:

```bash
npm run build
```

This will output optimized, minified files to the `dist` directory.

---
