# import requests
# accessToken = 'BQA2DhGjOq8utaWQsv-g7SQkVAHT-goc8_OlfQV-9HB6BbVaIKKnXpJAfGu27nFvVTNGbw8QziWfOx23gxs-9-ifEk5A75LTcTD63_BQJVswogacEXw'
# r = requests.get('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', auth=('Bearer',accessToken ))
# print(r.json())

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

lz_uri = 'spotify:artist:36QJpDe2go2KgaRleHCDTp'

# spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id= '6a78982078cb477d900388b0470ad9ad',
#                                                                               client_secret ='aecf03c3a2314acbac73e12b0c7fd4e4' ))
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

results = spotify.artist_top_tracks(lz_uri)

for track in results['tracks'][:10]:
    print('track    : ' + track['name'])
    print('audio    : ' + track['preview_url'])
    print('cover art: ' + track['album']['images'][0]['url'])
    print()