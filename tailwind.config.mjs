import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./src/views/**/*.pug",
    "./src/components/**/*.pug",
    "./src/includes/**/*.pug"
  ],
    safelist: [
    'hover:text-orange-600',
    'text-orange-600',
    'bg-orange-500',
    'bg-orange-600',
    'bg-orange-700',
    'text-orange-600',
    'hover:bg-orange-600',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#FF6600',     // Màu thương hiệu chính
        secondary: '#1e1e1e', // Màu phụ (text dark)
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      gap: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
      },
    },
  },
  plugins: [
    forms,
    typography,
    aspectRatio,
  ],
};