import base64
from datetime import date
import pandas as pd
import os

def generate(keyword, author='', date=date.today().strftime("%B %Y"), description='', category="Miscellaneous", special_status='', **kwargs):
    path = '/Users/samhornstein/gatsby-starter-blog-2/content/reviews/'+keyword+'/'
    df = pd.read_csv(path+'df_output.csv') 

    title_split = keyword.split(' ')
    title_list = []
    for word in title_split:
        title_list.append(word[0].upper()+word[1:])

    title = 'Best ' + ' '.join(title_list)


    # title= "Best " + keyword[0].upper()+keyword[1:]
    # author = "Sam"
    # date= "2015-05-01T22:12:03.284Z"
    # description= "Test description"
    article_type= "Review"
    # category= "Electronics"
    # special_status= "Trending"
    # image= df['Alias'].iloc[0]+'.'+df['Image Extension'].iloc[0]
    image = 'main_product_image.jpg'

    frontmatter = "---\ntitle: "+title+"\nauthor: "+author+"\ndate: "+date+"\ndescription: "+description+"\ntype: "+article_type+"\ncategory: "+category+"\nspecial_status: "+special_status+"\nimage: "+image+"\n---\n"

    if not os.path.exists(path):
        os.makedirs(path)

    f = open(path+'index.md', 'w')
    f.write(frontmatter)
    f.write('##Our Picks\n')

    for index, row in df.iterrows():
        f = open(path+'index.md', 'a')
        f.write('###'+row['Title']+'\n')
        f.write('######Sold by '+row['Seller']+'\n')
        f.write('!['+row['Title']+'](./'+row['Alias']+'.'+row['Image Extension']+')\n')
        f.write('###Product Info:\n')
        features = row['Features'].split("', '")
        features_length = len(features)-1
        for i, feature in enumerate(features):
            if i == 0:
                f.write("- "+feature[2:]+"\n")
            elif i == features_length:
                f.write("- "+feature[:-2]+"\n")
            else:
                f.write("- "+feature+"\n")

        # f.write('######Check Price\n')
        f.write('######[Check Price]('+"https://www.amazon.com"+row['Link']+')\n')

        with open(path+row['Alias']+'.'+row['Image Extension'], 'wb') as f:
            decoded_string = base64.b64decode(row['Image Data'])
            f.write(decoded_string)



if __name__ == "__main__":
    generate()