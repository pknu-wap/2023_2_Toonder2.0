# api -> csv
def api_to_csv():
    import pandas as pd
    import urllib.request
    import json

    # API에서 데이터 받아오기
    df = pd.DataFrame()
    i = 1
    api_key1 = "ab1eeee66999122bff66b842c4d034a9"
    api_key2 = "ac588af480c81e0c020a57c56bec3efa"
    api_key = api_key1

    while True:
        url = f'https://www.kmas.or.kr/openapi/search/rgDtaMasterList?prvKey={api_key}&listSeCd=1&viewItemCnt=100&pageNo={i}'
        try:
            response = urllib.request.urlopen(url)
            json_str = response.read().decode("utf-8")
            json_object = json.loads(json_str)
        except KeyError:
            # 키 에러가 발생하면 다른 키로 바꿔서 다시 시도
            if api_key == api_key1:
                api_key = api_key2
            else:
                break  # 두 번째 키까지 실패하면 종료
            
            continue  # 다음 반복 시작
        
        # 만약 값이 없으면 종료
        if not json_object['itemList']:
            break
            
        new_data = pd.json_normalize(json_object['itemList'])
        df = pd.concat([df, new_data], ignore_index=True)
        i += 100
    
    # df 중복값 제거
    df = df[['mastrId',
             'title',
             'pictrWritrNm',
             'mainGenreCdNm',
             'outline',
             'pltfomCdNm',
             'imageDownloadUrl']]

    df.to_csv("ai/data/webtoon.csv", index=False)

# 함수 호출
api_to_csv()
