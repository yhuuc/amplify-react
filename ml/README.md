## Data Collection (Python)
*[See list of all songs used in this project here.](all_songs.csv)<br><br>*
The data was collected using Python scripts from two sources, Billboard chart and Spotify. The list of songs on [Billboard’s Year-End Chart in 2023](https://www.billboard.com/charts/year-end/hot-100-songs/) are defined as popular songs. Then through [Spotify API](https://developer.spotify.com/documentation/web-api), the albums of all popular songs are obtained, the songs in the albums with lowest Spotify popularity scores are defined as unpopular songs.<br><br>
With 53 pairs of popular vs unpopular songs coming from 53 albums, they make up a dataset of 106 records in total. There were supposed to be 200 songs in total, since the Billboard chart had 100 popular songs. However, for audio feature extraction and model training purposes, only those with accessible audio snippets from Spotify API are kept. 
## Feature Extraction (Essentia.js)
*[See training data here.](train.csv)<br><br>*
For consistency, the same algorithm needs to be used for both music feature extraction of training data and real-time feature extraction from audio files in the browser environment. The project used Essentia.js, a robust JavaScript library for audio analysis.<br>
Eight audio features were chosen as training features for machine learning model. They are BPM, loudness, key, scale, key strength, chords changes rate, chords key and chords number rate.
## Model Training (Python Keras with Tensorflow backend) & Model Inference (Tensorflow.js)
*See trained [classification](../public/billboard_model) and [regression](../public/spotify_model) models.<br><br>*
Two models were developed and used, one for Billboard presence and one for Spotify popularity. The models were trained in Python Keras with Tensorflow backend and converted to Tensorflow.js models, i.e. Json files, so they can be inferenced using tfjs in the browser to produce predictions.<br>
The first model used binary classification to predict whether a song would be present on Billboard charts. The second model used regression to predict Spotify popularity score, which ranges from 0 to 100. 
## Data Visualisation (tfvis)
All data visualisation capabilities, including tables of features and predictions and charts, are supported by tfvis.
