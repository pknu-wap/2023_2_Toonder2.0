import requests
import os
import pandas as pd
import shutil


# 이미지 저장 함수
def save_image_from_url(url, title ):
    directory = "ai/data/toonder_img/class/"
        
    response = requests.get(url)
    if response.status_code == 200:
        # 디렉토리 경로 생성

        # 디렉토리가 존재하지 않으면 생성
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        # 파일 저장
        with open(f"{directory}/{title}.PNG", 'wb') as file:
            file.write(response.content)
    else:
        print(f"이미지 다운로드 실패: {url} ({title})")


def data_to_img(url):
    df = pd.read_csv(url)

    # 다운로드할 URL 리스트
    image_urls = df['imageDownloadUrl']
    image_id = df['mastrId']

    # 이미지 저장
    for url, title in zip(image_urls, image_id):
        save_image_from_url(url, title )