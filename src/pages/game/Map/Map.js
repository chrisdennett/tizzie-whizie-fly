import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { obstacles } from "../gameLogic/gameItems";

export const Map = ({ progress = 0 }) => {
  const [markers, setMarkers] = useState([]);
  const pathRef = useRef(null);

  const lakeOutline = `#3b6b98c2`;
  const lakeFill = `#3b6b9833`;
  const islandFill = `rgba(255,255,255,0.8)`;
  // without this there's a tiny blob at the line at the start
  const progressStroke = progress > 0 ? `#3b6b98` : "rgba(0, 0, 0, 0)";
  const dashedStroke = `rgba(255,255,255,0.5)`;

  const len = 186.47337341308594;

  useEffect(() => {
    if (pathRef) {
      const obArr = obstacles();
      const paddingAtEnd = 200;
      const totalTime = obArr[obArr.length - 1].triggerMs + paddingAtEnd;

      let pts = [];

      for (let ob of obArr) {
        const obPos = ob.triggerMs / totalTime;
        const distAlongPath = obPos * len;
        const pt = pathRef.current.getPointAtLength(distAlongPath);
        let colour = "brown";
        if (ob.type === "island") colour = "green";
        if (ob.type === "pike") colour = "salmon";
        if (ob.type === "bownessie") colour = "yellow";

        pts.push({ x: pt.x, y: pt.y, colour });
      }

      setMarkers(pts);
    }
  }, [pathRef]);

  const outlineVariants = {
    hidden: { pathLength: 0, fillOpacity: 0 },
    visible: { pathLength: 1, fillOpacity: 1, transition: { duration: 3 } },
  };

  const islandVariants = {
    hidden: { pathLength: 0, fillOpacity: 0 },
    visible: {
      pathLength: 1,
      fillOpacity: 1,
      transition: { duration: 3, delay: 0.5 },
    },
  };

  const markerVarients = {
    hidden: { fillOpacity: 0 },
    visible: {
      fillOpacity: 1,
      transition: { duration: 3, when: "beforeChildren", delay: 0.3 },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="-4 0 180.301 45.432"
      width="100%"
      // opacity={0.55}
    >
      <motion.g
        fillOpacity="1"
        stroke={lakeOutline}
        strokeDasharray="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="4"
        strokeWidth="0.265"
        display="inline"
        transform="translate(-3.879 -111.8)"
      >
        {/* LAKE OUTLINE */}
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={outlineVariants}
          fill={lakeFill}
          fillRule="evenodd"
          d="M180.047 124.113l-.252-.882-1.73-.436 1.785-.86-.456-.659-2.19.577-.953-.523 2.163-.913-2.391.216-.219-.906 1.384-1.07-.65-.557-.323-.438-1.105.302h-.892l-.893.18-1.664-.371-.39-.279-.893-.244.462-1.034v-2.404l-.446-.522h-.837l-.836-.278v-.523l-.446-.557h-.446l-.512 1.21v.278l.512.95.649 1.256-1.04.59-.243.931-.836.558v.522l.446.801-.576.95-.446.801-1.56.477 1.948.587-.779 1.061-1.363.947-.901.087-1.71.821.379 1.782-.997-1.278-.424 1.102-1.096-.58-.446-.523-1.738.714-.446.279-.836.8-1.283 1.324-.837-.522-.77-1.386-.95-.687-1.283.279-.446.522-.975-1.58-.892-.244-.39.244-.065 1.207.203.93-.837.244-.892.28-.837.8-.446 1.08-.39 1.08h-.447l-.836 1.045-1.477 1.04-.836.836-1.283 1.045-.837 1.88-1.338.28-2.566 1.602-2.119.522-1.729-.278-2.435-.612-1.917.176h-2.119l-1.664.282-.707-.065-.308-.717-2.517 1.688-2.37-.257-2.119-.068-1.924.26-3.92.068-.423.95-3.654-.91-.836.28-1.087 1.607-1.088-1.886-.837-.557-3.239.927.11 1.007 1.043.327-.162 1.089-1.478-.477-1.283-1.602-1.085-.271-.3-1.273-1.814.201-1.339-.278-1.282-1.08-2.956-1.324-1.73-.278h-.445l-3.815-2.016-1.008-.171-1.6-.698-2.897.915-1.283.801-.82-.866-1.996.405-.39.523-.828 1.664-1.608.974-.867-.904-.092-1.039-1.208-1.475-1.673-1.99-1.282-.8-1.544-1.104-1.412.302-.698-.476-.119 1.046-1.424-1.325-1.404-1.32-2.768.906-.772-.955-1.793-.065-.837-1.272.082 1.617-2.33-.343-.764-1.559-.893-.213-1.023.606-1.031-.309-1.152 1.28-.902.279-.892.522-1.234.841c-.017-.497-.682.32-.698-.344l-1.332.566-2.127-.539-1.08.52-1.08.209-1.599 1.37-1.234.064-1.283-.522h-.892l.007.804-2.387.603-1.085.253-1.098-1.7-.763-.523-1.235.76-1.916-.11-.828.779-.755.046-.352-.91-1.835-.06-.459-1.584h-.836c-.315.127-.12.76-.504 1.21l-.779.392-2.566.557-1.728.244h-.837c-1.143.069-2.013 1.604-2.846 1.741-.777.128-1.539-1.146-2.007-.97-1.329.498-1.333 1.165.436 1.87l1.283.279 2.76.328h2.436l3.012.278.836.558 2.623-.845c.722.468 1.117 1.356 2.171 1.99l1.352.29.82.797 2.582.217.51-1.007 1.6-.44 1.413-.306 1.275-.996.836-.522 3.97.695 1.087-.906.39-.244h.447l1.29.676 1.081-.673 1.875.43.697-.39 1.478.633 1.73.022h1.729l1.728.802 2.566.557 1.283-.279 1.282.523 1.673 1.08 2.622 1.602 4.44 1.25 2.12.802 3.012 1.045 2.565.8 3.012.802 2.565.801 1.729.801 1.283-.244 1.282-.557.44-2.06.445-.8 1.283.278.837 1.045.503 1.293 2.508 1.389.837.522.707.387 1.867-.303.762.607.504.752.772.26.614-.726.35 1.854.447.523.837.278h1.282l1.664.322.756-.47 1.092-.423 1.18 1.498.772-1.274-1.054-3.05 1.282 1.08 2.005 3.223.64-1.277h.837l.893-.279.836-.279.446-.243.837.8 1.283 1.603.836 1.045.446.279v.278l.447.801v.802h1.673l.892.243.837-.522v-.279l.446-.244h1.283l1.283.244 1.282.279.837.801 1.729.801.836.279.446.801.837-.279v-1.323l1.729-.558.246-1.257 1.28-.542 1.665-.237 1.607.275 1.161.63 1.136-.756 2.323.5 1.218.451 2.191.135v-.244l1.299-.755.243-.934.836-1.08c.303-.186-.043-1.087.26-1.274l.633-.496.836-1.045 1.283-1.602.187-1.104.447-.557 1.728-1.045.902-.584 1.218.027 1.103.433.447.801h1.282l1.283-1.323.569-.645-.244-1.09-.417-1.131.994-.074 1.217.535.447-.801.836-.279-.9-.928.689-.584.836-.244 1.356.05.958.712 1.413.13 1.855-.324 2.87-1.19 1.977-.758.615-.8.638.754 2.12-.523 1.282-1.637 1.283-1.045v-1.602l.948-1.67-.583-2.094 1.673-.174 1.144.497.446-.278.837-.279h.446l.837-.828 1.729.07 1.218-1.69z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          fillRule="evenodd"
          d="M115.44 147.12l.195 1.256-1.283.801h-.892l.332-.977-.918-.463-.544.645-.99-.528-.836-.558-.892-1.08-2.12-1.044-1.282-.802-.837-1.08-.77-1.404 1.16.604 1.73.8.69-.454.925-.609 1.396 1.865 1.608-.955c.022.76 2.03.966.585 2.214l.957 1.277.698.149z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M93.51 145.33c-.13-.065 0-.65.195-.52s1.168.585.909 1.04c-.26.454-.974-.455-1.104-.52z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M34.686 134.422s-.584-.584-.909-.194c-.324.39.91.194.91.194z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M62.085 131.176c.034.172.715.714.39.974-.325.26-.65.39-.714-.065-.065-.454.166-.936.324-.909.159.028-.033-.172 0 0z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M44.345 129.186s.909-.91.324-.65c-.584.26-.324.65-.324.65z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M75.655 135.137c.198-.13.974-.455.78 0-.196.454-.814.79-1.04.584-.225-.205.062-.455.26-.584z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M100.847 141.89c.167-.16.13-.78-.325-.78-.454 0-.72.371-.584.584.136.213.741.355.909.195z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          strokeOpacity="1"
          d="M111.286 142.404c.29-.152.548-.788.598-.97.05-.181-.454-.389-.65 0-.194.39-.28.655-.204.83.077.175-.032.291.256.14z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M111.012 140.711c.057-.126-.505-.207-.689-.184-.183.023-.505.276-.413.299.092.023 1.045.011 1.102-.115z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M115.35 142.685c.253.092 1.014.256 1.06.417.046.16.272.937.524.869.253-.07.118-.757.026-.85-.091-.091-.21-.344-.324-.505-.115-.16-.574-.298-.666-.252-.091.046-.964-.414-1.216-.276-.207.023.344.505.597.597z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M118.082 145.072c.123.128 0 .551-.138.528-.137-.023-.482-.206-.367-.413.115-.206.382-.242.505-.115z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M119.39 148.171c.076.095.804-.069.712.161-.092.23-.23.413-.39.413s-.689.023-.643-.069c.046-.092.226-.533.322-.505.095.028-.076-.095 0 0z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M120.4 149.595s.965-.207.873.023c-.092.23-.78.344-.78.344s-.597-.023-.597-.16c0-.139.505-.207.505-.207z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M125.956 150.054c.028-.093-.368-.46-.482-.322-.115.138-.355.386-.023.597.331.21.453-.19.505-.275.051-.086-.028.092 0 0z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M167.642 122.439c.05-.198-.138-.505-.321-.368-.184.138-.528.62-.368.62.161 0 .639-.055.69-.252z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M171.292 118.56c.034-.037.184-.345-.023-.3-.207.047-.987.3-.735.345.253.046.631-.042.758-.046.126-.004-.034.037 0 0z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M112.309 149.572c.04-.094.103-.356-.103-.253-.207.103-.31.39-.207.379.103-.012.27-.033.31-.126z"
        />
        <motion.path
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          fill={islandFill}
          d="M113.17 150.754c-.022.013-.023-.103-.138-.07-.115.035-.356.368-.275.38.08.011.336-.349.413-.31.077.038.022-.014 0 0z"
        />
      </motion.g>

      {/* GUIDE LINE */}
      <g display="inline" transform="translate(65.43 -65.43)">
        <motion.path
          ref={pathRef}
          fill="none"
          stroke={dashedStroke}
          initial={"hidden"}
          animate={"visible"}
          variants={islandVariants}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="0.529"
          d="M-65.074 86.755c2.67 1.464 12.57 1.462 20.27.714 10.92-1.061 24.245-2.732 33.509 1.622C.477 94.756 6.14 91.48 14.225 93.399c7.227 1.717 6.724 3.365 12.191 4.411 6.482 1.24 8.362-5.732 13.228-2.67 18.155 11.42 28.599 5.983 40.17-4.263 9.508-11.298 22.471-11.143 30.684-13.037"
          color="#000"
          display="inline"
          overflow="visible"
          paintOrder="markers stroke fill"
        />

        {/* MARKERS */}
        <motion.g
          initial={"hidden"}
          animate={"visible"}
          variants={markerVarients}
        >
          {markers.map((marker, index) => (
            <ellipse
              custom={index}
              key={index}
              cx={marker.x}
              cy={marker.y}
              rx="0.5"
              ry="0.5"
              fill={marker.colour}
            />
          ))}
        </motion.g>
      </g>

      {/* PROGRESS LINE */}
      <g display="inline" transform="translate(65.43 -65.43)">
        <path
          className="path"
          fill="none"
          pathLength={len}
          strokeDasharray={len}
          strokeDashoffset={len - progress * len}
          fillOpacity="0.133"
          stroke={progressStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="1"
          d="M-65.074 86.755c2.67 1.464 12.57 1.462 20.27.714 10.92-1.061 24.245-2.732 33.509 1.622C.477 94.756 6.14 91.48 14.225 93.399c7.227 1.717 6.724 3.365 12.191 4.411 6.482 1.24 8.362-5.732 13.228-2.67 18.155 11.42 28.599 5.983 40.17-4.263 9.508-11.298 22.471-11.143 30.684-13.037"
          color="#000"
          display="inline"
          overflow="visible"
          paintOrder="markers stroke fill"
        />
      </g>
    </motion.svg>
  );
};
