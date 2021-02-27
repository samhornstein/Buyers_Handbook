import base64
from bs4 import BeautifulSoup
import os
from pathlib import Path
import re
import requests
import time
 
# Function to extract Product Title
def amazon_title(soup):
     
    try:
        title = soup.find("span", attrs={"id":'productTitle'})
        title_value = title.string
        title_string = title_value.strip()
 
    except AttributeError:
        title_string = ""   
 
    return title_string
 
#Function to extract Seller
def amazon_seller(soup):
    try:
        seller = soup.find("a", attrs={'id':'bylineInfo'})
        seller_value = seller.string
        if seller_value.startswith('Brand'):
            seller_string = seller_value.strip()[7:]
        else:
            seller_string = seller_value.strip()[10:-6]
    
    except AttributeError:
        seller_string = ''

    return seller_string

# Function to extract Product Price
def amazon_price(soup):
    try:
        price = soup.find("span", attrs={'id':'priceblock_ourprice'}).string.strip()
    except AttributeError:
        try:
            # If there is some deal price
            price = soup.find("span", attrs={'id':'priceblock_dealprice'}).string.strip()
        except:     
            price = ""  
 
    return price
 
# Function to extract Product Rating
def amazon_rating(soup):
    try:
        rating = soup.find("i", attrs={'class':'a-icon a-icon-star a-star-4-5'}).string.strip()
         
    except AttributeError:
        try:
            rating = soup.find("span", attrs={'class':'a-icon-alt'}).string.strip()
        except:
            rating = "" 
 
    return rating
 
# Function to extract Number of User Reviews
def amazon_review_count(soup):
    try:
        review_count = soup.find("span", attrs={'id':'acrCustomerReviewText'}).string.strip()
         
    except AttributeError:
        review_count = ""   
 
    return review_count
 
# Function to extract Availability Status
def amazon_availability(soup):
    try:
        available = soup.find("div", attrs={'id':'availability'})
        available = available.find("span").string.strip()
 
    except AttributeError:
        available = ""
 
    return available

# Function to extract Product Features
def amazon_features(soup):
    try:
        features = soup.find("div", attrs={'id':'featurebullets_feature_div'})
        features = soup.find("div", attrs={'id':'feature-bullets'})
        features = features.find("ul")
        features = features.find_all("li", attrs={'id':''})

        features_final = []

        for feature in features:
            features_final.append(feature.find("span").string.strip())

    except AttributeError:
        features_final = "Not Available"
 
    return features_final   

# Function to extract Product Description
def amazon_description(soup):
    try:
        description = soup.find("div", attrs={'id':'productDescription'})
        paragraphs = description.find_all("p").string
 
    except AttributeError:
        description = "Not Available"
 
    return description 

#Function to extract Product Link
def amazon_image(soup, title_string):
    try:
        # path = '/Users/samhornstein/gatsby-starter-blog-2/content/reviews/'+title_string
        div = soup.find("div", attrs={'class':'imgTagWrapper'})

        img_src = div.find("img")['src']

        if img_src.startswith('https'):
            base64_string = img_src[:-4]
            file_type=img_src[-3:]
        else:
            base64_string = div.find("img")['src'][24:]
            file_type = div.find("img")['src'][12:16]

        # relative_path = title_string+'.'+file_type
        # file_path = path+'/'+relative_path

    except AttributeError:
        base64_string = b''
        file_type = "unknown"

    return base64_string, file_type

def amazon_reviews(soup):

    # Find all reviews
    try:
        reviews = soup.find_all('div', attrs={'id':re.compile('^customer_review')})
    except AttributeError:
        reviews=""

    ratings=[]
    review_text=[]
    helpful=[]

    for review in reviews:
        # Find ratings
        try:
            rating=int(review.find('span', attrs={'class':'a-icon-alt'}).string[0])
            ratings.append(rating)
        except AttributeError:
            ratings.append("")

        # Find review text
        try:
            text = review.find('div', attrs={'data-hook':'review-collapsed'})
            review_text.append(text.find('span').text)
        except AttributeError:
            review_text.append("")

        # Find helpful
        try:
            text = review.find('span', attrs={'data-hook':'helpful-vote-statement'}).string.split(' ')[0].replace(',','')
            if text == 'One':
                text=1
            number = int(text)
            helpful.append(number)
        except AttributeError:
            helpful.append(0)

    return ratings, review_text, helpful

def unsplash_image(keyword):

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
    print(f'Unsplash URL: {image_url}')
 
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
    
 
if __name__ == '__main__':
    unsplash_image('curtains')