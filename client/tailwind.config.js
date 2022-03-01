module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn .15s forwards',
        fadeOut: 'fadeOut .15s forwards',
        slideLeft: 'slideLeft .15s forwards',
        slideRight: 'slideRight .15s forwards',
        leftClose: 'leftClose .15s forwards',
        rightClose: 'rightClose .15s forwards',
        slidefarR: 'slidefarR .3s forwards',
        slidefarL: 'slidefarL .3s forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '.7' },
        },
        fadeOut: {
          from: { opacity: '.7' },
          to: { opacity: '0' },
        },
        slideLeft: {
          from: { transform: 'translateX(-100vw)' },
          to: { transform: 'translateX(0vw)' },
        },
        slideRight: {
          from: { transform: 'translateX(-100vw)' },
          to: { transform: 'translateX(-200vw)' },
        },
        slidefarR: {
          from: { transform: 'translateX(0vw)' },
          to: { transform: 'translateX(-200vw)' },
        },
        slidefarL: {
          from: { transform: 'translateX(-200vw)' },
          to: { transform: 'translateX(0vw)' },
        },
        leftClose: {
          from: { transform: 'translateX(0vw)' },
          to: { transform: 'translateX(-100vw)' },
        },
        rightClose: {
          from: { transform: 'translateX(-200vw)' },
          to: { transform: 'translateX(-100vw)' },
        },
      },
    },
  },
  plugins: [],
}
