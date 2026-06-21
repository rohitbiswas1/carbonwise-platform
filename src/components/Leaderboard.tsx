import { memo, useMemo } from 'react';
import { Trophy, MapPin, Leaf, ArrowRight } from 'lucide-react';
import { getGrade } from '../utils/unitConversion';

interface LeaderboardEntry {
  rank: number;
  name: string;
  city: string;
  footprint: number;
  grade: string;
  avatar: string;
}

interface LeaderboardProps {
  userFootprint: number;
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, name: 'Priya Sharma', city: 'Mumbai', footprint: 980, grade: 'A+', avatar: 'PS' },
  { rank: 2, name: 'Arjun Mehta', city: 'Bangalore', footprint: 1240, grade: 'A+', avatar: 'AM' },
  { rank: 3, name: 'Sunita Patel', city: 'Ahmedabad', footprint: 1580, grade: 'A', avatar: 'SP' },
  { rank: 4, name: 'Rahul Verma', city: 'Delhi', footprint: 1890, grade: 'A', avatar: 'RV' },
  { rank: 5, name: 'Kavya Nair', city: 'Chennai', footprint: 2100, grade: 'B', avatar: 'KN' },
  { rank: 6, name: 'Amit Joshi', city: 'Pune', footprint: 2340, grade: 'B', avatar: 'AJ' },
  { rank: 7, name: 'Deepa Reddy', city: 'Hyderabad', footprint: 2670, grade: 'C', avatar: 'DR' },
  { rank: 8, name: 'Vikram Singh', city: 'Jaipur', footprint: 2900, grade: 'C', avatar: 'VS' },
];

/** Returns medal emoji for top 3 ranks */
const getMedal = (rank: number): string => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return `#${rank}`;
};

const Leaderboard = memo<LeaderboardProps>(({ userFootprint }) => {
  const userGrade = useMemo(() => getGrade(userFootprint), [userFootprint]);

  return (
    <section
      id="leaderboard"
      className="py-24 bg-gray-50 dark:bg-gray-800 scroll-mt-20 border-b border-gray-100 dark:border-gray-700"
      aria-labelledby="leaderboard-title"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/30 mb-4" aria-hidden="true">
            <span className="text-3xl">🏆</span>
          </div>
          <h2
            id="leaderboard-title"
            className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3"
          >
            Eco Champions Leaderboard
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Meet India's Greenest Citizens
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Celebrated for keeping their carbon footprint under the global 2-tonne Paris Agreement target.
          </p>
        </div>

        {/* Your current rank indicator */}
        <div className="mb-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-black">
              <Leaf className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">Your Current Footprint</div>
              <div className="text-2xl font-black tracking-tight">
                {userFootprint.toLocaleString()} kg CO₂/yr
                <span
                  className="ml-2 px-2 py-0.5 rounded-lg text-xs font-black bg-white/20"
                  style={{ color: '#ffffff' }}
                >
                  Grade {userGrade.letter}
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-emerald-100 font-medium text-center sm:text-right">
            Rows highlighted when within <strong className="text-white">±500 kg</strong> of your footprint
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-900/70 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-emerald-50 dark:bg-emerald-900/30 border-b border-emerald-100 dark:border-emerald-800 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-200">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Champion</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2 text-right">Footprint</div>
            <div className="col-span-1 text-center">Grade</div>
          </div>

          {/* Table Rows */}
          <ul className="divide-y divide-gray-100 dark:divide-gray-700" role="list">
            {LEADERBOARD_DATA.map((entry) => {
              const isHighlighted = Math.abs(entry.footprint - userFootprint) <= 500;
              return (
                <li
                  key={entry.rank}
                  className={`grid grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 items-center transition-colors ${
                    isHighlighted
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-4 border-transparent'
                  }`}
                  aria-label={`Rank ${entry.rank}: ${entry.name} from ${entry.city} with ${entry.footprint} kg per year, grade ${entry.grade}`}
                >
                  {/* Rank + Medal */}
                  <div className="col-span-2 md:col-span-1 flex items-center justify-center">
                    <span
                      className="text-2xl md:text-3xl font-black"
                      aria-hidden="true"
                    >
                      {getMedal(entry.rank)}
                    </span>
                  </div>

                  {/* Avatar + Name */}
                  <div className="col-span-10 md:col-span-5 flex items-center space-x-3">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-black text-sm md:text-base shadow-md shrink-0"
                      aria-hidden="true"
                    >
                      {entry.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base truncate">
                        {entry.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden flex items-center space-x-1">
                        <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                        <span>{entry.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location - Desktop */}
                  <div className="hidden md:flex col-span-3 items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                    <span>{entry.city}</span>
                  </div>

                  {/* Footprint */}
                  <div className="hidden md:block col-span-2 text-right">
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {entry.footprint.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                      kg CO₂/yr
                    </div>
                  </div>

                  {/* Grade Badge */}
                  <div className="hidden md:flex col-span-1 justify-center">
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl font-black text-sm shadow-sm"
                      style={{
                        backgroundColor: `${getGrade(entry.footprint).color}20`,
                        color: getGrade(entry.footprint).color,
                        border: `1.5px solid ${getGrade(entry.footprint).color}40`,
                      }}
                      aria-label={`Grade ${entry.grade}`}
                    >
                      {entry.grade}
                    </span>
                  </div>

                  {/* Mobile Footer (footprint + grade) */}
                  <div className="col-span-12 md:hidden flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {entry.footprint.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">kg CO₂/yr</span>
                    </div>
                    <span
                      className="inline-flex items-center justify-center px-3 py-1 rounded-lg font-black text-xs"
                      style={{
                        backgroundColor: `${getGrade(entry.footprint).color}20`,
                        color: getGrade(entry.footprint).color,
                        border: `1.5px solid ${getGrade(entry.footprint).color}40`,
                      }}
                    >
                      {entry.grade}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-white dark:bg-gray-900/70 border border-emerald-200 dark:border-emerald-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-emerald-500" aria-hidden="true" />
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                Save your calculation to join the leaderboard!
              </p>
            </div>
            <a
              href="#calculator"
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-500/20 transition-all text-sm"
            >
              <span>Calculate Now</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

Leaderboard.displayName = 'Leaderboard';
export default Leaderboard;
