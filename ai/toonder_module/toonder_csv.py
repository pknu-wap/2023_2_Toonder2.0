def toonder_csv():
    import pandas as pd
    import matplotlib.pyplot as plt
    from konlpy.tag import Okt
    from sklearn.metrics.pairwise import cosine_similarity
    from sklearn.feature_extraction.text import TfidfVectorizer
    from tqdm import tqdm
    from collections import Counter
    from soyspacing.countbase import CountSpace
    import re

    # file_path = '/Users/choedohyeon/desktop/workarea/summery/webtoon.csv'
    file_path = 'ai/data/data.csv'

    model = CountSpace()
    okt = Okt()

    df = pd.read_csv(file_path)
    pd.set_option('display.max_columns', None)
    pd.set_option('display.expand_frame_repr', False)
    pd.set_option('display.max_colwidth', 20)
    html_table = df.to_html()
    styled_table = df.style.set_table_styles([{
        'selector': 'td',
        'props': [('max-width', '100px')]
    }])

    df = df[['title', 'outline','mastrId', 'imageDownloadUrl', 'mainGenreCdNm', 'pictrWritrNm', 'pltfomCdNm']]
    df = df.drop_duplicates(subset=['title'])
    df = df.drop_duplicates(subset=['outline'])
    df = df.drop_duplicates(subset=['imageDownloadUrl'])

    df['outline'] = df['outline'].str.replace(pat=r"[^\w\s]", repl=r'', regex=True)
    df['outline'] = df['outline'].str.replace(pat=r"[\r]", repl=r'', regex=True)
    df['outline'] = df['outline'].str.replace(pat=r"[\n]", repl=r' ', regex=True)
    df = df.dropna()
    df = df.reset_index(drop=True)

    outlines = df['outline'].tolist()

    corrected_outlines = [model.correct(outline)[0] for outline in outlines if outline != '1' and outline is not None]

    df['outline'] = corrected_outlines

    def filter_pos(text):
        pos_tags = okt.pos(text)
        filtered_words = [word for word, pos in pos_tags if pos in ['Adjective', 'Adverb', 'Verb', 'Noun']]
        return ' '.join(filtered_words)

    df['filtered_outline'] = df['outline'].apply(filter_pos)

    unique_genres = df['mainGenreCdNm'].unique()

    df['adult'] = 0
    adult_genres = ['����', 'BL', 'GL', '������']
    df.loc[df['mainGenreCdNm'].isin(adult_genres), 'adult'] = 1
    keywords = ['����', '�ҷ�', '�ߵ�', '����', '����']
    pattern = re.compile('|'.join(keywords))

    df.loc[(df['outline'].str.contains(pattern)) & (df['adult'] == 0), 'adult'] = 1

    outlines = df['filtered_outline'].values
    words = ' '.join(outlines).split()
    counter = Counter(words)
    vocab = sorted(counter, key=counter.get, reverse=True)
    int2word = dict(enumerate(vocab, 1))
    int2word[0] = '<PAD>'
    word2int = {word: id for id, word in int2word.items()}
    word2int

    outlines_enc = [[word2int[word] for word in outline.split()] for outline in tqdm(outlines)]

    documents = df['filtered_outline'].to_numpy()

    tfidfVectorizer = TfidfVectorizer()
    tfidfMatrix = tfidfVectorizer.fit_transform(documents)
    similarity = cosine_similarity(tfidfMatrix, tfidfMatrix)

    outlineToIndex = dict(zip(documents, df.index))

    def recommendations(outline, similarity=similarity):
        index = outlineToIndex[outline]
        scores = list(enumerate(similarity[index]))
        scores = sorted(scores, key=lambda x:x[1], reverse=True)

        scores = scores[1:11]
        webtoon_index = [idx[0] for idx in scores]
        df['mastrId'].iloc[webtoon_index].tolist()
        return df['mastrId'].iloc[webtoon_index].tolist()

    df['outline_recommendations'] = df['filtered_outline'].apply(lambda x: recommendations(x))
    columns_to_display = ['title', 'outline', 'mastrId', 'imageDownloadUrl', 'mainGenreCdNm', 'pictrWritrNm', 'pltfomCdNm', 'adult', 'outline_recommendations']
    df = df[columns_to_display]
    print(df)

    df.to_csv("ai/data/data.csv", index=False)