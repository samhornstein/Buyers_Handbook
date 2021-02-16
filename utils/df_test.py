import pandas as pd

df = pd.read_csv('/Users/samhornstein/gatsby-starter-blog-2/content/reviews/ice cream/df_output.csv')

df.drop_duplicates(subset=['Title'], inplace=True)

print(df.head())