document.getElementById('button').addEventListener('click', () => {
  import('./lazyLoaded').then((lazyLoaded) => {
    lazyLoaded.default();
  });
});
