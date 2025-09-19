import { useState, useEffect } from "react";
import Header from "./components/ui/Header";
import AttendanceTable from "./components/ui/AttendanceTable";
import { useNavigate, useSearchParams } from "react-router-dom"; // useNavigate, useSearchParamsをインポート

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

function AttendanceSheet() {
  const [eventsData, setEventsData] = useState<EventData | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const eventId = searchParams.get('id'); // URLから'id'パラメータを取得
    const savedEvents = localStorage.getItem("events");

    if (savedEvents && eventId) { // eventIdが存在する場合にのみ検索を実行
      const events = JSON.parse(savedEvents);
      const targetEvent = events.find((ev: EventData) => ev.id === eventId);
      if (targetEvent) {
        setEventsData(targetEvent);
      } else {
        console.error("指定されたIDのイベントが見つかりません。");
        setEventsData(null);
      }
    } else {
      // IDが指定されていない場合は、最新のイベントを読み込む（既存の動作）
      const latestEventId = localStorage.getItem("latestEventId");
      if (savedEvents && latestEventId) {
        const events = JSON.parse(savedEvents);
        const latestEvent = events.find((ev: EventData) => ev.id === latestEventId);
        if (latestEvent) {
          setEventsData(latestEvent);
        }
      }
    }
  }, [searchParams]);

  // 出欠入力ページに遷移する関数
  const handleNavigateToInput = () => {
    // 現在のURLのIDを保持して遷移
    const eventId = searchParams.get('id');
    navigate(`/attendanceinput?id=${eventId}`);
  };

  if (!eventsData) {
    return (
      <div>
        <Header />
        <p className="text-center mt-10 text-gray-500 text-xl">
          イベントデータが見つかりません。
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex-col bg-white ml-40 space-y-2">
        <p className="text-gray-500 text-[50px] font-bold">
          {eventsData.eventName}
        </p>
        <p className="text-gray-500 text-[20px]">回答者{eventsData.participants.length}名</p>
        <p className="text-gray-500 text-[35px]">{eventsData.memo}</p>
      </div>
      <div className="bg-gray-50 ">
        <div className="space-x-4  ml-40 ">
          <span className="text-[24px] font-bold bg-gray-500 text-white px-2 py-1">
            {" "}
          </span>
          <span className="text-[24px] font-bold ">日程候補</span>
        </div>
        <div className="flex justify-center">
          <AttendanceTable candidateDates={eventsData.candidateDates} participants={eventsData.participants} />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleNavigateToInput}
            className="text-[50px] w-[900px] h-[100px] bg-green-500 px-4 py-2 border  rounded-md  text-white"
          >
            出欠を入力する
          </button>
        </div>
      </div>
    </div>
  );
}

export default AttendanceSheet;