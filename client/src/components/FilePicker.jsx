import React from 'react'

import CustomButton from './CustomButton'

// the file picker is where we gon upload our own imgs and display em as the logo and also as the entire gradient bg.
const FilePicker = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input 
          id="file-upload"
          type="file"
          accept="image/*" // the file picker accepts only the img
          onChange={(e) => setFile(e.target.files[0])} //it takes the 1st img that we passed.
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        {/* lets impl which file that we uploaded  */}
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? "No file selected" : file.name}
        </p>
      </div>
      {/* wrapper for the btns   */}
      {/* btn for the logo picker */}
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton 
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        {/* btn for the texture / cust outline btn that we imp in the customBtn */}
        <CustomButton 
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker