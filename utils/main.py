from scrub import store
from generate import generate

keyword = 'dog collar'

df = store(keyword)

generate(keyword, special_status="Trending")