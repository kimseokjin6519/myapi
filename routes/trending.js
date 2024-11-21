const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

   const url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&key=AIzaSyC0m-M0VsJPThT8MduBS-uFzDXeduPyBfk&maxResults=25';

   try {
      const response = await fetch(url);
      const data = await response.json();

      const extract = data.items.map(item => ({
         title: item.snippet.title,
         description: item.snippet.description
      }));

      const message = 'This is a list of YouTube videos. Please extrapolate data and return popular media content as keywords only.\n';

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
                        text: message + JSON.stringify(extract) // Sending extracted YouTube data as JSON
                     }
                  ]
               }
            ]
         })
      });

      const geminiData = await geminiResponse.json();

      // Send the Gemini response back to the client
      res.json(geminiData);
   } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Failed to fetch data');
   }
});

module.exports = router;