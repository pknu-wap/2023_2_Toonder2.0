import shutil
import os
from api_to_csv import api_to_csv
from csv_to_data import csv_to_data
from toonder_db_connection import connect_to_db
from create_db import create_db
from data_to_img import data_to_img
from toonder_csv import toonder_csv
from toonder_img import toonder_img

global directory
directory = "ai/data"
import os

directory = 'ai/data/toonder_img/class'

# 디렉토리가 존재하든 안하든 일단 생성
def delete_data_folder():
    
    if os.path.exists(directory):
        shutil.rmtree(directory)
        print(f"폴더 '{directory}'와 하위 디렉토리가 모두 삭제되었습니다.")    
        os.makedirs(directory)
        print(f"디렉토리 {directory}가 생성되었습니다.")

    else:
        os.makedirs(directory)
        print(f"디렉토리 {directory}가 생성되었습니다.")

url = 'ai/data/data.csv'
db, cursor, api_url, api_key = connect_to_db()

delete_data_folder() # 매일마다 데이터 폴더를 삭제하고 다시 시작함
api_to_csv() # api -> csv
print("api_to_csv() done")
csv_to_data() # csv에서 중복 제거
print("csv_to_data() done")
data_to_img(url) # csv의 이미지 url에서 jpeg로 파일 변경
print("data_to_img(url) done")
toonder_csv()
print("toonder_csv() done")
toonder_img()
print("toonder_img() done")
create_db(url) # db에 연결
print("PROGRAM ENDED")
# -----여기까지는 무리 없이 됨-----
