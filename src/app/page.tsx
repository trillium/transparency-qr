import QR from "@/components/QR";
import BackgroundGradient from "@/components/BackgroundGradient";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundGradient classes="flex justify-start items-center flex-col min-h-screen w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-bg">
        <QR />
      </BackgroundGradient>
    </div>
  );
}
