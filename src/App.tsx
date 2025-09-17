import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Header from "./components/ui/Header";
import { Link } from "react-router-dom";

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [scheduleText, setScheduleText] = useState("");

  const handleDateClick = (day) => {
    document.getElementById("dateBox").value += day.toLocaleDateString() + "\n";
    console.log("クリックされた日付:", day.toLocaleDateString());
  };
  return (
    <div className=" bg-lime-100 flex-col space-y-[40px]">
      <Header />
      <div className="flex gap-x-[20px] justify-center ">
        <div className="space-y-2">
          <div className="flex space-x-4">
            <span className="text-[24px] font-bold bg-gray-500 text-white px-2 py-1">
              STEP1
            </span>
            <span className="text-[24px] font-bold ">イベント名</span>
          </div>
          <input
            type="text"
            className="text-[24px] w-[400px] h-[60px] bg-white px-4 py-2 border  rounded-md  placeholder-gray-400"
            placeholder="例: 今期もお疲れ様でした会　など"
          />

          <div className="flex space-x-4">
            <span className="text-[24px] font-bold bg-gray-500 text-white px-2 py-1">
              {" "}
            </span>
            <span className="text-[24px] font-bold ">メモ</span>
          </div>
          <textarea
            className=" text-[24px] w-[400px] h-[300px] bg-white px-4 py-2 border  rounded-md  placeholder-gray-400"
            placeholder="例: 飲み会の日程調整しましょう！   出欠〆切〇日　など"
          />
        </div>
        <div className="space-y-2">
          <div className="flex space-x-4">
            <span className="text-[24px] font-bold bg-gray-500 text-white px-2 py-1">
              STEP2
            </span>
            <span className="text-[24px] font-bold ">日程候補</span>
          </div>
          <p>カレンダーをクリックすると日程候補に日付が入ります。</p>
          <p>例:8/7(月) 19:00～</p>

          <textarea
            id="dateBox"
            className=" text-[24px] w-[400px] h-[300px] bg-white px-4 py-2 border  rounded-md  placeholder-gray-400"
            placeholder="候補の区切りは改行で判断されます。内容は直接編集できます。"
          />
        </div>
        <div className="flex-none">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            onDayClick={handleDateClick}
            className="rounded-lg border w-[400px]"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Link to="/attendancesheet">
          <button
            onClick={() => {}}
            className="text-[50px] w-[900px] h-[150px] bg-green-500 px-4 py-2 border  rounded-md  text-white"
          >
            出欠表をつくる
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
