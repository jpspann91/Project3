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
        blur: 'blur 1s forwards',
        xup: 'xup 1s forwards',
        xdown: 'xdown 1s forwards',
        neSlide: 'neSlide 1s forwards',
        usSlide: 'usSlide 1s forwards',
        default: 'default 1s forwards',
        loginSlideUp: 'loginSlideUp 1s forwards',
        shiftleft: 'shiftleft .2s forwards',
        shiftright: 'shiftright .2s forwards',
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
        blur: {
          from: { opacity: 0},
          to: { opacity: .8},
        },
        xup: {
          from: {transform: 'translateY(1em) rotate(180deg) scale(0)',},
          to: { transform: 'translateY(0em) rotate(180deg) scale(1)' },
        },
        xdown: {
          from: {transform: 'translateY(-1em) rotate(0deg) scale(0)'},
          to: { transform: 'translateY(0em) rotate(0deg) scale(1)' },
        },
        neSlide: {
          from: {transform: 'translateX(-1em)', opacity: 0},
          to: { transform: 'translateX(0em)', opacity: 1 },
        },
        usSlide: {
          from: {transform: 'translateX(1em)', opacity: 0},
          to: { transform: 'translateX(0em)', opacity: 1 },
        },
        default: {
          from: {opacity: 0},
          to: { opacity: 1 },
        },
        loginSlideUp: {
          from: {transform: 'translateY(100vw)'},
          to: { transform: 'translateY(0vw)'},
        },
        shiftleft: {
          from: {transform: 'translateX(0vw)'},
          to: { transform: 'translateX(-100vw)'},
        },
        shiftright: {
          from: {transform: 'translateX(-100vw)'},
          to: { transform: 'translateX(0vw)'},
        },


      },
    },
  },
  plugins: [],
}
