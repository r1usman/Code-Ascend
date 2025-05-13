/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },

    extend: {
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      height: {
        screen: '100dvh',
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        charmonman: ['Charmonman'],
        sors: ["sors"],
        zentry: ['zentry', 'sanf-serif'],
        general: ['general', 'sanf-serif'],
        'circular-web': ['circular-web', 'sanf-serif'],
        'robert-medium': ['robert-medium', 'sanf-serif'],
        'robert-regular': ['robert-regular', 'sanf-serif'],
      },
      clipPath: {
        'custom': 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)', // Custom path
      },
      colors: {

        "text_primary": "#EA580C",
        "border_Col": "#303030",
        "btn-txt": '#2b2b2b',
        "btn-bg": "#3f3f3f",


        dark: {
          "bg-primary": "#0A0A0C",
          "bg-secondary4": "#1e1e1e",
          "bg-secondary3": "#121212",
          "bg-secondary2": "#171719",
          "bg-secondary1": "#1A1A1A",
          "text-color": "#FFFFFF",
          "text-muted": "#999999",
          "bg-overlay": "rgb(10, 10, 12)",
          "gray-border": "rgba(89, 88, 88, 0.633)",
        },
      }
    },
  },
  plugins: [require('tailwind-clip-path')],
};
