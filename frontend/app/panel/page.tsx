import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth-options";
import { redirect } from "next/navigation";
import Navbar from "../components/shared/Navbar";


export default async function PanelPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-8 bg-[#343541] transition-colors duration-300">
        <div className="w-full max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight bg-gradient-to-r from-[#10a37f] to-[#22d3ee] bg-clip-text text-transparent animate-gradient-x">
            Dashboard
          </h1>
          <p className="text-[#10a37f] text-xl md:text-2xl font-semibold mb-4 animate-fade-in">
            Welcome to your learning dashboard!
          </p>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in">
            Track your progress, view your stats, and continue your journey with a modern, beautiful interface.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
            <div className="backdrop-blur-md bg-white/5 border border-[#10a37f]/30 rounded-2xl p-8 shadow-xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:border-[#10a37f]">
              <span className="text-5xl mb-3 flex items-center justify-center">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 text-[#10a37f]' fill='none' viewBox='0 0 32 32' stroke='currentColor'>
                  <circle cx='16' cy='16' r='14' stroke='#10a37f' strokeWidth='2' fill='none'/>
                  <circle cx='16' cy='16' r='6' fill='#10a37f' fillOpacity='0.2'/>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 10v6l4 2' stroke='#10a37f' />
                </svg>
              </span>
              <span className="text-4xl font-extrabold text-[#10a37f] mb-2">0%</span>
              <span className="text-gray-200 font-medium">Course Completed</span>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-[#22d3ee]/30 rounded-2xl p-8 shadow-xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:border-[#22d3ee]">
              <span className="text-5xl mb-3 flex items-center justify-center">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 text-[#22d3ee]' fill='none' viewBox='0 0 32 32' stroke='currentColor'>
                  <rect x='4' y='8' width='24' height='16' rx='4' stroke='#22d3ee' strokeWidth='2' fill='none'/>
                  <path d='M10 20l6-6 6 6' stroke='#22d3ee' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' fill='none'/>
                </svg>
              </span>
              <span className="text-4xl font-extrabold text-[#22d3ee] mb-2">0</span>
              <span className="text-gray-200 font-medium">Lessons Completed</span>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-[#fbbf24]/30 rounded-2xl p-8 shadow-xl flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:border-[#fbbf24]">
              <span className="text-5xl mb-3 flex items-center justify-center">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 text-[#fbbf24]' fill='none' viewBox='0 0 32 32' stroke='currentColor'>
                  <circle cx='16' cy='16' r='14' stroke='#fbbf24' strokeWidth='2' fill='none'/>
                  <path d='M16 10v8' stroke='#fbbf24' strokeWidth='2' strokeLinecap='round'/>
                  <circle cx='16' cy='22' r='2' fill='#fbbf24'/>
                </svg>
              </span>
              <span className="text-4xl font-extrabold text-[#fbbf24] mb-2">0</span>
              <span className="text-gray-200 font-medium">Streak</span>
            </div>
          </div>
          <a href="/panel/lessons" className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-[#10a37f] to-[#22d3ee] text-white font-bold rounded-2xl shadow-2xl hover:scale-110 hover:shadow-[#10a37f]/40 transition-transform duration-200 text-lg tracking-wide">
            <span className="inline-flex items-center gap-2">
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' /></svg>
              Go to Lessons
            </span>
          </a>
        </div>
      </main>
    </>
  );
}
