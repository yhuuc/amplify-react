import React, {useState, useCallback} from 'react';
import AWS from 'aws-sdk';

function SongUploader () {
    // Create state to store file
    const [file, setFile] = useState(null);
    const [link, setLink] = useState(null);
    // Function to upload file to s3
    const uploadFile = async () => {
      const S3_BUCKET = process.env.AWS_BUCKET_NAME;  
      const REGION = process.env.AWS_REGION;

      // S3 Credentials
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
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
        window.__filename = file?.name;
        window.__filelink = "https://"+S3_BUCKET+".s3."+REGION+".amazonaws.com/"+encodeURIComponent(file?.name);
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