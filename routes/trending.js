const express = require('express');
const router = express.Router();
const Video = require('../models/videos');

router.get('/', async (req, res) => {

   try {

      // My Videos List

      const myVideos = await Video.find({});
      const myVideosList = myVideos.map(video => {
         return `https://www.youtube.com/watch?v=${video.videoID}`;
      });

      // Youtube Videos List
      
      const url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&key=AIzaSyC0m-M0VsJPThT8MduBS-uFzDXeduPyBfk&maxResults=50';
      const response = await fetch(url);
      const youtubeMostPopular = await response.json();
      const youtubeMostPopularList = youtubeMostPopular.items.map(item => ({
         title: item.snippet.title,
         description: item.snippet.description
      }));

      // AI Section (Testing)
      
      message =   `Analyze the following list of 50 YouTube videos (use title and description), then assign at least 2 relevant keywords
                   for each video and then return only the string of the 50 keyword pairs separated by comma.`;
      
      const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCU2ZuEIJRNuwYB719XCC8Pbvwlzvzsjbc';
      geminiResponse = await fetch(geminiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            contents: [
               {
                  parts: [
                     {
                        text: message + JSON.stringify(youtubeMostPopularList)
                     }
                  ]
               }
            ]
         })
      });

      geminiData = await geminiResponse.json();
      keywordsList = geminiData.candidates[0].content.parts[0].text;

      message =   `Using the first list of keywords, rank the second list using the keywords as a guide, and return ONLY a ranked
                   list of URLS separated by commas. You may only change the order of the second list for ranking purposes.`;

      geminiResponse = await fetch(geminiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            contents: [
               {
                  parts: [
                     {
                        text: message + JSON.stringify(keywordsList) + JSON.stringify(myVideosList)
                     }
                  ]
               }
            ]
         })
      });

      geminiData = await geminiResponse.json();
      const sortedList = geminiData.candidates[0].content.parts[0].text;

      res.send(sortedList);

   } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Failed to fetch data');
   }
});

module.exports = router;