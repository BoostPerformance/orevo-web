type DayType = '월' | '화' | '수' | '목' | '금';
type ScheduleType = Record<DayType, string>;

export default function WeeklySchedule() {
  const days: DayType[] = ['월', '화', '수', '목', '금'];
  const schedule: ScheduleType = {
    월: '근력',
    화: '복합',
    수: '휴무',
    목: '근력',
    금: '유산소',
  };

  return (
    <div className="w-full bg-[#F8F7F4] rounded-lg p-6 xs:p-2 border-green-800 text-gray-13">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm xs:text-1-500">
          <thead>
            <tr>
              <th className="p-4 xs:p-2 text-center min-w-[80px] xs:min-w-[60px] border-b border-t-2 border-r border-green-900 xs:text-gray-5"></th>
              {days.map((day) => (
                <th
                  key={day}
                  className={`p-4 xs:p-2 text-center min-w-[60px] xs:min-w-[29px] font-medium border-t-2 border-b border-green-800  ${
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
              <td className="p-4 xs:p-1 text-center font-medium border-t border-l border-r border-green-800">
                <span className="xs:text-0.875-500">08:15</span>
                <span className="xs:hidden">오전 08:15</span>
              </td>
              {days.map((day) => (
                <td
                  key={day}
                  rowSpan={3}
                  className={`p-4 xs:p-0 text-center border-r border-green-800 xs:text-gray-5 ${
                    day === '화' || day === '목' ? 'bg-white' : 'bg-[#F8F7F4]'
                  }`}
                >
                  {schedule[day]}
                </td>
              ))}
            </tr>
            <tr className="border-b border-green-800">
              <td className="p-4 xs:p-2 text-center font-medium border-l border-r border-green-800">
                <span className="xs:text-0.875-500">09:30</span>
                <span className="xs:hidden">오전 09:30</span>
              </td>
            </tr>
            <tr className="border-b border-green-800 last:border-b-2">
              <td className="p-4 xs:p-2 text-center font-medium border-l border-r border-green-800">
                <span className="xs:text-0.875-500">10:45</span>
                <span className="xs:hidden">오전 10:45</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm xs:text-0.75-500 text-gray-600 text-center">
        *스튜디오 사정으로 인하여 스케줄이 변경될 수도 있습니다.
      </p>
    </div>
  );
}
