/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lc-primary': '#3B82F6', // Modern Blue
        'lc-accent': '#0EA5E9',  // Sky Blue Accent
        'lc-secondary': '#1E293B', // Slate for text
        'lc-surface': '#F8FAFC', // Soft off-white background
        'lc-surface-warm': '#FEFEFE', // Warm white
        'lc-surface-soft': '#F1F5F9', // Soft gray-white
        blue: {
          25: '#f0f7ff',
          75: '#dbeafe',
          125: '#bfdbfe',
          150: '#93c5fd',
          175: '#60a5fa',
          250: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
