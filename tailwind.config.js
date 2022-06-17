module.exports = {
  content: ["./**/*.{html,js,ts,tsx,jsx}"],
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
