import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function LimitTags() {
  return (
    <Autocomplete
      limitTags={2}
      size="small"
      onChange={(e, value) => console.log(value)}
      id="multiple-limit-tags"
      options={top100Films}
      
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} label="" helperText="This Field Is Required" required fontSize="small" placeholder="" />
      )}
      sx={{ width: "110px" }}
    />
  );
}

const top100Films = [
  { title: "Mr" },
  { title: "Mrs" },
  { title: "Miss" },
  { title: "Dr." },
  { title: "Ms" },
  { title: "Prof." },
];
