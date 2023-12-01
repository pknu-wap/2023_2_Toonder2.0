import requests
import os
import pandas as pd
import shutil

# 이미지 저장 함수
def save_image_from_url(url, title):
    directory = "ai/data/toonder_img/class/"
        
    try:
        response = requests.get(url, timeout=5)  # 타임아웃 시간 설정
        response.raise_for_status()  # 에러 발생시 예외 처리

        # 디렉토리 경로 생성
        if not os.path.exists(directory):
            os.makedirs(directory)
        
        # 파일 저장
        filepath = f"{directory}/{title}.png"
        if not os.path.exists(filepath):
            with open(filepath, 'wb') as file:
                file.write(response.content)

    except (requests.exceptions.RequestException, requests.exceptions.Timeout) as e:
        print(f"img download failed: {url} ({title})")

def data_to_img(url):
    df = pd.read_csv(url)

    # 다운로드할 URL 리스트
    image_urls = df['imageDownloadUrl']
    image_id = df['mastrId']

    # 이미지 저장
    seen_titles = set()  # 중복 체크를 위한 집합 생성
    for url, title in zip(image_urls, image_id):
        if title in seen_titles:
            continue  # title이 이미 있으면 건너뜁니다.
        
        seen_titles.add(title)
        save_image_from_url(url, title)
