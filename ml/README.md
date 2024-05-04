# Dataset
This project uses self-composed dataset for *popular vs. unpopular* song classification.

## Popular Songs
The list of popular songs alongwith their ranking is obtained from [billboard Year-End Hot 100 charts](https://www.billboard.com/charts/year-end/hot-100-songs/). The data collection process including data scraping (billboard), song data retrieval (Spotify API) and data selection. Code can be found [here.](/ml/data_collection.ipynb)

## Unpopular Songs
To creat contrast for better classification, unpopular songs are defined as the songs in the same album as popular songs but with **lowest Spotify play count**.

Take last year (2023)'s Top 1 song ***"Last Night"*** by *Morgan Wallen* for example, the song in the same album *One Thing At A Time* but with lowest Spotify play count is a song titled ***"Had It"***, and is defined in this dataset as an unpopular song.

This way, a list of the same number of unpopular songs as popular ones is created. (I got 500 popular songs from billboard, and got 500 corresponding unpopular songs using this method.)

The retrival of such list is realized through [Spotify API](https://developer.spotify.com/documentation/web-api).

## Feature Extraction
To be able to produce prediction from audio files, ML features are extracted from audio data directly. Audio data corresponding to each song is obtained through [Spotify API](https://developer.spotify.com/documentation/web-api) in the form of 30s song snippets.

Features are extracted using
