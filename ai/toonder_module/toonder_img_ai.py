

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import cv2
import os
import tensorflow as tf
from PIL import Image
import tensorflow_datasets as tfds


from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image_dataset_from_directory

import pathlib

image_dir = "ai/data/toonder_img"
batch_size = 32
image_size = (64, 64)

train_ds = image_dataset_from_directory(
    directory=image_dir,
    labels="inferred",
    color_mode='grayscale',
    class_names=['class'],
    image_size=image_size,
    batch_size=batch_size,
    seed=1337
    )

class_names = train_ds.class_names
take = train_ds.take(1)

print(train_ds.element_spec)
print("class_names : ", class_names)
print("data_mode   : ", take)

for images, labels in train_ds.take(1):
  print('images.shape: ', images.shape)
  print('labels.shape: ', labels.shape)

# for images, labels in train_ds.take(1):
#     # 첫 번째 이미지를 선택합니다.
#     first_image = images.numpy()
    
#     # 이미지를 출력합니다.
#     plt.figure()
#     plt.imshow(first_image, cmap='gray')  # grayscale 이미지이므로 cmap='gray'로 설정합니다.
#     plt.axis('off')  # 축을 제거합니다.
#     plt.show()