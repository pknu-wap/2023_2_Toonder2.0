import pandas as pd
import shutil
import os


from api_to_csv import api_to_csv
from csv_to_data import csv_to_data
from toonder_db_connection import connect_to_db
from create_db import create_db
from data_to_img import data_to_img
# python3.11 환경에서 돌릴 것!!
# python3.11 환경에서 돌릴 것!!
# python3.11 환경에서 돌릴 것!!
# python3.11 환경에서 돌릴 것!!
# python3.11 환경에서 돌릴 것!!
# python3.11 환경에서 돌릴 것!!
global directory
directory = "ai/data"

def delete_data_folder():
    
    if os.path.exists(directory):
        shutil.rmtree(directory)
        print(f"폴더 '{directory}'와 하위 디렉토리가 모두 삭제되었습니다.")
    else:
        print(f"폴더 삭제 실패")

url = 'ai/data/data.csv'
db, cursor, api_url, api_key = connect_to_db()

# delete_data_folder() # 매일마다 데이터 폴더를 삭제하고 다시 시작함
# api_to_csv() # api -> csv
# csv_to_data() # csv에서 중복 제거
# data_to_img(url) # csv의 이미지 url에서 jpeg로 파일 변경
#
# img ai
# outline ai
#
# create_db(url) # db에 연결