import React, { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
export default function AdminPortal() {
  return (
    <div>
      <AddCarForm />
    </div>
  );
}

function AddCarForm() {
  const [values, setValues] = useState({
    name: "",
    isMod: false,
    isFree: true,
    image: "",
    link: "",
  });
  const [file, setFile] = useState();
  const BUCKET_URL = "https://owsr-public.s3.us-east-1.amazonaws.com/";
  const [uploadingStatus, setUploadingStatus] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

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

  const onSubmit = async () => {
    console.log(values);
    const imageUrl = await uploadFile();
    let { name, isMod, isFree, link } = values;
    let newCar = {
      name: name,
      isMod: isMod,
      image: imageUrl,
    };
    if (isMod) {
      newCar.isFree = isFree;
      newCar.link = link;
    }
    const { success, data, message } = await axios.post("/api/cars", newCar);
    if (!success) {
      console.error(message);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <main>
        <div className="flex flex-col">
          <label className="mb-1" htmlFor="name">
            Name
          </label>
          <input
            name="name"
            className="input-field bg-dark-300 ml-0"
            id="name"
            onChange={(e) => {
              setValues({ ...values, name: e.target.value });
            }}
            value={values.name}
          />
          <label className="mb-1">Image</label>
          <div className="p-3 py-10 bg-dark-300 rounded-md">
            <input type="file" onChange={(e) => selectFile(e)} />
            {file && (
              <>
                <p>Selected file: {file.name}</p>
                <button
                  onClick={uploadFile}
                  className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
                >
                  Upload
                </button>
              </>
            )}
            {uploadingStatus && <p>{uploadingStatus}</p>}
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
        <button onClick={onSubmit}>Submit</button>
      </main>
    </div>
  );
}

AdminPortal.layout = "Dashboard";
