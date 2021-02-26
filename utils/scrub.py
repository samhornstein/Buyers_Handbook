from bs4 import BeautifulSoup
import requests
import pandas as pd
from pathlib import Path
import numpy as np
import obtain_amazon_product
from obtain_unsplash_image import obtain_unsplash_image
import os
import re
import time

def store(keyword):

    # Headers for request
    HEADERS = ({'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
                'Accept-Language': 'en-US'})
 
    keyword.replace(" ", "+")

    # The webpage URL
    URL = "https://www.amazon.com/s?k=" + keyword + "&ref=nb_sb_noss_2"
     
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
        if len(links_list) == 3:
            break
 
    df = pd.DataFrame(columns=['Title', 'Alias', 'Link', 'Seller', 'Price', 'Rating', 'Review Count', 'Availability', 'Features', 'Image Data', 'Image Extension'])
    df_reviews = pd.DataFrame(columns=['Title', 'Rating', 'Helpful', 'Text'])

    # Loop for extracting product details from each link 
    for link in links_list:

        print("fetching...")
 
        new_webpage = requests.get("https://www.amazon.com" + link, headers=HEADERS)
 
        new_soup = BeautifulSoup(new_webpage.content, "lxml")

        title = obtain_amazon_product.get_title(new_soup)
        alias = re.sub(r'[^a-zA-Z0-9_]', '', title[:10])
        price = obtain_amazon_product.get_price(new_soup)
        seller = obtain_amazon_product.get_seller(new_soup)
        rating = obtain_amazon_product.get_rating(new_soup)[:-15]
        review_count = obtain_amazon_product.get_review_count(new_soup)[:-8]
        availability = obtain_amazon_product.get_availability(new_soup)
        features = obtain_amazon_product.get_features(new_soup)
        image_data, image_extension = obtain_amazon_product.get_image(new_soup, alias)
        ratings, review_text, helpful = obtain_amazon_product.obtain_reviews(new_soup)

        print("Fetched " + title)

        df_reviews = df_reviews.append({'Title': [title]*len(ratings), 'Rating': ratings, 'Helpful': helpful, 'Text': review_text}, ignore_index=True)

        df = df.append({'Title': title, 'Alias': alias, 'Link': link, 'Seller': seller, 'Price': price, 'Rating': rating, 'Review Count': review_count, 'Availability': availability, 'Features': features, 'Image Data': image_data, 'Image Extension': image_extension}, ignore_index=True)

        df['Price'].replace('', np.nan, inplace=True)
        df.replace('Not Available', np.nan, inplace=False)
        df.dropna(inplace=True)
        df.drop_duplicates(subset=['Title'], inplace=True)
        df.drop_duplicates(subset=['Image Data'], inplace=True)
        df.drop_duplicates(subset=['Seller'], inplace=True)

        if len(df.index) == 5:
            break

        time.sleep(5)

    df = df.head()
    base_path = Path(__file__).parent
    path = '/Users/samhornstein/gatsby-starter-blog-2/content/reviews/'+keyword+'/'

    if not os.path.exists(path):
        os.makedirs(path)

    df.to_csv(path+'df_output.csv')
    df_reviews.to_csv(path+'reviews_data.csv')

    return df

if __name__ == '__main__':
    df = store("guitar")
    print(df)