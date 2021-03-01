import generate
import obtain
import store

# keyword = input('Please enter the keyword you would like to generate a review for: ')

# keyword = 'paintbrush'

# df = store.amazon(keyword)

# obtain.unsplash_image(keyword)

# generate.review(keyword, category='Arts and Crafts')

with open('/Users/samhornstein/gatsby-starter-blog-2/utils/input.txt', 'r') as f:
    lines = f.read().splitlines()
    lines_new = []

    for line in lines:
        line_split = line.split('\t')
        line_new = line_split[1]+'\n'
        lines_new.append(line_new)

with open('/Users/samhornstein/gatsby-starter-blog-2/utils/keywords.txt', 'w') as f:
    f.writelines(lines_new)
