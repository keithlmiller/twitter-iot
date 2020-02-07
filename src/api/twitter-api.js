export const getTweets = () => (
  fetch(`http://localhost:3000/tweets`, {
    method: 'get'
  })
  .then(response => response.json())
  .catch(err => {console.log('err', err)})
);

