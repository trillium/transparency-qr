"use client";

import ReactDOMServer from "react-dom/server";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import { QRCode } from "react-qrcode-logo";
import { HuePicker } from "react-color";
import clsx from "clsx";

const ogUrlPlaceholder = "https://trilliumsmith.com/";
const ogColorBg = "#ffffff00";
const ogColorFg = "#ffffffff";

function QR() {
  const [qrData, setQrData] = useState("");
  const [colorBg, setColorBg] = useState(ogColorBg);
  const [colorFg, setColorFg] = useState(ogColorFg);

  const qrRef = useRef(null);

  const handleColorChangeBg = (color: { hex: string }) => {
    console.log(color);
    setColorBg(color.hex);
  };
  const handleColorChangeFg = (color: { hex: string }) => {
    console.log(color);
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
    const svgString = ReactDOMServer.renderToString(<QrCodeComponent />);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const filename = getFilename(qrData, ".svg");
    saveAs(blob, filename);
  };

  return (
    <div className="font-mono flex items-center flex-col bg-gradient-to-r from-blue-900 to-green-900 min-h-screen">
      <div className="flex items-center flex-col">
        <div className="my-10">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold underline">
              Foreground Color: {colorFg}
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
                "bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-4 rounded-l",
                {
                  "opacity-70 cursor-not-allowed": colorFg === ogColorFg,
                }
              )}
              onClick={() => {
                if (colorFg !== ogColorFg) {
                  setColorFg(ogColorFg);
                }
              }}
              disabled={colorFg === ogColorFg}
            >
              Reset Foreground Transparency
            </button>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold underline">
              Background Color: {colorBg}
            </h2>
            <div className="pb-2 flex justify-center">
              <HuePicker
                color={colorBg || ogColorBg}
                onChangeComplete={handleColorChangeBg}
              />
            </div>
            <button
              className={clsx(
                "bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-4 rounded-l",
                {
                  "opacity-70 cursor-not-allowed": colorBg === ogColorBg,
                }
              )}
              onClick={() => {
                if (colorFg !== ogColorBg) {
                  setColorBg(ogColorBg);
                }
              }}
            >
              Reset Background Transparency
            </button>
          </div>
        </div>

        <input
          style={{ marginBottom: "6px" }}
          value={qrData}
          onChange={handleInputChange}
          placeholder={ogUrlPlaceholder}
          className="text-black bg-white border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal"
        />
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded-l"
            onClick={downloadAsPNG}
          >
            Download QR Code as PNG
          </button>
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold my-2 py-2 px-4 rounded-r"
            onClick={downloadAsSVG}
          >
            Download QR Code as SVG
          </button>
        </div>
      </div>

      <div>
        <div
          ref={qrRef}
          className="max-w-md p-4"
          style={{ background: colorBg }}
        >
          <QrCodeComponent />
        </div>
      </div>
    </div>
  );
}

const getFilename = (name: string, ext: string): string => {
  const filename =
    "qr_" +
    name
      .replace(/(^\w+:|^)\/\//, "")
      .replace(/\//g, "_")
      .replace(/\./g, "_")
      .replace(/_$/, "") +
    ext;
  return filename;
};

export default QR;
