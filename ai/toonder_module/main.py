import shutil
import os
import schedule
import time
from api_to_csv import api_to_csv
from csv_to_data import csv_to_data
from toonder_db_connection import connect_to_db
from create_db import create_db
from data_to_img import data_to_img
from toonder_csv import toonder_csv
from toonder_img import toonder_img

def main():

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
    # toonder_img()
    # print("toonder_img() done")
    # create_db(url) # db에 연결
    print("PROGRAM ENDED")
    # -----여기까지는 무리 없이 됨-----



    # 이 함수에 매일 00시 00분에 실행하고자 하는 작업을 넣어주세요.

def job():
    # main() 함수를 실행하는 함수를 정의합니다.
    main()

# 스케줄링 설정: 매일 00시 00분에 job() 함수를 실행하도록 설정합니다.
schedule.every().day.at("00:00").do(job)

while True:
    # 스케줄링된 작업을 실행합니다.
    schedule.run_pending()
    time.sleep(60)  # 60초마다 스케줄을 확인합니다.
    print("매일 00시 00분에 실행되는 작업입니다.")
