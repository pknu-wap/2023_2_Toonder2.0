import csv
from toonder_db_connection import connect_to_db

def create_db(csv_file_path):
    db, cursor, api_url, api_key = connect_to_db()

    try:
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            headers = next(reader)
            
            delete_table_query = f"""
            DROP TABLE wbtnInfo 
            """
            cursor.execute(delete_table_query)

            
            # 테이블 생성
            create_table_query = f"""
            CREATE TABLE IF NOT EXISTS wbtnInfo (
                mastrId VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                pictrWritrNm VARCHAR(255),
                sntncWritrNm VARCHAR(255),
                mainGenreCdNm VARCHAR(255),
                outline VARCHAR(3000),
                pltfomCdNm VARCHAR(255),
                imageDownloadUrl VARCHAR(255),
                adult VARCHAR(255),
                drawId VARCHAR(255),
                mem_email varchar(255),
                outline_recommendations VARCHAR(3000))
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
