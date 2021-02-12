from scrub import store
from generate import generate

keyword = 'telescope'

df = store(keyword)

generate(keyword)