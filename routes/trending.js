const express = require('express');
const router = express.Router();
const Video = require('../models/videos');

router.get('/', async (req, res) => {

   try {

      const myVideos = await Video.find({});
      const myVideosList = myVideos.map(video => {
         return `https://www.youtube.com/watch?v=${video.videoID}`;
      });

      const url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&key=AIzaSyC0m-M0VsJPThT8MduBS-uFzDXeduPyBfk&maxResults=25';
      const response = await fetch(url);
      const youtubeMostPopular = await response.json();
      const youtubeMostPopularList = youtubeMostPopular.items.map(item => ({
         title: item.snippet.title,
         description: item.snippet.description
      }));

      const message =   `Take no more than 5 seconds to return a result or return Busy. Please try again in a few moments. Analyze the first list of 
                         YouTube videos (use title and description) to discover why they are popular, then return only a string of popular keywords
                         separated by comma from analysis.
                         `;

      const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCU2ZuEIJRNuwYB719XCC8Pbvwlzvzsjbc';
      const geminiResponse = await fetch(geminiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            contents: [
               {
                  parts: [
                     {
                        text: message + JSON.stringify(youtubeMostPopularList) + JSON.stringify(myVideosList)// Sending extracted YouTube data as JSON
                     }
                  ]
               }
            ]
         })
      });

      const geminiData = await geminiResponse.json();

      res.send(geminiData);

   } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Failed to fetch data');
   }
});

module.exports = router;