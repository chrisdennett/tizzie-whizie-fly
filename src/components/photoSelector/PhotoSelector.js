import React from "react";
import styled from "styled-components";

const PhotoSelector = ({ onPhotoSelected }) => {
  const onFileSelect = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const selected = e.target.files;

      onPhotoSelected(selected[0]);
    }
  };

  return (
    <Holder>
      <input
        onChange={onFileSelect}
        multiple={false}
        capture="environment"
        type="file"
        accept="image/*;capture=camera"
        name={"photo-selector"}
        id={"photo-selector"}
      />

      <label htmlFor={"photo-selector"}>
        <button label="add image" icon="add_a_photo">
          ADD PICTURE
        </button>
      </label>
    </Holder>
  );
};

export default PhotoSelector;

const Holder = styled.div`
  display: inline-block;
  position: relative;
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  label {
    padding: 10px 0;
    cursor: pointer;
  }

  button {
    pointer-events: none;
    padding: 15px 10px;
    border: none;
    border-radius: 5px;
  }
`;

// .quickPhotoSelector--customInputButton{
//     cursor: pointer;
//     margin-top: 10px;
//     outline: none;
//     text-align: center;
// }
