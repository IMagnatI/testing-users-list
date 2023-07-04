/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(232, 41, 62, 1)',
        secondary: '#007df7',
        accent: '#ff735e',
        title: '#1b1b1d',
        subtitle: 'rgba(29, 29, 31, 0.4)',
        text: '#1b1b1d',
        icon: '#1b1b1d',
        titleInverse: '#ffffff',
        textInverse: 'rgba(255, 255, 255, 0.4)',
        bgPrimary: '#ffffff',
        bgSecondary: '#f5f8f8',
        bgDark: '#1e293d',
        bgDarkAccent: '#20364c',
        border: 'rgba(207, 207, 207, 1)',
        shadow: 'rgba(0, 0, 0, 0.15)',
        overlay: 'rgba(0, 0, 0, 0.5)',
        hover: '#2f3439',
        color1: '#35404a',
        color2: '#4f6279',
        color3: '#0098d8',
        color4: '#ff4f49',
        color5: '#ff7a2f',
        color6: '#ffc700',
        color7: '#34dca2',
        color8: '#00ada9',
        green44: '#449571',
        graye6: '#e6e8eb',
        grayf5: '#f5f7f9',
        gray3a: '#3a4149',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
