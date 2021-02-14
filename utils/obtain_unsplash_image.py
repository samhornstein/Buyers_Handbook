from bs4 import BeautifulSoup
import requests

def obtain_unsplash_image(keyword):

    # Headers for request
    HEADERS = ({'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
                'Accept-Language': 'en-US'})
 
    keyword.replace(" ", "+")

    # The webpage URL
    URL = "https://unsplash.com/s/photos/" + keyword
     
    # HTTP Request
    webpage = requests.get(URL, headers=HEADERS)
 
    # Soup Object containing all data
    soup = BeautifulSoup(webpage.content, "lxml")
 
    # Fetch links as List of Tag Objects
    tag = soup.find("img", attrs={'class':'_2UpQX'})
    image_url = tag['srcset'].split(' ')[-2]
    print(image_url)
 
    new_webpage = requests.get(image_url, headers=HEADERS)

    path = '/Users/samhornstein/gatsby-starter-blog-2/content/reviews/'+keyword

    with open(path+'/main_product_image.jpg', 'wb') as handle:
        response = requests.get(image_url, stream=True)

        if not response.ok:
            print(response)

        for block in response.iter_content(1024):
            if not block:
                break

            handle.write(block)

if __name__ == "__main__":
    obtain_unsplash_image('tea')