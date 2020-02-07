import React from 'react';
import './Tweet.scss';

function Tweet({ user, text, }) {
  
  return (
    <div className='tweet'>
      <h4 className='tweet__user'>{user} says:</h4>
      <p className='tweet__text'>"{text}"</p>
    </div>
  );
}

export default Tweet;
