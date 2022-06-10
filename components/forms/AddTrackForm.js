import axios from "axios";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import validator from "validator";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function AddTrackForm() {
  const defaultValues = {
    name: "",
    isMod: false,
    isFree: true,
    image: "",
    game: "assetto-corsa",
    link: "",
  };
  const [values, setValues] = useState(defaultValues);
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const BUCKET_URL = "https://owsr-public.s3.us-east-1.amazonaws.com/";

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    let { data } = await axios.post("/api/s3", {
      name: file.name,
      type: file.type,
    });

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });
    setFile(null);

    return BUCKET_URL + file.name;
  };
  const validate = (values) => {
    const { name, isMod, link } = values;
    if (!name) return [false, "Name is required"];
    if (!file) return [false, "Please select an image"];
    if (isMod && !link) return [false, "Dowload link is required for mods"];
    if (isMod && !validator.isURL(link)) return [false, "Invalid URL"];
    return [true];
  };
  const onSubmit = async () => {
    setErrorMessage(null);
    let { name, isMod, isFree, link, game, corners, length } = values;
    const [valid, reason] = validate(values);
    if (!valid) {
      setErrorMessage(reason);
      return;
    }
    const imageUrl = await uploadFile();

    let newTrack = {
      name: name,
      game: game,
      length: length,
      corners: corners,
      isMod: isMod,
      image: imageUrl,
    };
    if (isMod) {
      newTrack.isFree = isFree;
      newTrack.link = link;
    }
    console.log(newTrack);
    const response = await axios.post("/api/tracks", newTrack);
    const { success, data, message } = response.data;
    if (!success) {
      console.error(message);
    } else {
      console.log(data);
      setFile(null);
      setValues(defaultValues);
    }
  };

  return (
    <div className="w-[600px]  border p-10 rounded my-5">
      <h2 className="">Add a Track</h2>

      <div className="flex flex-col">
        <label className="mb-1" htmlFor="name">
          Name
        </label>
        <input
          name="name"
          className="input-field bg-dark-300 ml-0 mb-3"
          id="name"
          onChange={(e) => {
            setValues({ ...values, name: e.target.value });
          }}
          value={values.name}
        />
        <label className="mb-1" htmlFor="name">
          Corners
        </label>
        <input
          name="corners"
          className="input-field bg-dark-300 ml-0 mb-3"
          id="corners"
          onChange={(e) => {
            setValues({ ...values, corners: e.target.value });
          }}
          value={values.corners}
        />
        <label className="mb-1" htmlFor="name">
          Length (km)
        </label>
        <input
          name="length"
          className="input-field bg-dark-300 ml-0 mb-3"
          id="length"
          onChange={(e) => {
            setValues({ ...values, length: e.target.value });
          }}
          value={values.length}
        />
        <FormControl className="mb-3">
          <FormLabel className="text-white" id="game-select">
            Game
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={values.game}
            onChange={(e) => {
              setValues({ ...values, game: e.target.value });
            }}
          >
            <FormControlLabel
              value="assetto-corsa"
              control={<Radio sx={{ color: "#fff" }} />}
              label="Assetto Corsa"
            />
            <FormControlLabel
              value="iracing"
              control={<Radio sx={{ color: "#fff" }} />}
              label="iRacing"
            />
            <FormControlLabel
              value="ams2"
              control={<Radio sx={{ color: "#fff" }} />}
              label="AMS2"
            />
            <FormControlLabel
              value="rfactor2"
              control={<Radio sx={{ color: "#fff" }} />}
              label="rFactor2"
            />
          </RadioGroup>
        </FormControl>
        <label className="mb-1">Image</label>
        <div className="my-3 truncate mb-3">
          <input
            className="truncate"
            type="file"
            onChange={(e) => selectFile(e)}
          />
        </div>

        <FormControlLabel
          label="Mod"
          control={
            <Checkbox
              sx={{ color: "white" }}
              onChange={(e) => {
                setValues({ ...values, isMod: e.target.checked });
              }}
              checked={values.isMod}
            />
          }
        />
        {values.isMod && (
          <>
            <label className="mb-1" htmlFor="link">
              Link
            </label>
            <input
              name="link"
              className="input-field bg-dark-300 ml-0"
              id="link"
              onChange={(e) => {
                setValues({ ...values, link: e.target.value });
              }}
              value={values.link}
            />
            <FormControlLabel
              label="Free"
              control={
                <Checkbox
                  sx={{ color: "white" }}
                  onChange={(e) => {
                    setValues({ ...values, isFree: e.target.checked });
                  }}
                  checked={values.isFree}
                />
              }
            />
          </>
        )}
      </div>
      {errorMessage && <p className="my-2 text-red-500">{errorMessage}</p>}
      <button className="py-2 px-5 bg-red-500" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
