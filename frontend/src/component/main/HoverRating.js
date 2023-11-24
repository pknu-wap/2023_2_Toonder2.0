import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function HoverRating({ value: propValue, readOnly, size }) {
    const [localValue, setLocalValue] = React.useState(propValue);
    const [hover, setHover] = React.useState(-1);
  
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Rating
          name="hover-feedback"
          value={localValue}
          precision={0.5}
          size={size} // 여기서 props로 전달된 size를 사용합니다.
          readOnly={readOnly}
          onChange={(event, newValue) => {
            if (!readOnly) {
              setLocalValue(newValue);
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
