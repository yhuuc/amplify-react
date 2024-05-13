import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import AWS from 'aws-sdk';

// function SongUploader() {
//   const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
//     accept: {
//       'audio/*' : ['.mp3','.wav'],
//     }
//   });
  
//   const files = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));
  
//   return(
//     <section className = "Song-uploader">
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//         <p>Drag 'n' drop your song here, or click to select files</p>
//         <em>(Only accept *.mp3 and *.wav audio files)</em>
//     </div>
//     <aside>
//       <h4>Files</h4>
//       <ul style={{color:'cornflowerblue'}}>{files}</ul>
//     </aside>
//   </section>
//   );
// }
// export default SongUploader;



// import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";
// // import AudioPlayer from "./AudioPlayer";

// const SongUploader = () => {
//   const getUploadParams = ({ meta }) => {
//     const url = "https://httpbin.org/post";
//     return {
//       url,
//       meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
//     };
//   };
//   // const getUploadParams = async ({ meta: { name } }) => {
//   //   const { fields, uploadUrl, fileUrl } =
//   //     await myApiService.getPresignedUploadParams(name);
//   //   return { fields, meta: { fileUrl }, url: uploadUrl };
//   // };

//   const handleChangeStatus = ({ meta, file }, status) => {
//     console.log(status, meta, file);
//   };

//   const handleSubmit = (files, allFiles) => {
//     console.log(files.map((f) => f.meta));
//     allFiles.forEach((f) => f.remove());
//   };

//   return (
//     <div className="Song-uploader">
//       <Dropzone
//         getUploadParams={getUploadParams}
//         onChangeStatus={handleChangeStatus}
//         onSubmit={handleSubmit}
//         // restrict file type to audio
//         accept="audio/*"
//         inputContent={(files, extra) =>
//           extra.reject
//             ? "Audio files only"
//             : "DRAG or CLICK to upload your song here! (mp3., wav., flac.)"
//         }
//         // restrict file number to 1
//         maxFiles={1}
//         multiple={false}
//         // disable submit button when file number is 0
//         // submitButtonDisabled = {files => files.length < 1}
//         styles={{
//           dropzone: { width: 400, minHeight: 200, maxHeight: 250 },
//           dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
//           inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
//         }}
//       />
//     </div>
//   );
// };

// export default SongUploader;


function SongUploader () {
    // Create state to store file
    const [file, setFile] = useState(null);
    const [link, setLink] = useState(null);
    // Function to upload file to s3
    const uploadFile = async () => {
      const S3_BUCKET = "bucket-name";  
      const REGION = "region";

      // S3 Credentials
      AWS.config.update({
        accessKeyId: "youraccesskeyhere",
        secretAccessKey: "yoursecretaccesskeyhere",

      });
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });
  
      // Files Parameters
      const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
      };
  
      // Uploading file to s3
      var upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          // File uploading progress
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();
  
      await upload.then((err, data) => {
        console.log(err);
        // Fille successfully uploaded
        window.__filelink="https://bucket-name.region.amazonaws.com/"+encodeURIComponent(file?.name);
        setLink(window.__filelink)
        console.log(window.__filelink);
        alert("File uploaded successfully.");
      });
    };
    // Function to handle file and store it to file state
    const handleFileChange = (e) => {
      // Uploaded file
      const file = e.target.files[0];
      // Changing file state
      setFile(file);
      console.log(file);
    };
    return (
      <section className="Container">
      <audio style={{margin:'2%'}} src={link} controls />
      <div className="Song-uploader">
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadFile}>Upload</button>
        </div>
      </div>
      </section>
    );
  }

export default SongUploader;