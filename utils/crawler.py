import generate
import obtain
import pandas as pd
import store

# keyword = input('Please enter the keyword you would like to generate a review for: ')

# keyword = 'paintbrush'

# df = store.amazon(keyword)

# obtain.unsplash_image(keyword)

# generate.review(keyword, category='Arts and Crafts')

keywords = pd.read_csv('/Users/samhornstein/gatsby-starter-blog-2/utils/keywords.csv', header=None, names=['Keyword', 'Category'])

for index, row in keywords.iterrows():
    df = store.amazon(row['Keyword'])
    obtain.unsplash_image(row['Keyword'])
    generate.review(row['Keyword'], category=row['Category'])