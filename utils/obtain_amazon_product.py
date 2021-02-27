import base64
from bs4 import BeautifulSoup
import os
from pathlib import Path
import re
import requests
import time
 
# Function to extract Product Title
def get_title(soup):
     
    try:
        title = soup.find("span", attrs={"id":'productTitle'})
        title_value = title.string
        title_string = title_value.strip()
 
    except AttributeError:
        title_string = ""   
 
    return title_string
 
#Function to extract Seller
def get_seller(soup):
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
def get_price(soup):
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
def get_rating(soup):
    try:
        rating = soup.find("i", attrs={'class':'a-icon a-icon-star a-star-4-5'}).string.strip()
         
    except AttributeError:
        try:
            rating = soup.find("span", attrs={'class':'a-icon-alt'}).string.strip()
        except:
            rating = "" 
 
    return rating
 
# Function to extract Number of User Reviews
def get_review_count(soup):
    try:
        review_count = soup.find("span", attrs={'id':'acrCustomerReviewText'}).string.strip()
         
    except AttributeError:
        review_count = ""   
 
    return review_count
 
# Function to extract Availability Status
def get_availability(soup):
    try:
        available = soup.find("div", attrs={'id':'availability'})
        available = available.find("span").string.strip()
 
    except AttributeError:
        available = ""
 
    return available

# Function to extract Product Features
def get_features(soup):
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
def get_description(soup):
    try:
        description = soup.find("div", attrs={'id':'productDescription'})
        paragraphs = description.find_all("p").string
 
    except AttributeError:
        description = "Not Available"
 
    return description 

#Function to extract Product Link
def get_image(soup, title_string):
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

def obtain_reviews(soup):

    # Find all reviews
    try:
        print('Review query successful')
        reviews = soup.find_all('div', attrs={'id':re.compile('^customer_review')})
    except AttributeError:
        print('Review query unsuccessful')
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
            text = review.find('span', attrs={'data-hook':'helpful-vote-statement'}).string.split(' ')[0]
            if text == 'One':
                text=1
            number = int(text)
            helpful.append(number)
        except AttributeError:
            helpful.append(0)

    return ratings, review_text, helpful
    
 
if __name__ == '__main__':
 
    # Headers for request
    HEADERS = ({'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
                'Accept-Language': 'en-US'})
 
    # The webpage URL
    URL = "https://www.amazon.com/s?k=guitar&i=mi&ref=nb_sb_noss_1"
     
    # HTTP Request
    webpage = requests.get(URL, headers=HEADERS)

    # Soup Object containing all data
    soup = BeautifulSoup(webpage.content, "lxml")

    # Fetch links as List of Tag Objects
    links = soup.find_all("a", attrs={'class':'a-link-normal s-no-outline'})

    # Store the links
    links_list = []

    # Loop for extracting links from Tag Objects
    for link in links:
        links_list.append(link.get('href'))
        if len(links_list)==1:
            break

    # Loop for extracting product details from each link 
    for link in links_list:
        new_webpage = requests.get("https://www.amazon.com" + link, headers=HEADERS)
        new_soup = BeautifulSoup(new_webpage.content, "lxml")
         
        # Function calls to display all necessary product information
        print("Status code: " + str(new_webpage.status_code))
        print("Product Title =", get_title(new_soup))
        print("Product Price =", get_price(new_soup))
        print("Product Rating =", get_rating(new_soup))
        print("Number of Product Reviews =", get_review_count(new_soup))
        print("Availability =", get_availability(new_soup))
        print("Features =", get_features(new_soup))
        print("Description =", get_description(new_soup))
        # print("Image Link=", get_image(new_soup))
        print()
        print()

        time.sleep(5)