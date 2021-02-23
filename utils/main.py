from scrub import store
from generate import generate
from obtain_unsplash_image import obtain_unsplash_image

# keyword = input('Please enter the keyword you would like to generate a review for: ')

keyword = 'surfboard bags'

# df = store(keyword)

# obtain_unsplash_image(keyword)

generate(keyword, category='Sports')