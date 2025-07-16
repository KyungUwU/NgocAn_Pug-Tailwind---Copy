import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: [
    "./src/views/**/*.pug",
    "./src/components/**/*.pug",
    "./src/includes/**/*.pug"
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
    },
  },
  plugins: [
    forms,
    typography,
    aspectRatio,
  ],
};