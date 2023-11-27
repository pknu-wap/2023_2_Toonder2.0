# api -> csv
def csv_to_data():
    import pandas as pd
    df = pd.read_csv("/Users/kite/Desktop/flask/toonder_ai/toonder_module/webtoon.csv")

    # df 중복값 제거
    df = df.drop_duplicates(['outline'], keep='first')
    df = df.drop_duplicates(['title'], keep='first')
    df = df.drop_duplicates(['imageDownloadUrl'], keep='first')
    df = df.reset_index(drop=True)

    # 중복을 제거한 데이터프레임을 CSV 파일에 저장
    df.to_csv("/Users/kite/Desktop/flask/toonder_ai/toonder_module/data.csv", index=False)
    