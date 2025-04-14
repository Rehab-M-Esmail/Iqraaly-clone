import requests
from bs4 import BeautifulSoup
import os
import json
import xmltodict
# url = "https://librivox.org/api/feed/audiobooks"
# num_books = 5
# response = requests.get(url)
# print(response.status_code)
# soup = BeautifulSoup(response.content)
# print(soup.prettify())
# #data= soup.find_all('ul', attrs={"class":'browse-list'})
# data= soup.find_all('li', attrs={"class":'browse-result'})
# #data = soup.find('ul')
# print(data)


def Data_Extraction(num_books=30):
    base_url = "https://librivox.org/api/feed/audiobooks"
    params = {
        'format': 'json',
        'limit': num_books,
        'language': 'English'
    }
    response = requests.get(base_url, params=params)
    response.raise_for_status()
    data = response.json()
    print(data)
    return data

def Data_Storage():
    data= Data_Extraction()
    with open("audiobook.json", "w") as f:
        json.dump(data, f, indent=4)
    print("Data stored in audiobook.json")

if __name__ == "__main__":
    Data_Storage()
