This part is completed separate from the web app. It's used to develop the ML model only.
# Dataset
This project uses self-composed dataset for *popular vs. unpopular* song classification.

## Popular Songs
The list of popular songs alongside their ranking is obtained from [billboard Year-End Hot 100 charts](https://www.billboard.com/charts/year-end/hot-100-songs/). The data collection process includes data scraping (billboard), song data retrieval (Spotify API) and data selection. Code can be found [here.](/ml/data_collection.ipynb)

## Unpopular Songs
To creat contrast for better classification, unpopular songs are defined as the songs in the same album as popular songs but with **lowest Spotify popularity score (0-100)**, a parameter retrievable through [Spotify API](https://developer.spotify.com/documentation/web-api).

Take last year (2023)'s Top 1 song ***"Last Night"*** by *Morgan Wallen* for example, it belongs to the album ***One Thing At A Time***. In the same album, the song with the lowest Spotify popularity score is ***"Had It"***, and is labelled and included in the dataset as an unpopular song.  

In this way, a dataset with the same number of unpopular songs as popular ones is created. The main reason for using this method is to hopefully create distinct differences between popular and unpopular songs, so the model can classify more easily.

## Feature Extraction
To be able to produce prediction from audio files in the final web app using the same ML model, ML features need to be extracted from audio data directly. Audio data corresponding to each song is obtained through [Spotify API](https://developer.spotify.com/documentation/web-api) in the form of 30s song snippets.

Features are extracted using a powerful music analysis library Essentia.js
