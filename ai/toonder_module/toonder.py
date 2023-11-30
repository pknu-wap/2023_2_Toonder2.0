import torch
from torchvision.datasets import ImageFolder
import torchvision.models as models
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

from keras.applications.vgg16 import preprocess_input
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

import numpy as np
import glob
import cv2


# 데이터 경로
# 이미지 불러오기 및 전처리
image_paths = glob.glob('ai\data\\toonder_img\class\*.png')
images = [cv2.resize(cv2.imread(img), (224, 224)) for img in image_paths]
images = np.array([preprocess_input(img) for img in images])


# ImageFolder를 사용하여 데이터셋 로드
dataset = ImageFolder(root=data_dir, transform=transform)

# DataLoader를 사용하여 데이터 배치로 로드
dataloader = torch.utils.data.DataLoader(dataset, batch_size=len(dataset))

# GPU 사용 설정
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# 데이터를 GPU로 이동
images, _ = next(iter(dataloader))
images = images.to(device)

# 사전 학습된 VGG16 모델 불러오기
model = models.vgg16(pretrained=True).features.to(device)
model.eval()

# 특징 추출
features = model(images).detach().cpu().numpy()

# 차원 축소
features_flat = features.reshape(features.shape[0], -1)
pca = PCA(n_components=50)
features_pca = pca.fit_transform(features_flat)

# 클러스터링
kmeans = KMeans(n_clusters=1000)
kmeans.fit(features_pca)

# 클러스터링 결과 확인
for i in range(len(dataset)):
    print(f"Image: {dataset.imgs[i][0]}, Cluster: {kmeans.labels_[i]}")
