"use client";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  FileText,
  Flashlight,
  FlashlightOff,
  Home,
  Medal,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import type { Grade } from "@/lib/demo";
type View = "home" | "syllabus" | "camera" | "results";
const lessons = [
  {
    week: 4,
    title: "第十课 – 我们的校园",
    status: "Pending Practice",
    tone: "bg-amber-100 text-amber-700",
    words: [
      ["校园", "xiàoyuán"],
      ["操场", "cāochǎng"],
      ["老师", "lǎoshī"],
      ["礼堂", "lǐtáng"],
    ],
  },
  {
    week: 3,
    title: "第九课 – 我爱我的家",
    status: "Completed (80%)",
    tone: "bg-emerald-100 text-emerald-700",
    words: [
      ["家", "jiā"],
      ["妈妈", "māma"],
      ["爸爸", "bàba"],
    ],
  },
  {
    week: 2,
    title: "第八课 – 快乐的周末",
    status: "Needs Revision",
    tone: "bg-rose-100 text-rose-700",
    words: [
      ["周末", "zhōumò"],
      ["公园", "gōngyuán"],
      ["快乐", "kuàilè"],
    ],
  },
];
type MatrixRow = { character: string; values: (boolean | null)[] };
type ResultsMatrix = { demo?: boolean; dates: string[]; rows: MatrixRow[] };
function Nav({ view, go }: { view: View; go: (v: View) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto flex max-w-[440px] justify-around border-t border-stone-200 bg-white px-3 py-3 text-[10px] text-slate-500">
      <button
        onClick={() => go("home")}
        className={view === "home" ? "text-[#4a6cf7]" : ""}
      >
        <Home className="mx-auto mb-1 h-5" />
        Dashboard
      </button>
      <button
        onClick={() => go("syllabus")}
        className={view === "syllabus" ? "text-[#4a6cf7]" : ""}
      >
        <BookOpen className="mx-auto mb-1 h-5" />
        Syllabus
      </button>
      <button onClick={() => go("results")}>
        <Medal className="mx-auto mb-1 h-5" />
        History
      </button>
      <button>
        <Sparkles className="mx-auto mb-1 h-5" />
        Premium
      </button>
    </nav>
  );
}
function Dashboard({ go }: { go: (v: View) => void }) {
  return (
    <main className="p-5 pb-24">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#ffe4cf] text-xl">
            L
          </div>
          <div>
            <p className="font-bold">Hi, Lucas!</p>
            <p className="text-xs text-slate-500">Primary 2 · Chinese</p>
          </div>
        </div>
        <Bell className="h-5" />
      </header>
      <section className="mt-7 rounded-3xl bg-[#4a6cf7] p-5 text-white">
        <div className="flex justify-between">
          <div>
            <p className="text-sm opacity-80">Prepaid credits</p>
            <p className="mt-2 text-2xl font-bold">
              12{" "}
              <span className="text-sm font-normal opacity-75">
                of 20 Remaining
              </span>
            </p>
          </div>
          <CreditCard className="opacity-70" />
        </div>
        <button className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#4a6cf7]">
          Top Up
        </button>
      </section>
      <section className="mt-5 grid grid-cols-2 gap-3">
        <div className="card p-4">
          <p className="text-xs text-slate-500">Mastery Rate</p>
          <p className="mt-2 text-2xl font-bold">
            82.4<span className="text-sm">%</span>
          </p>
          <div className="mt-3 h-1.5 rounded bg-slate-100">
            <div className="h-full w-[82%] rounded bg-emerald-400" />
          </div>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">Practiced</p>
          <p className="mt-2 text-2xl font-bold">48</p>
          <p className="mt-3 text-xs text-slate-400">Characters</p>
        </div>
      </section>
      <section className="mt-6">
        <h2 className="font-bold">This week</h2>
        <div className="mt-3 flex justify-between">
          {["M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-center">
              <span
                className={
                  "grid h-9 w-9 place-items-center rounded-full text-xs " +
                  (i === 4 ? "bg-[#4a6cf7] text-white" : "text-slate-500")
                }
              >
                {i + 9}
              </span>
              <small className="mt-1 block text-[10px] text-slate-400">
                {d}
              </small>
            </div>
          ))}
        </div>
      </section>
      <section className="card mt-7 border-l-4 border-l-[#ff9a50] p-4">
        <p className="text-xs font-semibold text-[#e4782d]">
          UPCOMING TING XIE
        </p>
        <h2 className="mt-2 font-bold">Week 4 Syllabus Test</h2>
        <p className="mt-1 text-sm text-slate-500">
          《第十课 – 我们的校园》 · Friday
        </p>
      </section>
      <button
        onClick={() => go("camera")}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4a6cf7] py-4 font-bold text-white"
      >
        <Camera className="h-5" />
        Scan & Grade Worksheet
      </button>
    </main>
  );
}
function Syllabus({ go }: { go: (v: View) => void }) {
  const [open, setOpen] = useState(0);
  return (
    <main className="p-5 pb-24">
      <button onClick={() => go("home")}>
        <ChevronLeft />
      </button>
      <h1 className="mt-4 text-2xl font-bold">Syllabus</h1>
      <div className="mt-5 flex gap-1 rounded-xl bg-slate-100 p-1">
        {["P1", "P2", "P3", "P4", "P5", "P6"].map((x) => (
          <button
            key={x}
            className={
              "flex-1 rounded-lg py-2 text-xs " +
              (x === "P2" ? "bg-white font-bold shadow" : "text-slate-500")
            }
          >
            {x}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="font-bold">MOE Primary 2 Syllabus</h2>
        <p className="text-sm text-slate-500">24 Lessons Total</p>
      </div>
      <section className="mt-4 space-y-3">
        {lessons.map((l, i) => {
          const isOpen = open === i;
          return (
            <article
              className={`card overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isOpen
                  ? "border-[#4a6cf7]/30 shadow-md ring-1 ring-[#4a6cf7]/20"
                  : "hover:border-stone-300"
              }`}
              key={l.week}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-stone-50/70 active:bg-stone-100/50"
                aria-expanded={isOpen}
              >
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-400">
                    WEEK {l.week}
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">{l.title}</p>
                </div>
                <div
                  className={`grid h-8 w-8 place-items-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOpen
                      ? "bg-blue-50 text-[#4a6cf7] rotate-180 shadow-sm"
                      : "bg-stone-100/80 text-slate-400 hover:bg-stone-200/80"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div className="px-4 pb-4">
                <span
                  className={
                    "inline-block rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide transition-colors duration-200 " +
                    l.tone
                  }
                >
                  {l.status}
                </span>
              </div>
              <div
                className={`accordion-wrapper ${isOpen ? "is-open" : ""}`}
                aria-hidden={!isOpen}
              >
                <div className="accordion-inner">
                  <div className="accordion-content border-t border-stone-200/80 bg-[#fcfbf8] p-4">
                    <div className="flex flex-wrap gap-2">
                      {l.words.map(([w, p]) => (
                        <span
                          key={w}
                          className="group inline-flex items-center rounded-lg border border-stone-200/80 bg-white px-3 py-1.5 text-sm font-medium shadow-sm transition-all duration-200 hover:border-[#4a6cf7]/40 hover:shadow hover:-translate-y-0.5"
                        >
                          <span className="text-slate-800">{w}</span>
                          <small className="ml-1.5 text-[10px] font-normal text-slate-400 group-hover:text-slate-500">
                            {p}
                          </small>
                        </span>
                      ))}
                    </div>
                    <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#4a6cf7] transition-all duration-150 hover:text-[#3755db] hover:translate-x-0.5 active:scale-95">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Print A4 Worksheet (PDF)</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
function CameraView({
  go,
  onGrade,
}: {
  go: (v: View) => void;
  onGrade: (g: Grade) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [torchOn, setTorchOn] = useState(false);
  const [screenTorch, setScreenTorch] = useState(false);
  const [torchNotice, setTorchNotice] = useState<string | null>(null);
  const noticeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotice = (msg: string) => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    setTorchNotice(msg);
    noticeTimeoutRef.current = setTimeout(() => {
      setTorchNotice(null);
    }, 2800);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          if (track.kind === "video") {
            track.applyConstraints({ advanced: [{ torch: false } as any] }).catch(() => {});
          }
        } catch {}
        track.stop();
      });
      streamRef.current = null;
    }
    if (video.current) {
      video.current.srcObject = null;
    }
    setTorchOn(false);
    setScreenTorch(false);
  };

  const startCamera = async () => {
    setError("");
    setTorchOn(false);
    setScreenTorch(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (video.current) {
        video.current.srcObject = stream;
      }
    } catch {
      setError(
        "Camera unavailable. Use a supported device and allow camera access.",
      );
    }
  };

  const toggleTorch = async () => {
    const track = streamRef.current?.getVideoTracks()[0];
    const nextState = !torchOn;

    if (!track) return;

    let hasHardwareTorch = false;
    try {
      if (typeof track.getCapabilities === "function") {
        const caps = track.getCapabilities() as { torch?: boolean };
        hasHardwareTorch = Boolean(caps?.torch);
      }
    } catch {
      hasHardwareTorch = false;
    }

    if (hasHardwareTorch) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: nextState } as any],
        });
        setTorchOn(nextState);
        setScreenTorch(false);
        return;
      } catch (err) {
        console.warn("Hardware torch failed, using screen light fallback:", err);
      }
    } else {
      // Attempt applyConstraints anyway for devices that don't report torch capability in getCapabilities
      try {
        await track.applyConstraints({
          advanced: [{ torch: nextState } as any],
        });
        setTorchOn(nextState);
        setScreenTorch(false);
        return;
      } catch {
        // Hardware torch not supported (e.g. iOS Safari)
      }
    }

    // Fallback: Screen Illumination Torch
    setTorchOn(nextState);
    setScreenTorch(nextState);
    if (nextState) {
      showNotice("Screen light on (Hardware flash not supported by browser)");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    };
  }, []);

  async function processGrading(blob: Blob, dataUrl: string) {
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("image", blob, "worksheet.jpg");
      form.append("lessonId", "demo-week-4");
      form.append("studentId", "lucas-p2");
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      const upload = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(upload.error || "Upload failed.");
      const gradeResponse = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: upload.submissionId,
          imageUrl: dataUrl,
          wordList: ["校园", "操场", "老师", "礼堂"],
        }),
      });
      const grade = await gradeResponse.json();
      if (!gradeResponse.ok) throw new Error(grade.error || "Gemini grading failed.");
      onGrade(grade);
      go("results");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  async function snap() {
    if (!video.current || !canvas.current) return;
    const c = canvas.current;
    c.width = video.current.videoWidth || 1280;
    c.height = video.current.videoHeight || 720;
    c.getContext("2d")?.drawImage(video.current, 0, 0);
    const imageUrl = c.toDataURL("image/jpeg", 0.85);

    // Stop camera immediately and switch view to the captured photo
    stopCamera();
    setCapturedImage(imageUrl);

    const blob = await new Promise<Blob | null>((r) =>
      c.toBlob(r, "image/jpeg", 0.85),
    );
    await processGrading(blob || new Blob(), imageUrl);
  }

  function retake() {
    setCapturedImage(null);
    setError("");
    setBusy(false);
    startCamera();
  }

  async function retry() {
    if (!capturedImage) return;
    try {
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      await processGrading(blob, capturedImage);
    } catch {
      setError("Failed to process captured image.");
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <video
        ref={video}
        autoPlay
        playsInline
        className={`absolute h-full w-full object-cover ${capturedImage ? "hidden" : "opacity-70"}`}
      />
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured worksheet"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="relative z-10 flex min-h-screen flex-col p-5">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              stopCamera();
              go("home");
            }}
            className="rounded-full bg-black/40 backdrop-blur-md p-3 text-white hover:bg-black/60 transition"
          >
            <X className="h-5 w-5" />
          </button>
          {capturedImage ? (
            <span className="rounded-full bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white/90 border border-white/10">
              Captured
            </span>
          ) : (
            <button
              onClick={toggleTorch}
              className={`rounded-full p-3 backdrop-blur-md transition-all duration-200 active:scale-90 ${
                torchOn
                  ? "bg-amber-400 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.6)] ring-2 ring-amber-300"
                  : "bg-black/40 text-white hover:bg-black/60 hover:text-amber-200"
              }`}
              aria-label={torchOn ? "Turn flash off" : "Turn flash on"}
              title={torchOn ? "Turn Flash Off" : "Turn Flash On"}
            >
              {torchOn ? (
                <Flashlight className="h-5 w-5 fill-current" />
              ) : (
                <FlashlightOff className="h-5 w-5 opacity-90" />
              )}
            </button>
          )}
        </div>

        {torchNotice && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 max-w-[85%] rounded-full bg-black/80 backdrop-blur-md px-4 py-2 text-center text-xs font-medium text-amber-200 border border-amber-400/30 shadow-lg pointer-events-none transition-all">
            {torchNotice}
          </div>
        )}

        {!capturedImage && (
          <div
            className={`m-auto w-[82%] aspect-[3/4] rounded-xl border-2 transition-all duration-300 ${
              screenTorch
                ? "border-amber-300 shadow-[0_0_0_5000px_rgba(255,255,255,0.85)] ring-4 ring-amber-200/50"
                : "border-white/90 shadow-[0_0_0_5000px_rgba(0,0,0,.22)]"
            }`}
          >
            <div
              className={`flex h-full items-end justify-center pb-5 text-center text-sm font-medium transition-colors ${
                screenTorch ? "text-slate-900 font-bold" : "text-white"
              }`}
            >
              Keep page flat and inside the brackets
            </div>
          </div>
        )}

        {capturedImage && busy && (
          <div className="m-auto flex flex-col items-center justify-center rounded-2xl bg-black/70 backdrop-blur-md px-7 py-6 text-center border border-white/15 shadow-2xl max-w-[280px]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white mb-3" />
            <p className="font-semibold text-base">Uploading & grading…</p>
            <p className="text-xs text-white/70 mt-1">Analyzing handwriting with Gemini</p>
          </div>
        )}

        {capturedImage && !busy && error && (
          <div className="m-auto w-[90%] max-w-sm rounded-2xl bg-black/80 backdrop-blur-md p-5 text-center border border-red-500/40 shadow-2xl">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-red-500/20 text-red-400">
              <X className="h-5 w-5" />
            </div>
            <p className="font-semibold text-sm text-red-200">{error}</p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={retake}
                className="flex items-center gap-1.5 rounded-xl bg-white/20 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/30 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retake
              </button>
              <button
                onClick={retry}
                className="rounded-xl bg-[#4a6cf7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#3b5de7] transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!capturedImage && (
          <>
            {error && (
              <p className="rounded-lg bg-red-500/80 p-3 text-sm text-center mb-2">{error}</p>
            )}
            <button
              disabled={busy}
              onClick={snap}
              className="mx-auto mt-7 grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-transparent transition active:scale-95 disabled:opacity-50"
            >
              <span className="h-14 w-14 rounded-full bg-white" />
            </button>
            <p className="mt-3 text-center text-sm">Tap to capture</p>
          </>
        )}

        {capturedImage && busy && (
          <button
            onClick={retake}
            className="mx-auto mt-7 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-black/70 transition"
          >
            <RotateCcw className="h-4 w-4" />
            Cancel & Retake
          </button>
        )}

        <canvas ref={canvas} className="hidden" />
      </div>
    </main>
  );
}
function Results({
  go,
  grade,
}: {
  go: (v: View) => void;
  grade: Grade | null;
}) {
  const [matrix, setMatrix] = useState<ResultsMatrix | null>(null);
  const [matrixLoading, setMatrixLoading] = useState(true);
  const [matrixError, setMatrixError] = useState("");

  useEffect(() => {
    setMatrixLoading(true);
    setMatrixError("");
    fetch("/api/results-matrix?studentId=lucas-p2")
      .then((r) => r.json())
      .then((d: ResultsMatrix & { error?: string }) => {
        if (d.error) {
          setMatrixError(d.error);
        } else {
          setMatrix(d);
        }
      })
      .catch(() => setMatrixError("Failed to load history"))
      .finally(() => setMatrixLoading(false));
  }, [grade]);

  if (!grade) {
    return (
      <main className="p-5 pb-28">
        <button onClick={() => go("home")}><ChevronLeft /></button>
        <section className="card mt-8 p-7 text-center">
          <h1 className="text-xl font-bold">No graded worksheet yet</h1>
          <p className="mt-2 text-sm text-slate-500">Scan a worksheet to see its real Gemini feedback here.</p>
          <button onClick={() => go("camera")} className="mt-6 rounded-xl bg-[#4a6cf7] px-5 py-3 text-sm font-bold text-white">Scan a worksheet</button>
        </section>
      </main>
    );
  }

  const g = grade;
  const pct = Math.round((g.totalScore / g.totalPossible) * 100);

  return (
    <main className="p-5 pb-28">
      <button onClick={() => go("home")}>
        <ChevronLeft />
      </button>
      <header className="mt-3 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Test Feedback</h1>
          <p className="mt-1 text-sm text-slate-500">Week 4 Syllabus Test</p>
        </div>
        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">
          Needs Revision
        </span>
      </header>
      <section className="card mt-6 p-5 text-center">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-full border-[10px] border-[#ffb16c]">
          <b className="text-3xl">{pct}%</b>
        </div>
        <p className="mt-4 font-bold">
          Score: {g.totalScore}/{g.totalPossible}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Graded just now · {g.results.filter((r) => !r.correct).length}{" "}
          characters missed
        </p>
      </section>
      {g.imageUrl && (
        <section className="card mt-5 overflow-hidden">
          <div className="relative grid-bg min-h-48 bg-stone-50">
            <img
              src={g.imageUrl}
              alt="Captured worksheet"
              className="h-60 w-full object-contain"
            />
            {g.results
              .filter((r) => !r.correct)
              .map((r, i) => (
                <div
                  key={r.character}
                  className="absolute left-[12%] text-sm font-bold text-red-600"
                  style={{ top: `${20 + i * 38}%` }}
                >
                  ✗ expected: {r.expected_text}
                </div>
              ))}
          </div>
          <p className="p-3 text-xs font-semibold text-red-500">
            Red-pen corrections
          </p>
        </section>
      )}
      <section className="mt-6">
        <h2 className="font-bold">Results over time</h2>
        <div className="card mt-3 overflow-hidden">
          {matrixLoading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-xs text-slate-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-slate-400" />
              Loading history…
            </div>
          ) : matrixError ? (
            <p className="py-6 text-center text-xs text-red-400">{matrixError}</p>
          ) : !matrix || matrix.dates.length === 0 ? (
            <p className="py-6 text-center text-xs text-slate-400">No submission history yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-3 text-left">Word</th>
                    {matrix.dates.map((d, i) => (
                      <th key={i} className="px-2 py-3 whitespace-nowrap">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.rows.map((row) => (
                    <tr key={row.character} className="border-t">
                      <td className="p-3 text-left font-medium">{row.character}</td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={
                            v === null
                              ? "text-slate-300"
                              : v
                              ? "text-emerald-500"
                              : "text-red-500"
                          }
                        >
                          {v === null ? "–" : v ? <Check className="mx-auto h-4" /> : "✕"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="rounded-xl border border-[#4a6cf7] py-3 text-sm font-bold text-[#4a6cf7]">
          <Send className="mr-1 inline h-4" />
          Share Report
        </button>
        <button
          onClick={() => go("camera")}
          className="rounded-xl bg-[#4a6cf7] py-3 text-sm font-bold text-white"
        >
          Retest Missed
        </button>
      </div>
    </main>
  );
}
export default function App() {
  const [view, setView] = useState<View>("home");
  const [grade, setGrade] = useState<Grade | null>(null);
  useEffect(() => {
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);
  return (
    <div className="phone">
      {view === "home" && <Dashboard go={setView} />}{" "}
      {view === "syllabus" && <Syllabus go={setView} />}{" "}
      {view === "camera" && <CameraView go={setView} onGrade={setGrade} />}{" "}
      {view === "results" && <Results go={setView} grade={grade} />}{" "}
      {view !== "camera" && <Nav view={view} go={setView} />}
    </div>
  );
}
