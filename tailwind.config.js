/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005435",
        secondary:"#E0A961",
        customBlack:"#333132",
        grayDark:"#B1B3B6",
        gold:"#E0A961"
      },
       fontFamily: {
         poppins: ["Poppins", "sans-serif"],
        // Add more custom font families as needed
      },
       fontWeight: {
        normal: '400', // explicitly setting normal to 400
      },
    },
  
  },
  plugins: [],
}
