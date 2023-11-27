import pandas as pd
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

db, cursor, api_url, api_key = connect_to_db()
# api_to_csv()
csv_to_data()
url = '/Users/kite/Desktop/flask/toonder_ai/toonder_module/data.csv'

data_to_img(url)

# img ai
# outline ai


create_db(url)