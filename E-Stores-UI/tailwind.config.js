/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth:{
        '0.5':'0.5px',
        '1':'1px',
        '1.5':'1.5px'
      },
      fontFamily:{
        "one": '"Cardo", serif',
        "two": "Open Sans, sans-serif"
      },
      colors:{
        my_yellow: '#FFCE32',
        // my_yellow: '#efce69',
        text_b: '#7B590B',
        prussian_blue: '#000',
        // input_blue: "#E8F0FE",
        input_blue: "#F3F4F6",
        standard_black: 'rgb(51, 65, 85)',
        danger: '#FB4A40'
      },
      spacing: {
        '88per': '90%',
        'mid_screen': '1320px',
        '18': '4.4rem',
        '19':"4.5rem"
      },
      screens: {
        '1.2xl': '1350px'
      },
      animation: {
        wiggle: 'wiggle .5s ease-in-out',
        pop: 'pop .2s ease-in-out'
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': {transform: 'ratate(0deg)'}
        },
        pop : {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.6)'
          },
          '70%': { 
            transform: 'scale(1.1)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      boxShadow:{
        'even10': '0 0 10px #e3e3e3',
        'even20': '0 5px 20px #fff'
      },
      fontSize:{
        'md': '1.1rem'
      },
      width:{
        'sb': '23%',
        'sb2x': '30%',
        'content': '77%'
      },
      maxWidth: {
        '25pr': '25%'
      },
      minWidth: {
        '20pr': '20%'
      }
    },
  },
  plugins: [],
}

// font-size: 1.125rem/* 18px */;
//     line-height: 1.75rem/* 28px */;