import scrollReveal from 'scrollreveal';

export default {
  mounted(): void {
    scrollReveal().reveal('header', {
      distance: '100px',
      duration: 1000,
      easing: 'ease-out',
      interval: 100,
      opacity: 0,
      origin: 'top',
    });
  },
};
