/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f4eadb',
        soot: '#e8d7c1',
        cream: '#2b1b16',
        parchment: '#fffaf2',
        brick: '#a64332',
        ember: '#c45f43',
        brass: '#8b642d',
        sage: '#627357',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '30%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-38px) scaleX(1.7)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        steam: 'steam 4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
