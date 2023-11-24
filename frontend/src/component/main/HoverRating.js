import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

export default function HoverRating({
  value: propValue,
  readOnly,
  size,
  onChange,
}) {
    
  const [localValue, setLocalValue] = React.useState(propValue);
  const [hover, setHover] = React.useState(-1);

  // 별점 변경 시 상위 컴포넌트로 변경된 값을 전달하는 함수
  const handleRatingChange = (newValue) => {
    setLocalValue(newValue); // 로컬 상태 업데이트
    onChange(newValue); // 부모 컴포넌트의 상태 업데이트
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={localValue}
        precision={0.5}
        size={size}
        readOnly={readOnly}
        onChange={(event, newValue) => {
          if (!readOnly) {
            handleRatingChange(newValue); // 변경된 값을 처리하는 함수 호출
          }
        }}
        onChangeActive={(event, newHover) => {
          if (!readOnly) {
            setHover(newHover);
          }
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}
