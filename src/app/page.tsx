import QR from "@/components/QR";
import BackgroundGradient from "@/components/BackgroundGradient";

export default function Home() {
  return (
    <BackgroundGradient classes="flex justify-center items-center flex-col min-h-screen w-full h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate gradient-bg">
      <QR />
    </BackgroundGradient>
  );
}
