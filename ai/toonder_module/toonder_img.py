import numpy as np
import pandas as pd
import os
import tensorflow as tf
import random
from tensorflow.keras.preprocessing import image_dataset_from_directory
from keras.layers import Input, Dense, Flatten
from keras.models import Model
from keras import backend as K
import subprocess



# ====================================함수화====================================


def mogrify_png(directory):
    # mogrify 명령어 실행
    try:
        subprocess.run(["mogrify", "*.png"], cwd=directory, shell=True, check=True)
        print("모든 PNG 파일이 성공적으로 변환되었습니다.")
    except subprocess.CalledProcessError as e:
        print("오류 발생:", e)
    
    print("mogrify_png done")

def is_readable_by_tensorflow(file_path):
    try:
        img = tf.io.read_file(file_path)
        img = tf.image.decode_png(img, channels=3)  # Adjust channels if needed
        return True
    except tf.errors.InvalidArgumentError:
        return False
    

def delete_unreadable_png(directory):
    deleted_files = 0
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if filename.lower().endswith('.png'):
            if not is_readable_by_tensorflow(file_path):
                os.remove(file_path)
                deleted_files += 1
                print(f"Deleted: {file_path}")

    if deleted_files == 0:
        print("No unreadable png files found.")
    else:
        print(f"Deleted {deleted_files} unreadable png file(s).")
    print("delete_unreadable_png done")

def preprocessig_df(encoded_imgs):
    
    # 열 이름 변경
    encoded_imgs.rename(columns={0: 'rst'}, inplace=True)
    # 중복된 값을 정수로 매핑
    encoded_imgs['drawId'], _ = encoded_imgs['rst'].factorize()
    # 매핑된 값 확인
    print(encoded_imgs['drawId'].nunique())
    print("preprocessig_df done")
    return encoded_imgs

def df_to_csv(directory, encoded_imgs):
    csv_path = 'ai/data/data.csv'
    df = pd.read_csv(csv_path)
    # 파일 이름 리스트 생성
    file_names = os.listdir(directory)

    # 파일 이름에서 mastrId 추출하여 매핑
    id_map = {int(file_name.split('.')[0]): encoded_id for file_name, encoded_id in zip(file_names, encoded_imgs['drawId'])}

    # 파일 이름이 mastrId에 있는 경우, 해당하는 drawId 값을 df['drawId']에 매핑
    df['drawId'] = df['mastrId'].map(id_map)
    print(df['drawId'])

    df.to_csv(csv_path, index=False)
    print("df_to_csv done")

def image_AI(image_dataset, encoding_dim ):
    # configure
    input_img = Input(shape=(64, 64))

    flattened = Flatten()(input_img)

    # layers
    encoded = Dense(encoding_dim, activation='relu')(flattened)

    encoder = Model(input_img, encoded) # encoder

    encoded_input = Input(shape=(encoding_dim,))

    def rmse(y_true, y_pred):
        return K.sqrt(K.mean(K.square(y_pred - y_true), axis=-1))

    # train autoencoder
    encoder.compile(optimizer='adadelta', loss='sparse_categorical_crossentropy', metrics=[rmse])
    encoder.fit(image_dataset,
                    epochs=3,
                    batch_size=512,
                    shuffle=True)

    # encoding result
    encoded = encoder.predict(image_dataset)
    encoded_imgs = encoded

    encoded_imgs = np.where(encoded_imgs < 1, 0, 1)
    encoded_imgs = encoded_imgs.astype(np.uint8())
    encoded_imgs = [str(inner_list) for inner_list in encoded_imgs]

    encoded_imgs = pd.DataFrame(encoded_imgs)
    print("image_AI done")

    return encoded_imgs
# ====================================함수화====================================
def toonder_img():
    directory_path = "ai/data/toonder_img/class"  # Replace with your directory path
    # TensorFlow의 랜덤 시드 설정
    tf.random.set_seed(42)

    # Python의 랜덤 시드 설정 (Numpy와 일반 Python 랜덤 시드)
    np.random.seed(42)
    random.seed(42)

    # mogrify_png(directory)

    delete_unreadable_png(directory_path)

    image_dir = 'ai/data/toonder_img'
    batch_size = 32
    image_size = (64, 64)

    image_dataset = image_dataset_from_directory(
        directory=image_dir,
        labels="inferred",
        color_mode='grayscale',
        label_mode="categorical",
        class_names=['class'],
        image_size=image_size,
        batch_size=batch_size,
        shuffle=False
        )

    # encoding_dim = 최대로 나올 수 있는 경우의 수
    # ex) encoding_dim = 10은 2^10
    encoded_imgs = image_AI(image_dataset=image_dataset,
                            encoding_dim = 10)

    encoded_imgs = preprocessig_df(encoded_imgs)

    df_to_csv(directory_path, encoded_imgs)