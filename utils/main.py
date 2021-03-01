import generate
import obtain
import store

# keyword = input('Please enter the keyword you would like to generate a review for: ')

keyword = 'coconut oil'

# df = store.amazon(keyword)

# obtain.unsplash_image(keyword)

generate.review(keyword, category='Food')