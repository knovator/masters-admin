/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  safelist: [
    {
      pattern: /^kms_\w+/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}