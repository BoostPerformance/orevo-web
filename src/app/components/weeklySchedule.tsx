// interface ScheduleData {
//   time: string;
// }

type DayType = '월' | '화' | '수' | '목' | '금';
type ScheduleType = Record<DayType, string>;

export default function WeeklySchedule() {
  // const times: ScheduleData[] = [
  //   { time: '오전 08:15' },
  //   { time: '오전 09:30' },
  //   { time: '오전 10:45' },
  // ];

  const days: DayType[] = ['월', '화', '수', '목', '금'];
  const schedule: ScheduleType = {
    월: '근력',
    화: '복합',
    수: '휴무',
    목: '근력',
    금: '유산소',
  };

  return (
    <div className="w-full bg-[#F8F7F4] rounded-lg p-6 border-green-800">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-center min-w-[120px] border-b border-t-2 border-r border-green-800"></th>
              {days.map((day) => (
                <th
                  key={day}
                  className={`p-4 text-center min-w-[100px] font-medium border-t-2 border-b border-green-800 ${
                    day === '화' || day === '목' ? 'bg-white' : 'bg-[#F8F7F4]'
                  }`}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-green-800">
              <td className="p-4 text-center font-medium border-t border-l border-r border-green-800">
                오전 08:15
              </td>
              {days.map((day) => (
                <td
                  key={day}
                  rowSpan={3}
                  className={`p-4 text-center border-r border-green-800 ${
                    day === '화' || day === '목' ? 'bg-white' : 'bg-[#F8F7F4]'
                  }`}
                >
                  {schedule[day]}
                </td>
              ))}
            </tr>
            <tr className="border-b border-green-800">
              <td className="p-4 text-center font-medium border-l border-r border-green-800">
                오전 09:30
              </td>
            </tr>
            <tr className="border-b border-green-800 last:border-b-2">
              <td className="p-4 text-center font-medium border-l border-r border-green-800">
                오전 10:45
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600 text-center">
        *스튜디오 사정으로 인하여 스케줄이 변경될 수도 있습니다.
      </p>
    </div>
  );
}
