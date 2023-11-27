import csv
from toonder_db_connection import connect_to_db

def create_db(csv_file_path):
    db, cursor, api_url, api_key = connect_to_db()

    try:
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            headers = next(reader)
            
            # 테이블 생성
            create_table_query = f"""
            CREATE TABLE IF NOT EXISTS wbtnInfo (
            {', '.join([f"{header} TEXT NOT NULL" for header in headers])}
            )
            """
            cursor.execute(create_table_query)

            # 데이터 추가
            insert_query = f"INSERT INTO wbtnInfo ({', '.join(headers)}) VALUES ({', '.join(['%s'] * len(headers))})"
            for row in reader:
                cursor.execute(insert_query, row)

        db.commit()
        db.close()

    except FileNotFoundError:
        print(f"파일 '{csv_file_path}'를 찾을 수 없습니다.")

    except Exception as e:
        print(f"오류 발생: {str(e)}")
