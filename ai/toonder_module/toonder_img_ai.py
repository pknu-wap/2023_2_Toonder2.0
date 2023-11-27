

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

image_dir = "/Users/kite/Desktop/flask/toonder_ai/toonder_img"

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
print(class_names)

plt.figure(figsize=(10, 10))
for images, labels in train_ds.take(1):
  for i in range(9):
    ax = plt.subplot(3, 3, i + 1)
    plt.imshow(images[i].numpy().astype("uint8"), cmap='gray')
    plt.title(class_names[labels[i]])
    plt.axis("off")