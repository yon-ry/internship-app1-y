import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import Header from "./components/ui/Header";
import { useNavigate } from "react-router-dom";

type Choice = "circle" | "triangle" | "cross";
type Participant = {
  id: string;
  name: string;
  comment?: string;
  availability: Record<string, Choice>;
};

type EventData = {
  id: string;
  eventName: string;
  memo: string;
  candidateDates: string[];
  participants: Participant[];
};
function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [eventName, setEventName] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [candidateDates, setCandidateDates] = useState<string>("");
  const [inputTime, setInputTime] = useState<string>("19:00～");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [pastEvents, setPastEvents] = useState<EventData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const events: EventData[] = JSON.parse(savedEvents);
      setPastEvents(events);
    }
  }, []);

  const handleDateClick = (day: Date) => {
    if (isChecked) {
      setCandidateDates((prevText) => {
        return prevText + day.toLocaleDateString() + "  " + inputTime + "\n";
      });
    } else {
      setCandidateDates((prevText) => {
        return prevText + day.toLocaleDateString() + "\n";
      });
    }
    setDate(day);
  };

  const saveToLocalStorage = () => {
    if (!eventName.trim() || !candidateDates.trim()) {
      alert("イベント名と日程候補の入力は必須です");
      return;
    }

    const events = JSON.parse(localStorage.getItem("events") || "[]");

    const eventData = {
      id: crypto.randomUUID(),
      eventName: eventName,
      memo: memo,
      candidateDates: candidateDates
        .split("\n")
        .map((d) => d.trim())
        .filter((d) => d !== ""),
      participants: [],
    };

    events.push(eventData);
    localStorage.setItem("events", JSON.stringify(events));

    localStorage.setItem("latestEventId", eventData.id);
    navigate("/attendancesheet");
    console.log("データをローカルストレージに保存しました:", eventData);
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
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
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
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
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
            value={candidateDates}
            className=" text-[24px] w-[400px] h-[300px] bg-white px-4 py-2 border  rounded-md  placeholder-gray-400"
            placeholder="候補の区切りは改行で判断されます。内容は直接編集できます。"
            onChange={(e) => setCandidateDates(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="text-[24px]">
            <input
              type="checkbox"
              checked={isChecked}
              className="w-5 h-5"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>日付の後に時刻を追加する</span>
          </div>
          {isChecked && (
            <input
              type="text"
              className="text-[24px] w-[400px] h-[60px] bg-white px-4 py-2 border  rounded-md  placeholder-gray-400"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
          )}
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
        <button
          onClick={saveToLocalStorage}
          className="text-[50px] w-[900px] h-[150px] bg-green-500 px-4 py-2 border  rounded-md  text-white"
        >
          出欠表をつくる
        </button>
      </div>
      <div className="container mx-auto mt-10">
        <h2 className="text-[32px] font-bold mb-4 text-center">過去に作成したイベント</h2>
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-[24px] font-bold text-gray-800">{event.eventName}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{event.memo}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.candidateDates.map((date, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-2 py-1 rounded-full">
                      {date}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button 
                    onClick={() => navigate(`/attendancesheet`)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    出欠表を見る
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-[20px]">まだイベントがありません。</p>
        )}
      </div>
    </div>
  );
}

export default App;
