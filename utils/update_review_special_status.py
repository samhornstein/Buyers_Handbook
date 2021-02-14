import os
import pandas as pd

def update_review_special_status():
    rootdir = '/Users/samhornstein/gatsby-starter-blog-2/content/reviews/'
    
    titles = []
    special_statuses = []

    for subdir, dirs, files in os.walk(rootdir):
        for file in files:
            if file == "index.md":
                titles.append(subdir.split("/")[-1])
                # with open(os.path.join(subdir, file), 'r') as f:
                #     titles.append([line for line in f if line.startswith('title:')][0][7:-1])
                with open(os.path.join(subdir, file), 'r') as f:                 
                    special_statuses.append([line for line in f if line.startswith('special_status:')][0][16:-1])

    d = {'Title': titles, 'Status': special_statuses}

    df = pd.DataFrame(d)
    # df = df.sort_values('Title')
    # df = df.reset_index(drop=True)

    print("Here are the current statuses: ")
    print(df)
    print('\n')

    df['Status']=""

    trending_posts = []
    print('Enter four titles to make "Trending"')
    for i in range(1, 5):
        title = input('Title ' + str(i)+ ': ')
        trending_posts.append(str(title))
    
    print('Enter one title to make "Featured"')
    featured_post = input('Title: ')
    print('\n')

    for trending_post in trending_posts:
        df['Status'].loc[df['Title'] == trending_post] = 'Trending'
    
    df['Status'].loc[df['Title'] == featured_post] = 'Featured'

    print("Here are the updated statuses: ")
    print(df)
    print('\n')

    for subdir, dirs, files in os.walk(rootdir):
        for file in files:
            if file == "index.md":
                with open(os.path.join(subdir, file), 'r') as f:
                    lines = f.readlines()
                    title = subdir.split('/')[-1]
                    lines[7] = 'special_status: '+ str(df['Status'].loc[df['Title'] == title].values)[2:-2] +'\n'
                with open(os.path.join(subdir, file), 'w') as f:
                    f.writelines(lines)

    print('The review statuses have been successfully updated.')

if __name__ == "__main__":
    update_review_special_status()