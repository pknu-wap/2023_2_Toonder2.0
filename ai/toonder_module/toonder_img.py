
def toonder_img():
    from keras.applications.resnet50 import ResNet50
    from keras.applications.resnet50 import preprocess_input
    from sklearn.decomposition import PCA
    from sklearn.cluster import KMeans
    import numpy as np
    import pandas as pd
    import glob
    import cv2
    import os

    # 이미지 불러오기 및 전처리
    image_paths = glob.glob('ai\data\\toonder_img\class\*.png')
    images = [cv2.resize(cv2.imread(img), (224, 224)) for img in image_paths]
    images = np.array([preprocess_input(img) for img in images])

    # ResNet50 모델 불러오기 (사전 학습된 가중치 사용)
    model = ResNet50(weights='imagenet', include_top=False)

    # 특징 추출
    features = model.predict(images)

    # 차원 축소
    pca = PCA(n_components=16)  # 축소할 차원 수 지정
    features_pca = pca.fit_transform(features.reshape(features.shape[0], -1))

    # 클러스터링
    kmeans = KMeans(n_clusters=100)  # 클러스터 수 지정
    kmeans.fit(features_pca)

    # 클러스터링 결과
    clusters = kmeans.labels_

    # clusters를 npy 파일로 저장
    np.save('ai/data/image_paths.npy', image_paths)
    np.save('ai/data/clusters.npy', clusters)

toonder_img()