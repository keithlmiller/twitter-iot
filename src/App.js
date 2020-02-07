import React, { useState, useEffect } from 'react';
import { getTweets } from './api/twitter-api';
import Tweet from './components/Tweet/Tweet';
import Chart from './components/Chart/Chart';
import './App.scss';

function App() {
  const [tweets, setTweets] = useState([]);
  const [topWords, setTopWords] = useState([]);
  const [isErrored, setIsErrored] = useState(false);

  const isNotValid = (word) => {
    const isTag = RegExp('^@').test(word)
    const isUrl = RegExp('^http').test(word);
    const isRT = word === 'RT';
    const isSpecChar = word.length === 1 && RegExp(/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g).test(word); 

    return isTag || isUrl || isRT || !word.length || isSpecChar;
  }

  const getWordCounts = (tweetsArray) => {
    let wordsMap = {};
      for (let tweet of tweetsArray) {
        const words = tweet.text.split(' ');

        for (let word of words) {
          if (isNotValid(word)) break;
          if (wordsMap[word]) {
            wordsMap[word]++;
          } else {
            wordsMap[word] = 1;
          }
        }
      }

      return wordsMap;
  }

  useEffect(() => {
    getTweets().then((response) => {
      setTweets(response.statuses);
    }).catch(() => {
      setIsErrored(true);
    })
  }, [])

  useEffect(() => {
    if (tweets && tweets.length) {
      let wordsMap = getWordCounts(tweets);

      let sortableWords = [];
      for (let word in wordsMap) {
        sortableWords.push([word, wordsMap[word]]);
      }

      sortableWords.sort(function(a, b) {
        return b[1] - a[1];
      });

      setTopWords(sortableWords.slice(0, 20))
    }
  }, [tweets])

  if (isErrored) return <div>There was an error fetching Tweets, reload to try again or check your connection</div>;

  return (
    <div className='twitter-iot'>
      {!!topWords.length ? (
        <>
          <div className='twitter-iot__intro'>
            <h1>The Buzz Around #iot</h1>
            <h6>(Internet of Things)</h6>
            <p>Browse 100 recent tweets with hashtag #iot and see which words are used most often in that set.</p>
          </div>
          <div className='twitter-iot__list'>
            {tweets.map((tweet) => (<Tweet user={tweet.user.screen_name} text={tweet.text} key={tweet.id} />))}
          </div>

          <div className='twitter-iot__chart'>
            {!!topWords.length && (
              <Chart words={topWords} width={350} height={700} />
            )}
          </div>
        </>
      ): (
        <div className='twitter-iot__loading'>Loading...</div>
      )}
    </div>
  );
}

export default App;
