# toonder DB에 사용될 api를 연결하는 코드다.
# api_key 만료일: 2024-09-26 00:00:00.0 

import pymysql

def connect_to_db():
    # MySQL 연결 설정
    db = pymysql.connect(host="182.215.121.80",
                         port=3306,
                         user="root",
                         password="toonderServer1201",
                         charset="utf8",
                         database="toonderDB")

    cursor = db.cursor()
    
    # api 설정 
    api_url = 'https://www.kmas.or.kr/openapi/search/rgDtaMasterList'
    # 박연수 'ab1eeee66999122bff66b842c4d034a9' 
    # 김주희 'ac588af480c81e0c020a57c56bec3efa' 
    api_key = 'ac588af480c81e0c020a57c56bec3efa' # 박연수 'ab1eeee66999122bff66b842c4d034a9' 

    
    return db, cursor, api_url, api_key