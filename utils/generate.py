import base64
import pandas as pd
import os

def generate(keyword):
    # df = pd.read_csv('utils/df_output.csv')
    path = '/Users/samhornstein/gatsby-starter-blog-2/content/reviews/'+keyword+'/'
    df = pd.read_csv(path+'df_output.csv') 

    title= keyword
    author= "Sam Hornstein"
    date= "2015-05-01T22:12:03.284Z"
    description= "These are the best DSLR cameras on the market."
    article_type= "Review"
    category= "Electronics"
    special_status= "Trending"
    image= df['Alias'].iloc[0]+'.'+df['Image Extension'].iloc[0]

    frontmatter = "---\ntitle: "+title+"\nauthor: "+author+"\ndate: "+date+"\ndescription: "+description+"\ntype: "+article_type+"\ncategory: "+category+"\nspecial_status: "+special_status+"\nimage: "+image+"\n---\n"

    if not os.path.exists(path):
        os.makedirs(path)

    f = open(path+'index.md', 'w')
    f.write(frontmatter)
    f.write('##Our Picks\n')

    for index, row in df.iterrows():
        f = open(path+'index.md', 'a')
        f.write('###'+row['Title']+'\n')
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

        f.write('######Check Price\n')

        with open(path+row['Alias']+'.'+row['Image Extension'], 'wb') as f:
            decoded_string = base64.b64decode(row['Image Data'])
            f.write(decoded_string)



if __name__ == "__main__":
    generate()