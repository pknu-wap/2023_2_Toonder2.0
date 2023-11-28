# api -> csv
def api_to_csv():
  import pandas as pd
  import urllib.request
  import json

  # API에서 데이터 받아오기
  df = pd.DataFrame()

  for i in range(1,460):
    url = f'https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey=ac588af480c81e0c020a57c56bec3efa&listSeCd=1&pageNo={i}&viewItemCnt=100'
    response = urllib.request.urlopen(url)
    json_str = response.read().decode("utf-8")
    json_object = json.loads(json_str)
    new_data = pd.json_normalize(json_object['itemList'])
    df = pd.concat([df, new_data], ignore_index=True)
    
  # df 중복값 제거
  df = df[['mastrId',
          'title',
          'pictrWritrNm',
          'sntncWritrNm',
          'mainGenreCdNm',
          'outline',
          'pltfomCdNm',
          'imageDownloadUrl']]

  df.to_csv("ai/data/webtoon.csv", index=False)
