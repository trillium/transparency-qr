"use client";

import ReactDOMServer from "react-dom/server";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import QRCode from "react-qr-code";
import { CirclePicker, HuePicker } from "react-color";
import clsx from "clsx";

import { getFilename } from "@/lib/getFilename";
import { contrastTextColor } from "@/lib/contrastTextColor";

const ogUrlPlaceholder = "https://trilliumsmith.com/";
const ogColorBg = "#ffffff00";
const ogColorFg = "#ffffffff";

const colorList = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#ffffff",
  "#000000",
];

function QR() {
  const [qrData, setQrData] = useState("");
  const [colorBg, setColorBg] = useState(ogColorBg);
  const [colorFg, setColorFg] = useState(ogColorFg);

  const qrRef = useRef(null);

  const [bgFgSwitch, setBgFgSwitch] = useState(false);

  const handleBgFgSwitch = () => setBgFgSwitch(!bgFgSwitch);

  const handleColorChangeBg = (color: { hex: string }) => {
    setColorBg(color.hex);
  };
  const handleColorChangeFg = (color: { hex: string }) => {
    setColorFg(color.hex);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrData(e.target.value);
  };

  const QrCodeComponent = () => (
    <QRCode
      size={256}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={qrData || ogUrlPlaceholder}
      bgColor={colorBg}
      fgColor={colorFg}
    />
  );

  const downloadAsPNG = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const filename = getFilename(qrData, ".png");
      saveAs(dataUrl, filename);
    }
  };

  const downloadAsSVG = () => {
    let svgString = ReactDOMServer.renderToString(<QrCodeComponent />);
    if (colorBg === ogColorBg) {
      const regex = /<path [^>]*>[\s\S]*?<\/path>/;
      svgString = svgString.replace(regex, "");
    }
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const filename = getFilename(qrData, ".svg");
    saveAs(blob, filename);
  };

  return (
    <div className="flex flex-grow xl:flex-row xl:w-full xl:justify-around max-w-screen-2xl flex-col items-center justify-center">
      <div className="flex items-center flex-col mx-10">
        <div className="my-5 md:my-10 hidden md:block">
          <div className="flex items-center md:flex-row flex-col pb-10 md:pb-8 hidden md:flex">
            <div className="flex flex-col">
              <h2 className="font-mono text-2xl font-bold underline whitespace-pre text-white">
                Foreground Color: {colorFg.padEnd(9, " ")}
              </h2>
              <div className="pb-2 flex justify-center">
                <HuePicker
                  className="w-full"
                  color={colorFg || ogColorFg}
                  onChangeComplete={handleColorChangeFg}
                />
              </div>
              <button
                className={clsx(
                  "bg-blue-500 hover:bg-blue-700 text-white text-base md:text-lg font-bold px-4 rounded",
                  {
                    "opacity-70 cursor-not-allowed": colorFg === ogColorFg,
                  },
                )}
                onClick={() => {
                  if (colorFg !== ogColorFg) {
                    setColorFg(ogColorFg);
                  }
                }}
                disabled={colorFg === ogColorFg}
              >
                Reset Foreground to White
              </button>
            </div>
            <div className="ml-4 pt-4 md:p-0">
              <CirclePicker
                onChangeComplete={handleColorChangeFg}
                colors={colorList}
              />
            </div>
          </div>

          <div className="flex items-center md:flex-row flex-col ">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold underline whitespace-pre text-white font-mono">
                Background Color: {colorBg.padEnd(9, " ")}
              </h2>
              <div className="pb-2 flex justify-center">
                <HuePicker
                  color={colorBg || ogColorBg}
                  onChangeComplete={handleColorChangeBg}
                />
              </div>
              <button
                className={clsx(
                  "bg-blue-500 hover:bg-blue-700 text-white text-base md:text-lg font-bold px-4 rounded",
                  {
                    "opacity-70 cursor-not-allowed": colorBg === ogColorBg,
                  },
                )}
                onClick={() => {
                  if (colorFg !== ogColorBg) {
                    setColorBg(ogColorBg);
                  }
                }}
              >
                Reset Background to Transparent
              </button>
            </div>
            <div className="md:ml-4 ml-0 pt-4 md:p-0 flex flex-row">
              <div className="flex flex-col md:hidden block items-stretch content-stretch bg-gray-100 min-h-full mr-4 md:mr-0">
                <button className="h-1/2 bg-purple-500 w-36">Foreground</button>
                <button className="h-1/2 bg-orange-500 w-36">Background</button>
              </div>
              <CirclePicker
                onChangeComplete={handleColorChangeBg}
                colors={colorList}
              />
            </div>
          </div>
        </div>

        <div className="my-5 md:my-10 md:hidden block">
          <div className="flex items-center md:flex-row flex-col pb-10 md:pb-8 hidden md:flex">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold underline whitespace-pre text-white font-mono">
                {bgFgSwitch ? "Background" : "Foreground"} Color:{" "}
                {colorFg.padEnd(9, " ")}
              </h2>
              <div className="pb-2 flex justify-center">
                <HuePicker
                  className="w-full"
                  color={colorFg || ogColorFg}
                  onChangeComplete={handleColorChangeFg}
                />
              </div>
              <button
                className={clsx(
                  "bg-blue-500 hover:bg-blue-700 text-white text-base md:text-lg font-bold px-4 rounded",
                  {
                    "opacity-70 cursor-not-allowed": bgFgSwitch
                      ? colorFg === ogColorFg
                      : colorBg === ogColorBg,
                  },
                )}
                onClick={() => {
                  if (colorFg !== ogColorFg) {
                    setColorFg(ogColorFg);
                  }
                }}
                disabled={
                  bgFgSwitch ? colorBg === ogColorBg : colorFg === ogColorFg
                }
              >
                Reset Foreground to White
              </button>
            </div>
            <div className="ml-4 pt-4 md:p-0">
              <CirclePicker
                onChangeComplete={handleColorChangeFg}
                colors={colorList}
              />
            </div>
          </div>

          <div className="flex items-center md:flex-row flex-col ">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold underline whitespace-pre text-white font-mono">
                {bgFgSwitch ? "Background" : "Foreground"} Color:{" "}
                {(bgFgSwitch ? colorBg : colorFg).padEnd(9, " ")}
              </h2>
              <div className="pb-2 flex justify-center">
                <HuePicker
                  color={bgFgSwitch ? colorBg : colorFg}
                  onChangeComplete={
                    bgFgSwitch ? handleColorChangeBg : handleColorChangeFg
                  }
                />
              </div>
              <button
                className={clsx(
                  "bg-blue-500 hover:bg-blue-700 text-white text-base md:text-lg font-bold px-4 rounded",
                  {
                    "opacity-70 cursor-not-allowed": colorBg === ogColorBg,
                  },
                )}
                onClick={() => {
                  if (bgFgSwitch) {
                    if (colorFg !== ogColorBg) {
                      setColorBg(ogColorBg);
                    }
                  } else {
                    if (colorFg !== ogColorFg) {
                      setColorFg(ogColorFg);
                    }
                  }
                }}
              >
                {bgFgSwitch
                  ? "Reset Background to Transparent"
                  : "Reset Foreground to White"}
              </button>
            </div>
            <div className="md:ml-4 ml-0 pt-4 md:p-0 flex flex-row">
              <div className="flex flex-col md:hidden block items-stretch content-stretch min-h-full mr-4 md:mr-0">
                <button
                  onClick={handleBgFgSwitch}
                  className={clsx(`h-1/2 w-36 rounded-t box-border border-4`, {
                    "font-bold rounded-t border-white": !bgFgSwitch,
                  })}
                  style={{
                    backgroundColor: colorFg,
                    color: contrastTextColor(colorFg),
                  }}
                >
                  Foreground
                </button>
                <button
                  onClick={handleBgFgSwitch}
                  className={clsx("h-1/2 w-36 rounded-b box-border border-4", {
                    "font-bold rounded-b border-white": bgFgSwitch,
                  })}
                  style={{
                    backgroundColor: colorBg,
                    color: contrastTextColor(colorBg, [ogColorBg]),
                  }}
                >
                  Background
                </button>
              </div>
              <CirclePicker
                onChangeComplete={
                  bgFgSwitch ? handleColorChangeBg : handleColorChangeFg
                }
                colors={colorList}
              />
            </div>
          </div>
        </div>

        <input
          style={{ marginBottom: "6px" }}
          value={qrData}
          onChange={handleInputChange}
          placeholder={ogUrlPlaceholder}
          className="text-black bg-white border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal"
        />
        <div className="flex flex-col md:flex-row w-full">
          <button
            className={clsx(
              "bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded md:rounded-none md:rounded-l md:w-full",
              {
                "opacity-70 cursor-not-allowed": qrData === "",
              },
            )}
            onClick={qrData !== "" ? downloadAsPNG : () => {}}
            disabled={qrData === ""}
          >
            Download QR Code as PNG
          </button>
          <button
            className={clsx(
              "bg-green-600 hover:bg-green-800 text-white font-bold my-2 py-2 px-4 rounded md:rounded-none md:rounded-r md:w-full",
              {
                "opacity-70 cursor-not-allowed": qrData === "",
              },
            )}
            onClick={qrData !== "" ? downloadAsSVG : () => {}}
            disabled={qrData === ""}
          >
            Download QR Code as SVG
          </button>
        </div>
      </div>

      <div className="flex w-3/4 h-full max-w-2xl flex-col items-start justify-center flex-grow xl:mr-10 mr-0">
        <div className="flex items-start h-full w-full justify-center flex-grow">
          <div
            ref={qrRef}
            className=" p-4 flex grow"
            style={{ background: colorBg }}
          >
            <QrCodeComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QR;
