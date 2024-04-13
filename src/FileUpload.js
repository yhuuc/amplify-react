// Github page
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function FileUpload() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles)
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}
export default FileUpload;

// // Official website
// import React from "react";
// import { useDropzone } from "react-dropzone";

// function FileUpload (props) {
//     const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    
//     const files = acceptedFiles.map(file => (
//         <li key={file.path}>
//             {file.path} - {file.size} bytes
//         </li>
//     ));
    
//     return (
//         <section className="container">
//             <div {...getRootProps({className: 'dropzone'})}>
//                 <input {...getInputProps()} />
//                 <p>Upload your song here</p>
//                 <p>Drag and drop, or click to select files</p>
//             </div>
//             <aside>
//                 <h4>Files</h4>
//                 <ul>{files}</ul>
//             </aside>
//         </section>
//     );
// }

// export default FileUpload;



// Medium post
// import React from 'react';
// import { useDropzone } from 'react-dropzone';

// const FileUpload = () => {
//   const { getRootProps, getInputProps } = useDropzone();
//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       <p>Drag and drop files here or click to browse.</p>
//     </div>
//   );
// };
// export default FileUpload;