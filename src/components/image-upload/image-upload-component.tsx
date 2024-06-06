import React, { ChangeEvent, DragEvent, Fragment } from 'react';
import { Lucide } from '../Lucide';
import imageUploadPic from "@/assets/images/pngs/imageUpload.png";

export interface UploadedFile {
  id?: string;
  url?: string;
  file: File;
}

interface Props {
  allowMultiple?: boolean;
  name: string;
  label: string;
  onChange?: (file: UploadedFile[]) => void;
  onDrop?: (file: UploadedFile[]) => void;
  onRemove?: (index: number) => void;
  value: UploadedFile[];
}

const UploadImage: React.FC<Props> = ({ allowMultiple = false,name, label, onChange ,onDrop , onRemove, value: selectedFiles}) => {

  const mapFilesToObject = (files: FileList | null, callBack?: (file: UploadedFile[]) => void ) => {
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map(file => ({
        file: file,
        url: URL.createObjectURL(file)
      }));
     callBack && callBack( allowMultiple? [...selectedFiles, ...newFiles]: [...newFiles])
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
   mapFilesToObject(files,onChange)
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    mapFilesToObject( files , onDrop)
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation();
    onRemove && onRemove(index)
  };

  return (
    <div className="container mx-auto mt-8">
      <p className='mb-3 text-primary font-semibold '>{label}</p>
      <div className="max-w-lg mx-auto">
        <div
          className="upload__container border-dotted border-2 border-gray-300 rounded-lg p-5 text-center cursor-pointer relative flex flex-wrap"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleClick}
        >
          {selectedFiles.length > 0 ? (
            selectedFiles.map((uploadedFile, index) => (
              <div key={index} className={`bg-gray-100 flex items-center pl-2 rounded-lg relative mb-4 mr-2`} style={{ flexBasis: selectedFiles?.length <= 1 ? "calc(100% - 8px)": "calc(50% - 8px)" }}>
                <div >
                  <img src={uploadedFile?.url} alt="Selected" className="mx-auto mt-4 mb-4" style={{ maxWidth: "70%" }} />
                  <button className="absolute top-5 right-3 transform translate-x-1/2 -translate-y-1/2 text-gray-600 flex justify-center w-8 h-8 rounded-full" onClick={(e) => handleRemove(e, index)}>
                    <Lucide.circlex strokeWidth={2} size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Fragment>
              <div className='flex justify-center mb-2 w-full'>
                <img src={imageUploadPic} alt="upload" />
              </div>
              <p className="text-gray-600">{allowMultiple ? 'Drag & drop your image(s) here or click to select' : 'Drag & drop your image or click to select an image '}</p>
            </Fragment>
          )}
        </div>
        <input
          type="file"
          id="fileInput"
          name={name}
          className="hidden"
          onChange={handleFileChange}
          multiple={allowMultiple}
        />
      </div>
    </div>
  );
};

export default UploadImage;
