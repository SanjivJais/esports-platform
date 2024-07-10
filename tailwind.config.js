/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F88B26",
        secondary: "#080F18",
        frameBG: "#05090F",
        offBlue: "#B2C7E9",
        secondaryLight: "#0E1825",
        inactive: "#6C81A1",
        offWhite: "#E2E2E2",
        gray: "#9C9C9C",
        dimText: "#696969",
        openStatus: "rgb(34, 197, 94)",
        ongoingStatus: "rgb(6, 182, 212)",
        finishedStatus: 'rgb(99, 102, 241)',
        abortedStatus: 'rgb(100 116 139)',
        adminColor: '#059669'
      },
      boxShadow: {
        'card': '0 10px 25px 3px #6C81A124',
        'modal': '0 5px 15px 3px #6C81A110',
        // 'button': '0 5px 15px 3px #F88B2620',
        'button': '0px 0px 20px 2px #F88B2680',
      },
    },
  },
  plugins: [],
}

