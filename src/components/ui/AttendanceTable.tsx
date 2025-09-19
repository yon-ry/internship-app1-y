import React from "react";

type Choice = "circle" | "triangle" | "cross";

type Participant = {
  id: string;
  name: string;
  availability: Record<string, Choice>;
  comment?: string;
};

type TableProps = {
  candidateDates: string[];
  participants: Participant[];
};

function AttendanceTable({ candidateDates, participants }: TableProps) {
  const choiceIcon = (choice: Choice | undefined) => {
    if (choice === "circle") return "◯";
    if (choice === "triangle") return "△";
    if (choice === "cross") return "×";
    return "";
  };

  return (
    <div className="p-4 overflow-x-auto">
      <table className="border-collapse border border-gray-300 text-center min-w-[1000px]">
        <thead>
          <tr className="bg-gray-100 text-[18px]">
            <th className="border border-gray-300 px-4 py-2">日程</th>
            <th className="border border-gray-300 px-4 py-2">◯</th>
            <th className="border border-gray-300 px-4 py-2">△</th>
            <th className="border border-gray-300 px-4 py-2">×</th>
            {participants.map((p) => (
              <th key={p.id} className="border border-gray-300 px-4 py-2">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {candidateDates.map((date) => {
            const circleCount = participants.filter(
              (p) => p.availability?.[date] === "circle"
            ).length;
            const triangleCount = participants.filter(
              (p) => p.availability?.[date] === "triangle"
            ).length;
            const crossCount = participants.filter(
              (p) => p.availability?.[date] === "cross"
            ).length;

            return (
              <tr key={date} className="text-[18px]">
                <td className="border border-gray-300 px-4 py-2 font-bold bg-gray-100">
                  {date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {circleCount}人
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {triangleCount}人
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {crossCount}人
                </td>
                {participants.map((p) => (
                  <td
                    key={p.id}
                    className="border border-gray-300 px-4 py-2 text-[20px]"
                  >
                    {choiceIcon(p.availability?.[date])}
                  </td>
                ))}
              </tr>
            );
          })}

          {/* コメント行 */}
          <tr className="text-[16px]">
            <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold">
              コメント
            </td>
            {/* ◯△×の人数カラムは空白にしておく */}
            <td className="border border-gray-300 px-4 py-2" colSpan={3}></td>
            {/* 参加者ごとのセルにコメントを出す */}
            {participants.map((p) => (
              <td
                key={p.id + "-comment"}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {p.comment ? (
                  <span>
                    <span className="font-semibold"></span>
                    {p.comment}
                  </span>
                ) : (
                  " "
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
