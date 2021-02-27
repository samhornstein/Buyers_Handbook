import generate
import obtain
import store

# keyword = input('Please enter the keyword you would like to generate a review for: ')

keyword = 'curtains'

# df = store.amazon(keyword)

# obtain.unsplash_image(keyword)

generate.review(keyword, category='Home')