import base64
from colorama import Fore, Style
from datetime import date
import os
import pandas as pd

def review(keyword, author='', date=date.today().strftime("%B %Y"), description='', category="Miscellaneous", special_status='', **kwargs):
    path = '/Users/samhornstein/gatsby-starter-blog-2/content/reviews/'+keyword+'/'
    df = pd.read_csv(path+'df_output.csv') 

    title_split = keyword.split(' ')
    title_list = []
    for word in title_split:
        title_list.append(word[0].upper()+word[1:])

    title = 'Best ' + ' '.join(title_list)

    article_type= "Review"

    image = 'main_product_image.jpg'

    frontmatter = "---\ntitle: "+title+"\nauthor: "+author+"\ndate: "+date+"\ndescription: "+description+"\ntype: "+article_type+"\ncategory: "+category+"\nspecial_status: "+special_status+"\nimage: "+image+"\n---\n"

    if not os.path.exists(path):
        os.makedirs(path)

    f = open(path+'index.md', 'w')
    f.write(frontmatter)
    # f.write('##Our Picks\n')

    for index, row in df.iterrows():
        # Check to see if features are available, if not skip to next product
        features = row['Features'].split("', '")
        if features[0] == 'Not Available':
            continue
        f = open(path+'index.md', 'a')
        f.write('###'+row['Title']+'\n')
        # try:
        #     f.write('######Sold by '+row['Seller']+'\n')
        # except:
        #     print(Fore.YELLOW+'Warning: Could not find seller information for '+row['Title'])
        #     print(Style.RESET_ALL)
        if row['Image Data'].startswith('http'):
            f.write('!['+row['Title']+']('+row['Image Data']+'.'+row['Image Extension']+')\n')
        else:
            f.write('!['+row['Title']+'](./'+row['Alias']+'.'+row['Image Extension']+')\n')
        # f.write('###Product Info:\n')
        features = row['Features'].split("', '")
        features_length = len(features)-1
        for i, feature in enumerate(features):
            # if i == 0:
            #     f.write("- "+feature[2:]+"\n")
            # elif i == features_length:
            #     f.write("- "+feature[:-2]+"\n")
            # else:
            #     f.write("- "+feature+"\n")
            if i == 0:
                f.write("- "+feature.split('. ')[0][2:]+"\n")
            elif i == features_length:
                f.write("- "+feature.split('. ')[0][:-2]+"\n")
            else:
                f.write("- "+feature.split('. ')[0]+"\n")

        # f.write('######Check Price\n')
        f.write('######[Check Price]('+row['Link']+')\n')
        f.write('[<button class="button">'+row['Price']+" on Amazon</button>]("+row['Link']+')\n')

        if not row['Image Data'].startswith('https'):
            with open(path+row['Alias']+'.'+row['Image Extension'], 'wb') as f:
                try:
                    decoded_string = base64.b64decode(row['Image Data'])
                    f.write(decoded_string)
                except:
                    print(Fore.YELLOW+'Warning: The product for '+row['Title']+' could not be decoded.')
                    print(Style.RESET_ALL)
        
    print(Style.RESET_ALL)
if __name__ == "__main__":
    generate()