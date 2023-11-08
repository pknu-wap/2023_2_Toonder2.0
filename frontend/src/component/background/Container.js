import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Container에 position: relative; 추가 */
  max-width: 540px; /* 너비 제한 추가 */
  margin: 0 auto; /* 가운데 정렬을 위해 추가 */
  text-align: center; /* 텍스트를 중앙으로 정렬합니다. */
  align-items: center; /* 수정: 수직 가운데 정렬을 위해 필요 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  transition: box-shadow 0.3s ease; /* 효과를 부드럽게 적용하기 위한 트랜지션 추가 */
  overflow-y: auto; /* 스크롤이 필요한 경우 스크롤 표시 */
  min-height: 100vh; /* 컨테이너의 최소 높이를 뷰포트 높이로 설정 */
`;