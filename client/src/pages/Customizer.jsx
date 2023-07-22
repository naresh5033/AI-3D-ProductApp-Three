import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

// the customizer is the main part of our app, as it contains all the busingess logic
const Customizer = () => {
  const snap = useSnapshot(state); // since we wana makesure that we re not in the home page

  const [file, setFile] = useState(""); //for upload file

  const [prompt, setPrompt] = useState(""); //for ai prompt
  const [generatingImg, setGeneratingImg] = useState(false); //loading state, are we currently generating the img or not.

  // the activeEditorTab will show us which one are we changing the color, ai prompt, or file
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return ( // AI picker
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    //call our backend to generate the ai image
    try {
      setGeneratingImg(true); //we wana start loading

      const response = await fetch("https://ai-3d-product-backend.onrender.com/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });


      //once we get the res from our svr, we can now render the b64 str as the img
      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally { //reset our loaders
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  // the handleDecals(), the type can be a logo or texture
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result; // updating the state

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  //are we currently showing the logo or the texture or the both.
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default: //the default val from our state/store
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    } // this switch stmt is really changing the state, but after that ⬇️

    // after setting the state, activeFilterTab is updated
    // toggle the down btns (logo and the texture)
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  // the file picker tab logic
  const readFile = (type) => {
    reader(file).then((result) => {
      // we wana pass that file to the decals of the shirt depending on the type of the img.
      handleDecals(type, result);
      setActiveEditorTab(""); //reset
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && ( //only if we re not in the home/intro page
        <>
          {/* for the editor tabs, in the left side */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {/* the editor tabs from conf/constants */}
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          {/* this is for the back btn */}
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)} // since we wana go back to home
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          {/* for the filter tabs in bottom, just a sim as the editor tabs */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
