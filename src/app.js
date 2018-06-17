const string = 'HELLO WORLD';

let [b, , c] = [1, 2, 3, 4, 5];
console.log(string, b, c);

document.getElementById('button').addEventListener('click', () => {
  import('./lazyLoaded').then((lazyLoaded) => {
    lazyLoaded.default();
  })
});
