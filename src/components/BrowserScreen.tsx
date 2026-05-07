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
  ChevronDown,
  Star,
  File,
  SearchIcon,
  GitBranch,
  Blocks,
} from "lucide-react";

interface Props {
  active: SectionId;
  storyProgress?: number;
  onMaximize?: () => void;
}

const VSCodeWindow = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={style}
    className="absolute w-[800px] h-[520px] left-[130px] top-[40px] bg-[#1e1e1e] flex flex-col rounded-xl shadow-2xl border border-[#3c3c3c] z-30 overflow-hidden transform origin-bottom-left transition-all duration-75"
  >
    <div className="h-9 bg-[#323233] flex items-center justify-center relative flex-none text-[#cccccc] text-[13px] border-b border-[#1e1e1e]">
      <div className="absolute left-4 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
      </div>
      portfolio - Visual Studio Code
    </div>
    <div className="flex-1 flex overflow-hidden">
      <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 text-[#858585] flex-none">
        {/* Mockup icons */}
        <div className="w-6 h-6 opacity-80">
          <File />
        </div>
        <div className="w-6 h-6 rounded-sm opacity-40">
          <SearchIcon />
        </div>
        <div className="w-6 h-6 rounded-sm opacity-40">
          <GitBranch />
        </div>
        <div className="w-6 h-6 rounded-sm opacity-40">
          <Blocks />
        </div>
      </div>
      <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] p-2 py-4 text-[#cccccc] text-[13px] flex-none font-sans">
        <div className="font-semibold text-[11px] tracking-widest mb-4">
          EXPLORER
        </div>
        <div className="flex items-center gap-1 font-bold text-[#cccccc]">
          <ChevronDown className="w-3 h-3" /> portfolio
        </div>
        <div className="pl-4 mt-2 flex items-center gap-1 text-[#4facfe]">
          <ChevronDown className="w-3 h-3" /> src
        </div>
        <div className="pl-8 mt-1 flex items-center gap-1 text-[#cccccc]">
          <ChevronDown className="w-3 h-3" /> components
        </div>
        <div className="pl-12 mt-1 text-[#e1ad4c] bg-[#37373d] py-0.5 px-1 rounded-sm border border-[#3c3c3c]">
          Macbook3D.tsx
        </div>
        <div className="pl-12 mt-1 text-[#cccccc] py-0.5 px-1">Index.tsx</div>
        <div className="pl-8 mt-1 flex items-center gap-1 text-[#cccccc]">
          <ChevronRight className="w-3 h-3" /> pages
        </div>
      </div>
      <div className="flex-1 bg-[#1e1e1e] p-6 text-[#d4d4d4] font-mono text-[14px] leading-relaxed overflow-hidden">
        <div>
          <span className="text-[#c586c0]">import</span>{" "}
          {"{ useRef, useState }"} <span className="text-[#c586c0]">from</span>{" "}
          <span className="text-[#ce9178]">'react'</span>;
        </div>
        <div>
          <span className="text-[#c586c0]">import</span> {"{ useFrame }"}{" "}
          <span className="text-[#c586c0]">from</span>{" "}
          <span className="text-[#ce9178]">'@react-three/fiber'</span>;
        </div>
        <div>
          <span className="text-[#c586c0]">import</span>{" "}
          <span className="text-[#9cdcfe]">*</span>{" "}
          <span className="text-[#c586c0]">as</span> THREE{" "}
          <span className="text-[#c586c0]">from</span>{" "}
          <span className="text-[#ce9178]">'three'</span>;
        </div>
        <br />
        <div>
          <span className="text-[#c586c0]">export function</span>{" "}
          <span className="text-[#dcdcaa]">MacbookModel</span>() {"{"}
        </div>
        <div>
          &nbsp;&nbsp;<span className="text-[#c586c0]">const</span> lidRef ={" "}
          <span className="text-[#dcdcaa]">useRef</span>(null);
        </div>
        <div>
          &nbsp;&nbsp;<span className="text-[#c586c0]">const</span> groupRef ={" "}
          <span className="text-[#dcdcaa]">useRef</span>(null);
        </div>
        <br />
        <div>
          &nbsp;&nbsp;<span className="text-[#dcdcaa]">useFrame</span>((state){" "}
          <span className="text-[#569cd6]">=&gt;</span> {"{"}
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-[#6a9955]">
            // Map openAmount to lid rotation
          </span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#c586c0]">const</span>{" "}
          target = THREE.MathUtils.<span className="text-[#dcdcaa]">lerp</span>
          (-Math.PI * -0.44, -Math.PI * 0.05, openAmount);
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;lidRef.current.rotation.x = THREE.MathUtils.
          <span className="text-[#dcdcaa]">lerp</span>
          (lidRef.current.rotation.x, target,{" "}
          <span className="text-[#b5cea8]">0.12</span>);
        </div>
        <div>&nbsp;&nbsp;{"});"}</div>
        <br />
        <div>
          &nbsp;&nbsp;<span className="text-[#c586c0]">return</span> (
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#808080]">&lt;</span>
          <span className="text-[#569cd6]">group</span>{" "}
          <span className="text-[#9cdcfe]">ref</span>=
          <span className="text-[#569cd6]">{`{groupRef}`}</span>
          <span className="text-[#808080]">&gt;</span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-[#6a9955]">{/* Base Chassis */}</span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="text-[#808080]">&lt;</span>
          <span className="text-[#4ec9b0]">RoundedBox</span>{" "}
          <span className="text-[#9cdcfe]">args</span>=
          <span className="text-[#569cd6]">{`{[3.6, 0.1, 2.4]}`}</span>{" "}
          <span className="text-[#9cdcfe]">radius</span>=
          <span className="text-[#b5cea8]">{0.04}</span>{" "}
          <span className="text-[#808080]">/&gt;</span>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#808080]">&lt;/</span>
          <span className="text-[#569cd6]">group</span>
          <span className="text-[#808080]">&gt;</span>
        </div>
        <div>&nbsp;&nbsp;);</div>
        <div>{"}"}</div>
      </div>
    </div>
  </div>
);

/**
 * BrowserScreen — 1:1 replica of the Yosemite macOS desktop and Chrome browser.
 */
export function BrowserScreen({
  active,
  storyProgress = 1.0,
  onMaximize,
}: Props) {
  const section = SECTIONS.find((s) => s.id === active)!;
  const [typedUrl, setTypedUrl] = useState(section.url);

  // Animation values derived from storyProgress
  const isStoryMode = storyProgress < 1.0;

  // VSC visibility & animation
  const isVscVisible = storyProgress < 0.6;
  let vscTransform = "translate3d(0, 0, 0) scale(1)";
  let vscOpacity = 1;
  if (storyProgress >= 0.4 && storyProgress < 0.6) {
    const p = (storyProgress - 0.4) * 5; // 0 to 1
    vscTransform = `translate3d(-50px, ${p * 200}px, 0) scale(${1 - p * 0.4})`;
    vscOpacity = 1 - p;
  }

  // Chrome visibility & animation
  const isChromeVisible = storyProgress >= 0.75 || !isStoryMode;
  let chromeTransform = "translate3d(0, 0, 0) scale(1)";
  let chromeOpacity = 1;
  if (isStoryMode && storyProgress >= 0.75 && storyProgress < 0.85) {
    const p = (storyProgress - 0.75) * 10; // 0 to 1
    // scale up from the dock (roughly x:425, y:660)
    chromeTransform = `translate3d(0, ${(1 - p) * 300}px, 0) scale(${
      0.5 + p * 0.5
    })`;
    chromeOpacity = p;
  }

  // Cursor animation
  const isCursorVisible = storyProgress >= 0.6 && storyProgress < 0.95;
  let cursorX = 530;
  let cursorY = 350;
  if (storyProgress >= 0.6 && storyProgress < 0.7) {
    const p = (storyProgress - 0.6) * 10;
    cursorX = 530 + p * (485 - 530); // 485 is safari icon X roughly
    cursorY = 350 + p * (640 - 350); // 640 is safari icon Y roughly
  } else if (storyProgress >= 0.7 && storyProgress < 0.85) {
    cursorX = 485;
    cursorY = 640;
  } else if (storyProgress >= 0.85 && storyProgress < 0.9) {
    const p = (storyProgress - 0.85) * 20; // 0 to 1
    cursorX = 485 + p * (250 - 485); // 250 is url bar X
    cursorY = 640 + p * (80 - 640); // 80 is url bar Y
  } else if (storyProgress >= 0.9) {
    cursorX = 250;
    cursorY = 80;
  }

  // Icon click effect
  const safariIconScale =
    storyProgress >= 0.7 && storyProgress < 0.75 ? 0.85 : 1;

  // Typed URL during story mode
  const urlToType = "varunsingh.com";
  let displayUrl = typedUrl;
  if (isStoryMode) {
    if (storyProgress < 0.9) {
      displayUrl = "";
    } else if (storyProgress >= 0.9 && storyProgress < 0.98) {
      const p = (storyProgress - 0.9) * 12.5; // 0 to 1
      const len = Math.floor(p * urlToType.length);
      displayUrl = urlToType.slice(0, len);
    } else {
      displayUrl = urlToType;
    }
  }

  const now = new Date();

  const day = now.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    if (isStoryMode) return;
    let i = 0;
    setTypedUrl("");
    const interval = window.setInterval(() => {
      i++;
      setTypedUrl(section.url.slice(0, i));
      if (i >= section.url.length) window.clearInterval(interval);
    }, 28);
    return () => window.clearInterval(interval);
  }, [section.url, isStoryMode]);

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

      {/* Safe desktop area */}
      <div className="flex-1 relative overflow-hidden flex flex-col z-10">
        {/* VS Code Window */}
        {isVscVisible && (
          <VSCodeWindow
            style={{ transform: vscTransform, opacity: vscOpacity }}
          />
        )}

        {/* Cursor */}
        {/* {isCursorVisible && (
          <div 
            className="absolute z-[100] pointer-events-none transition-all duration-75"
            style={{ 
              left: cursorX, 
              top: cursorY,
              transform: 'translate(-2px, -2px)'
            }}
          >
            <svg width="22" height="30" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))" }}>
              <path d="M5.5 32L1 1L22.5 22.5H13L5.5 32Z" fill="black" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
            </svg>
          </div>
        )} */}

        {/* Chrome Window */}
        <div
          className="absolute inset-0 bg-white flex flex-col z-20 overflow-hidden origin-bottom transition-all duration-75 shadow-2xl"
          style={{
            transform: chromeTransform,
            opacity: chromeOpacity,
            display: isChromeVisible ? "flex" : "none",
          }}
        >
          {/* Chrome Tab Bar (Yosemite style) */}
          <div className="h-[34px] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0] flex items-end px-2 flex-none relative border-t border-white/50">
            {/* Traffic Lights */}
            <div className="absolute left-[12px] top-[12px] flex gap-[8px]">
              <div className="h-[12px] w-[12px] rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-inner"></div>
              <div className="h-[12px] w-[12px] rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-inner"></div>
              <div
                className="h-[12px] w-[12px] rounded-full bg-[#27c93f] border border-[#1aab29] shadow-inner cursor-pointer hover:bg-[#2fe54a] transition-colors flex items-center justify-center group"
                onClick={onMaximize}
                title="View Fullscreen"
              >
                <div className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 flex items-center justify-center overflow-hidden">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9V6M1 9H4M1 9L4 6"
                      stroke="#06560F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 1V4M9 1H6M9 1L6 4"
                      stroke="#06560F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
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
              <span className="text-[13px] text-gray-800 flex-1 font-sans truncate relative">
                {displayUrl || "chrome://apps"}
                {isStoryMode &&
                  storyProgress >= 0.9 &&
                  storyProgress < 0.98 && (
                    <span className="absolute ml-0.5 w-0.5 h-4 bg-black animate-pulse inline-block align-middle top-0 bottom-0 my-auto"></span>
                  )}
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
      {!isChromeVisible && (
        <div className="absolute bottom-0 w-full flex justify-center pb-1 z-[60]">
          <div className="h-[64px] bg-white/30 backdrop-blur-xl border border-white/40 rounded-t-[4px] rounded-b-xl px-2 py-1 flex items-end gap-[6px] shadow-[0_-2px_15px_rgba(0,0,0,0.15)] z-50">
            {/* Finder */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center">
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
            </div>

            {/* Launchpad */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-full border border-black/10 shadow-md flex items-center justify-center text-[22px]">
                🚀
              </div>
            </div>

            {/* Safari / Chrome */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                style={{ transform: `scale(${safariIconScale})` }}
              >
                <path
                  fill="#4caf50"
                  d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
                ></path>
                <path
                  fill="#ffc107"
                  d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"
                ></path>
                <path
                  fill="#ffc107"
                  d="M24,4v20l8,4l-8.843,16c0.317,0,0.526,0,0.843,0c11.053,0,20-8.947,20-20S35.053,4,24,4z"
                ></path>
                <path
                  fill="#f44336"
                  d="M41.84,15H24v13l-3-1L7.16,13.26H7.14C10.68,7.69,16.91,4,24,4C31.8,4,38.55,8.48,41.84,15z"
                ></path>
                <path
                  fill="#dd2c00"
                  d="M7.158,13.264l8.843,14.862L21,27L7.158,13.264z"
                ></path>
                <path
                  fill="#558b2f"
                  d="M23.157,44l8.934-16.059L28,25L23.157,44z"
                ></path>
                <path
                  fill="#f9a825"
                  d="M41.865,15H24l-1.579,4.58L41.865,15z"
                ></path>
                <path
                  fill="#fff"
                  d="M33,24c0,4.969-4.031,9-9,9s-9-4.031-9-9s4.031-9,9-9S33,19.031,33,24z"
                ></path>
                <path
                  fill="#2196f3"
                  d="M31,24c0,3.867-3.133,7-7,7s-7-3.133-7-7s3.133-7,7-7S31,20.133,31,24z"
                ></path>
              </svg>
              {isChromeVisible && (
                <div className="absolute -bottom-[3px] w-1 h-1 bg-black/50 rounded-full blur-[0.5px]"></div>
              )}
            </div>

            {/* Mail */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-blue-400 to-blue-200 rounded-[8px] border border-black/10 shadow-md flex items-center justify-center overflow-hidden">
                <div className="w-[44px] h-[32px] bg-white rounded-[4px] relative border border-gray-300 shadow-inner flex overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1/2 border-b border-gray-200 rotate-[20deg] origin-left scale-[1.5]"></div>
                  <div className="absolute top-1 right-1 w-6 h-6 border-[1.5px] border-blue-400 rounded-full opacity-30"></div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
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
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
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
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
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
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
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
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
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
              {/* <div className="absolute -bottom-[5px] w-1 h-1 bg-black/50 rounded-full blur-[0.5px]"></div> */}
            </div>

            {/* FaceTime */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-b from-[#6cfb6c] to-[#25d366] rounded-[10px] border border-black/10 shadow-md flex flex-row items-center justify-center p-[6px]">
                <div className="w-[24px] h-[18px] bg-white rounded-l-[4px] border border-gray-200"></div>
                <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[6px] border-y-transparent"></div>
              </div>
            </div>

            {/* Photo Booth */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-b from-red-600 to-[#800000] rounded-[8px] border border-black/10 shadow-md flex overflow-hidden">
                <div className="w-1/2 h-full bg-red-500/30 rounded-br-full shadow-lg"></div>
                <div className="w-1/2 h-full bg-red-700/30 rounded-bl-full shadow-lg"></div>
              </div>
            </div>

            {/* iTunes */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-pink-400 to-red-500 rounded-full border border-black/10 shadow-md flex items-center justify-center text-white text-[24px]">
                🎵
              </div>
            </div>

            {/* iBooks */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-orange-400 to-orange-500 rounded-full border border-black/10 shadow-md flex items-center justify-center text-white text-[26px]">
                📖
              </div>
            </div>

            {/* App Store */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-bl from-blue-400 to-blue-600 rounded-full border border-black/10 shadow-md flex items-center justify-center relative overflow-hidden">
                <div className="w-[30px] h-[3px] bg-white rounded-full absolute rotate-[60deg] shadow-sm"></div>
                <div className="w-[30px] h-[3px] bg-white rounded-full absolute -rotate-[60deg] shadow-sm"></div>
                <div className="w-[18px] h-[3px] bg-white rounded-full absolute top-[28px] shadow-sm"></div>
              </div>
            </div>

            {/* System Preferences */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-gray-200 to-gray-400 rounded-[10px] border border-black/10 shadow-md flex items-center justify-center overflow-hidden">
                <div className="w-[34px] h-[34px] border-[4px] border-stone-500 rounded-full border-dashed animate-spin-slow"></div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-[40px] bg-white/30 mx-[2px] mb-[6px] shadow-[1px_0_0_rgba(0,0,0,0.1)]"></div>

            {/* Trash */}
            <div className="w-[52px] h-[52px] cursor-pointer hover:-translate-y-2 transition-all origin-bottom relative flex justify-center items-center ml-1">
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
      )}
    </div>
  );
}
