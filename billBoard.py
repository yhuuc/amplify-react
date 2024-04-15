from bs4 import BeautifulSoup
from urllib.request import urlopen

url = "https://www.billboard.com/charts/year-end/hot-100-songs/"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")
#text = soup.get_text().replace("\n","")
#song_names = soup.find_all(class="")
print(soup.find_all('h3'))