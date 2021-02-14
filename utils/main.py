from scrub import store
from generate import generate
from obtain_unsplash_image import obtain_unsplash_image

keyword = 'plants'

df = store(keyword)

obtain_unsplash_image(keyword)

generate(keyword, date='December 2020', special_status="Trending", category='Garden', author='Kelsey Landon')