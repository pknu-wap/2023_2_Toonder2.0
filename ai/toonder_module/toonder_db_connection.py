# toonder DB�� ���� api�� �����ϴ� �ڵ��.
# api_key ������: 2024-09-26 00:00:00.0 

import pymysql

def connect_to_db():
    # MySQL ���� ����
    db = pymysql.connect(host="182.215.121.80",
                         port=3306,
                         user="root",
                         password="",
                         charset="utf8",
                         database="toonderDB")

    cursor = db.cursor()
    
    # api ���� 
    api_url = 'https://www.kmas.or.kr/openapi/search/rgDtaMasterList'
    # �ڿ��� 'ab1eeee66999122bff66b842c4d034a9' 
    # ������ 'ac588af480c81e0c020a57c56bec3efa' 
    api_key = 'ac588af480c81e0c020a57c56bec3efa' # �ڿ��� 'ab1eeee66999122bff66b842c4d034a9' 

    
    return db, cursor, api_url, api_key