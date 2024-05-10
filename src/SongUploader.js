import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
// import AudioPlayer from "./AudioPlayer";

const SongUploader = () => {
  const getUploadParams = ({ meta }) => {
    const url = "https://httpbin.org/post";
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };
  // const getUploadParams = async ({ meta: { name } }) => {
  //   const { fields, uploadUrl, fileUrl } =
  //     await myApiService.getPresignedUploadParams(name);
  //   return { fields, meta: { fileUrl }, url: uploadUrl };
  // };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <div className="Song-uploader">
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        // restrict file type to audio
        accept="audio/*"
        inputContent={(files, extra) =>
          extra.reject
            ? "Audio files only"
            : "DRAG or CLICK to upload your song here! (mp3., wav., flac.)"
        }
        // restrict file number to 1
        maxFiles={1}
        multiple={false}
        // disable submit button when file number is 0
        // submitButtonDisabled = {files => files.length < 1}
        styles={{
          dropzone: { width: 400, minHeight: 200, maxHeight: 250 },
          dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
          inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
        }}
      />
    </div>
  );
};

export default SongUploader;
