import csv
from toonder_db_connection import connect_to_db

url = 'ai/data/data.csv'

def create_db(url):
    db, cursor, api_url, api_key = connect_to_db()

    try:
        with open(url, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            headers = next(reader)

            delete_table_query = f"""
            DROP TABLE IF EXISTS wbtnInfo 
            """
            # cursor.execute(delete_table_query)
            print("successfully DROPED")
            
            # 테이블 생성
            # create_table_query = f"""
            # CREATE TABLE IF NOT EXISTS wbtnInfo (
            #     mastrId VARCHAR(255) NOT NULL,
            #     title VARCHAR(255) NOT NULL,
            #     pictrWritrNm VARCHAR(255) CHARACTER SET utf8mb4,
            #     mainGenreCdNm VARCHAR(255) CHARACTER SET utf8mb4,
            #     outline VARCHAR(3000) CHARACTER SET utf8mb4,
            #     pltfomCdNm VARCHAR(255) CHARACTER SET utf8mb4,
            #     imageDownloadUrl VARCHAR(255) CHARACTER SET utf8mb4,
            #     adult VARCHAR(255) CHARACTER SET utf8mb4,
            #     drawId VARCHAR(255) CHARACTER SET utf8mb4,
            #     outline_recommendations VARCHAR(3000) CHARACTER SET utf8mb4
            # ) CHARACTER SET utf8mb4;
            # """
            create_table_query=f"""            
            ALTER TABLE wbtnInfo
            
            MODIFY COLUMN pictrWritrNm VARCHAR(255) CHARACTER SET utf8mb4,
            MODIFY COLUMN mainGenreCdNm VARCHAR(255) CHARACTER SET utf8mb4,
            MODIFY COLUMN outline VARCHAR(3000) CHARACTER SET utf8mb4,
            MODIFY COLUMN pltfomCdNm VARCHAR(255) CHARACTER SET utf8mb4,
            MODIFY COLUMN imageDownloadUrl VARCHAR(255) CHARACTER SET utf8mb4,
            MODIFY COLUMN adult VARCHAR(255) CHARACTER SET utf8mb4,
            MODIFY COLUMN drawId VARCHAR(255) CHARACTER SET utf8mb4,
            MODIFY COLUMN outline_recommendations VARCHAR(3000) CHARACTER SET utf8mb4;
            """
            cursor.execute(create_table_query)
            print("successfully CREATED")

            # 데이터 추가
            insert_query = f"INSERT INTO wbtnInfo ({', '.join(headers)}) VALUES ({', '.join(['%s'] * len(headers))})"
            
            for row in reader:
                cursor.execute(insert_query, row)
            print("successfully INSERTED")

        db.commit()
        db.close()

    except FileNotFoundError:
        print(f"파일 '{url}'를 찾을 수 없습니다.")

    except Exception as e:
        print(f"오류 발생: {str(e)}")
        
create_db(url) # db에 연결