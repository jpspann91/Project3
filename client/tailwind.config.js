module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn .2s forwards',
        fadeOut: 'fadeOut .2s forwards',
        slideLeft: 'slideLeft .2s forwards',
        slideRight: 'slideRight .2s forwards',
        leftClose: 'leftClose .2s forwards',
        rightClose: 'rightClose .2s forwards'
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
