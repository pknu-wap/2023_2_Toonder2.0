def toonder_img_data():
    import pandas as pd
    import numpy  as np
    import os

    data = pd.read_csv('ai/data/data.csv')

    image_paths = np.load('ai/data/image_paths.npy')
    clusters = np.load('ai/data/clusters.npy')

    mastr_ids = [int(os.path.basename(path).split('.')[0]) for path in image_paths]
    encoded_imgs = pd.DataFrame({'image_path': image_paths, 'mastrId': mastr_ids, 'drawId': clusters})

    print(data['mastrId'])
    # mastrId와 drawId 간의 매핑 딕셔너리 생성
    mapping_dict2 = dict(zip(encoded_imgs['mastrId'], encoded_imgs['drawId']))

    # mastrId가 일치하는 drawId에 clusters 열 값을 덮어쓰기
    data['drawId'] = encoded_imgs['mastrId'].map(mapping_dict2).fillna(data['drawId'])
    print(data['drawId'].max())

    # 덮어쓴 데이터프레임을 'ai/data/data.csv' 파일로 저장
    data.to_csv('ai/data/data.csv', index=False)

    print("df_to_csv done")