import { useEffect, useState } from "react";
import { SectionId, SECTIONS } from "@/lib/portfolio";
import { ScreenContent } from "./ScreenContent";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Wifi,
  Search,
  Menu,
  Bluetooth,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

interface Props {
  active: SectionId;
}

/**
 * BrowserScreen — 1:1 replica of the Yosemite macOS desktop and Chrome browser.
 */
export function BrowserScreen({ active }: Props) {
  const section = SECTIONS.find((s) => s.id === active)!;
  const [typedUrl, setTypedUrl] = useState(section.url);

  const now = new Date();

  const day = now.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  console.log(day); // e.g., Monday
  console.log(time); // e.g., 04:32 PM

  useEffect(() => {
    let i = 0;
    setTypedUrl("");
    const interval = window.setInterval(() => {
      i++;
      setTypedUrl(section.url.slice(0, i));
      if (i >= section.url.length) window.clearInterval(interval);
    }, 28);
    return () => window.clearInterval(interval);
  }, [section.url]);

  return (
    <div
      className="h-full w-full flex flex-col relative bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1445264618000-f1e069c5920f?q=80&w=2940&auto=format&fit=crop')",
      }}
    >
      {/* 1. Yosemite Menu Bar */}
      <div
        className="h-[28px] w-full bg-white/40 backdrop-blur-md flex items-center justify-between px-3 text-[13px] text-black shadow-[0_1px_1px_rgba(0,0,0,0.1)] z-50 flex-none"
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 400,
          letterSpacing: "0.2px",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div className="flex items-center gap-[18px] h-full">
          <span className="size-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M447.1 332.7C446.9 296 463.5 268.3 497.1 247.9C478.3 221 449.9 206.2 412.4 203.3C376.9 200.5 338.1 224 323.9 224C308.9 224 274.5 204.3 247.5 204.3C191.7 205.2 132.4 248.8 132.4 337.5C132.4 363.7 137.2 390.8 146.8 418.7C159.6 455.4 205.8 545.4 254 543.9C279.2 543.3 297 526 329.8 526C361.6 526 378.1 543.9 406.2 543.9C454.8 543.2 496.6 461.4 508.8 424.6C443.6 393.9 447.1 334.6 447.1 332.7zM390.5 168.5C417.8 136.1 415.3 106.6 414.5 96C390.4 97.4 362.5 112.4 346.6 130.9C329.1 150.7 318.8 175.2 321 202.8C347.1 204.8 370.9 191.4 390.5 168.5z" />
            </svg>
          </span>
          <span className="font-bold -ml-1">Messages</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Buddies</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="flex items-center gap-[14px]">
          <Bluetooth className="h-3 w-3 opacity-80" />
          <Wifi className="h-[14px] w-[14px] opacity-80" />
          {/* Yosemite Battery Icon */}
          <div className="flex items-center opacity-80">
            <div className="w-[20px] h-[10px] border border-black rounded-[2px] p-[1px] relative">
              <div className="w-full h-full bg-black rounded-[0.5px]"></div>
              <div className="absolute right-[-2.5px] top-[2px] w-[1.5px] h-[4px] bg-black rounded-r-[1px]"></div>
            </div>
          </div>
          <span>
            {day} {time}
          </span>
          <Search className="h-[14px] w-[14px] opacity-80" />
          <div className="flex flex-col gap-[2px] opacity-80 w-[14px] items-end pb-[1px]">
            <div className="w-full h-[2px] bg-black rounded-full"></div>
            <div className="w-3/4 h-[2px] bg-black rounded-full"></div>
            <div className="w-full h-[2px] bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Safe desktop area - matching the Chrome window placement */}
      <div className="flex-1  relative overflow-hidden flex flex-col">
        <div className="w-full h-full bg-white flex flex-col relative z-20 overflow-hidden">
          {/* Chrome Tab Bar (Yosemite style) */}
          <div className="h-[34px] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0] flex items-end px-2 flex-none relative">
            {/* Traffic Lights */}
            <div className="absolute left-[12px] top-[12px] flex gap-[8px]">
              <div className="h-[12px] w-[12px] rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-inner"></div>
              <div className="h-[12px] w-[12px] rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-inner"></div>
              <div className="h-[12px] w-[12px] rounded-full bg-[#27c93f] border border-[#1aab29] shadow-inner"></div>
            </div>

            {/* Active Tab */}
            <div className="ml-[76px] w-[240px] h-[28px] bg-white rounded-t-[4px] flex items-center px-3 gap-2 border border-black/10 border-b-white relative z-10">
              <div className="w-3 h-3 bg-gradient-to-br from-red-400 via-yellow-400 to-green-500 rounded-full flex-none"></div>
              <span className="text-[12px] text-gray-800 font-medium truncate flex-1 font-sans">
                chrome://apps
              </span>
              <div className="w-3 h-3 text-gray-400 hover:text-gray-700 cursor-pointer flex items-center justify-center text-[10px]">
                ✕
              </div>
            </div>

            {/* Inactive Tab area trailing */}
            <div className="flex-1 h-[28px] flex items-center px-2">
              <div className="w-[20px] h-[14px] bg-black/10 rounded-sm"></div>
            </div>

            {/* Right side user icon */}
            <div className="absolute right-[12px] top-[10px] flex items-center gap-2">
              <span className="text-[11px] font-medium text-gray-600">
                Killian
              </span>
            </div>
          </div>

          {/* Chrome Address Bar */}
          <div className="h-[36px] bg-white border-b border-gray-300 flex items-center px-2 gap-2 flex-none">
            <div className="flex items-center gap-1 text-gray-500">
              <ChevronLeft className="h-5 w-5" />
              <ChevronRight className="h-5 w-5 opacity-40" />
              <RotateCw className="h-4 w-4 ml-1" />
            </div>
            <div className="flex-1 h-[26px] bg-white border border-gray-300 rounded-[3px] flex items-center px-2 ml-1 shadow-inner relative group">
              <div className="w-3 h-3 border-2 border-gray-400 rounded-sm mr-2 group-hover:border-blue-500 transition-colors"></div>
              <span className="text-[13px] text-gray-800 flex-1 font-sans truncate">
                {typedUrl || "chrome://apps"}
              </span>
              <Star className="h-4 w-4 text-gray-400" />
              <span className="absolute right-[28px] w-px h-[16px] bg-gray-200"></span>
            </div>
            <div className="flex items-center gap-3 px-2 text-gray-500">
              {SECTIONS.map((s) => (
                <div
                  key={s.id}
                  className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  {s.id === active && (
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                  )}
                </div>
              ))}
              <Menu className="h-4 w-4" />
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 relative overflow-hidden bg-[#f5f5f5]">
            <ScreenContent active={active} />
          </div>
        </div>
      </div>

      {/* Yosemite Dock */}
      <div className="absolute bottom-0 w-full flex justify-center pb-1">
        <div className="h-[64px] bg-white/30 backdrop-blur-xl border border-white/40 rounded-t-[4px] rounded-b-xl px-2 py-1 flex items-end gap-[6px] shadow-[0_-2px_15px_rgba(0,0,0,0.15)] z-50">
          {/* Finder */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-b from-blue-300 to-blue-500 rounded-[10px] overflow-hidden border border-black/10 shadow-md relative">
              <div className="absolute inset-x-0 h-1/2 bottom-0 bg-blue-600/20"></div>
              <div className="absolute top-[10px] left-[8px] w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center border border-blue-400">
                <div className="w-[6px] h-[6px] bg-blue-500 rounded-full"></div>
              </div>
              <div className="absolute top-[10px] right-[8px] w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center border border-blue-400">
                <div className="w-[6px] h-[6px] bg-blue-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-[8px] inset-x-[12px] h-[10px] border-b-2 border-white rounded-full"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-black/10"></div>
            </div>
            <div className="absolute -bottom-[5px] w-1 h-1 bg-black/50 rounded-full blur-[0.5px]"></div>
          </div>

          {/* Launchpad */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border border-black/10 shadow-md flex items-center justify-center text-[22px]">
              🚀
            </div>
          </div>

          {/* Safari */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border border-black/10 shadow-md flex items-center justify-center relative overflow-hidden">
              <div className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center relative border border-blue-300">
                <div className="w-full border-t border-gray-200 absolute top-1/2"></div>
                <div className="h-full border-l border-gray-200 absolute left-1/2"></div>
                <div className="w-1.5 h-[26px] bg-red-500 absolute rotate-45 rounded-sm origin-center shadow-sm"></div>
                <div className="w-1.5 h-[13px] bg-gray-200 absolute rotate-45 top-[6px] left-[6px] rounded-sm origin-center z-10"></div>
              </div>
            </div>
            <div className="absolute -bottom-[5px] w-1 h-1 bg-black/50 rounded-full blur-[0.5px]"></div>
          </div>

          {/* Mail */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-blue-400 to-blue-200 rounded-[8px] border border-black/10 shadow-md flex items-center justify-center overflow-hidden">
              <div className="w-[44px] h-[32px] bg-white rounded-[4px] relative border border-gray-300 shadow-inner flex overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1/2 border-b border-gray-200 rotate-[20deg] origin-left scale-[1.5]"></div>
                <div className="absolute top-1 right-1 w-6 h-6 border-[1.5px] border-blue-400 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-r from-yellow-700 to-amber-600 rounded-[8px] border border-black/10 shadow-md flex relative overflow-hidden">
              <div className="w-[8px] h-full bg-black/20 border-r border-black/30"></div>
              <div className="flex-1 flex flex-col justify-center items-center gap-1 opacity-70">
                <div className="w-4 h-[2px] bg-yellow-900 rounded-full"></div>
                <div className="w-6 h-[2px] bg-yellow-900 rounded-full"></div>
                <div className="w-5 h-[2px] bg-yellow-900 rounded-full"></div>
              </div>
              <div className="absolute right-0 inset-y-2 w-[4px] flex flex-col justify-between py-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-full h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-l-sm border-y border-black/20"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-white rounded-[8px] border border-black/10 shadow-md flex flex-col overflow-hidden">
              <div className="h-[14px] bg-gradient-to-b from-red-500 to-red-600 border-b border-red-700 font-sans text-[7px] text-white font-medium flex items-center justify-center tracking-widest">
                JUL
              </div>
              <div className="flex-1 flex items-center justify-center pb-1 font-sans text-[26px] font-light text-black tracking-tighter">
                16
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-white rounded-[8px] border border-black/10 shadow-md overflow-hidden relative">
              <div className="h-[12px] bg-gradient-to-b from-amber-400 to-yellow-400 border-b border-yellow-500 overflow-hidden relative">
                <div className="absolute w-[60px] h-[5px] bg-white/30 top-1 -left-2 rotate-12"></div>
              </div>
              <div className="flex-1 bg-[#fffbe6] flex flex-col gap-[3px] pt-2 px-2 relative">
                <div className="absolute right-0 top-0 h-full w-[1px] bg-red-400/30"></div>
                <div className="w-full h-px bg-blue-300/50"></div>
                <div className="w-1/2 h-px bg-blue-300/50"></div>
              </div>
            </div>
          </div>

          {/* Maps */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#cce5ff] to-[#99ccff] rounded-[8px] border border-black/10 shadow-md overflow-hidden relative">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-blue-400/30"></div>
                <div className="border-b border-blue-400/30 bg-green-200/50"></div>
                <div className="border-r border-blue-400/30 bg-[#ffd699]"></div>
                <div></div>
              </div>
              <div className="absolute shadow-[0_2px_4px_rgba(0,0,0,0.2)] top-[8px] left-[18px]">
                <div className="w-[12px] h-[12px] bg-red-500 rounded-full border border-red-700 z-10 relative"></div>
                <div className="w-0.5 h-[10px] bg-black/40 mx-auto -mt-1 relative z-0"></div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-b from-[#6cfb6c] to-[#25d366] rounded-full shadow-md flex items-center justify-center relative overflow-hidden border border-black/10">
              <div className="absolute bottom-[2px] left-[8px] w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#25d366] border-r-[4px] border-r-transparent -rotate-12"></div>
              <div className="w-[28px] h-[18px] bg-white rounded-[10px] flex items-center justify-center relative z-10 shadow-inner">
                <div className="flex gap-1 justify-center items-center h-full">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-[5px] w-1 h-1 bg-black/50 rounded-full blur-[0.5px]"></div>
          </div>

          {/* FaceTime */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-b from-[#6cfb6c] to-[#25d366] rounded-[10px] border border-black/10 shadow-md flex flex-row items-center justify-center p-[6px]">
              <div className="w-[24px] h-[18px] bg-white rounded-l-[4px] border border-gray-200"></div>
              <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[6px] border-y-transparent"></div>
            </div>
          </div>

          {/* Photo Booth / Presentation app */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-b from-red-600 to-[#800000] rounded-[8px] border border-black/10 shadow-md flex overflow-hidden">
              <div className="w-1/2 h-full bg-red-500/30 rounded-br-full shadow-lg"></div>
              <div className="w-1/2 h-full bg-red-700/30 rounded-bl-full shadow-lg"></div>
            </div>
          </div>

          {/* iTunes */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-pink-400 to-red-500 rounded-full border border-black/10 shadow-md flex items-center justify-center text-white text-[24px]">
              🎵
            </div>
          </div>

          {/* iBooks */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-orange-400 to-orange-500 rounded-full border border-black/10 shadow-md flex items-center justify-center text-white text-[26px]">
              📖
            </div>
          </div>

          {/* App Store */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-bl from-blue-400 to-blue-600 rounded-full border border-black/10 shadow-md flex items-center justify-center relative overflow-hidden">
              <div className="w-[30px] h-[3px] bg-white rounded-full absolute rotate-[60deg] shadow-sm"></div>
              <div className="w-[30px] h-[3px] bg-white rounded-full absolute -rotate-[60deg] shadow-sm"></div>
              <div className="w-[18px] h-[3px] bg-white rounded-full absolute top-[28px] shadow-sm"></div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-[10px] border border-black/10 shadow-md flex items-center justify-center overflow-hidden">
              <div className="w-[34px] h-[34px] border-[4px] border-stone-500 rounded-full border-dashed animate-spin-slow"></div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-[40px] bg-white/30 mx-[2px] mb-[6px] shadow-[1px_0_0_rgba(0,0,0,0.1)]"></div>

          {/* Trash */}
          <div className="w-[52px] h-[52px] cursor-pointer hover:scale-[1.15] hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center ml-1">
            <div className="w-[38px] h-[42px] bg-white/40 border border-white/60 rounded-b-[6px] flex relative shadow-[inset_0_-5px_10px_rgba(255,255,255,0.4)] overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[6px] border-b-[2px] border-white/80"></div>
              <div className="flex justify-between px-2 pt-2 pb-1 w-full opacity-60">
                <div className="w-px h-full bg-white"></div>
                <div className="w-px h-full bg-white"></div>
                <div className="w-px h-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
