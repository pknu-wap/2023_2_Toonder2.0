import shutil
import os
from api_to_csv import api_to_csv
from csv_to_data import csv_to_data
from toonder_db_connection import connect_to_db
from create_db import create_db
from data_to_img import data_to_img
from toonder_csv import toonder_csv
from toonder_img import toonder_img

url = 'ai/data/data.csv'
db, cursor, api_url, api_key = connect_to_db()

# api_to_csv() # api -> csv
# print("api_to_csv() done")
# csv_to_data() # csv에서 중복 제거
# print("csv_to_data() done")
# data_to_img(url) # csv의 이미지 url에서 jpeg로 파일 변경
# print("data_to_img(url) done")
# toonder_csv()
# print("toonder_csv() done")
# -----여기까지는 무리 없이 됨-----



toonder_img()
print("toonder_img() done")
create_db(url) # db에 연결
print("PROGRAM ENDED")
