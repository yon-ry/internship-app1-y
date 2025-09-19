import Header from "./components/ui/Header";
import Modal from "./components/ui/Modal";
import CandidateDatesInput from "./components/ui/CandidateDatesInput";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // useSearchParamsとuseNavigateをインポート

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

function AttendanceInput() {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [candidateDates, setCandidateDates] = useState<string[]>([]);
  const [availability, setAvailability] = useState<Record<string, Choice>>({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const eventId = searchParams.get('id'); // URLから'id'パラメータを取得
    const savedEvents = localStorage.getItem("events");

    if (savedEvents && eventId) {
      const events: EventData[] = JSON.parse(savedEvents);
      const latestEvent = events.find((ev) => ev.id === eventId);
      if (latestEvent && Array.isArray(latestEvent.candidateDates)) {
        setCandidateDates(latestEvent.candidateDates);

        const initialAvailability: Record<string, Choice> = {};
        latestEvent.candidateDates.forEach((date) => {
          initialAvailability[date] = "cross"; 
        });
        setAvailability(initialAvailability); // stateを更新
      }
    }
  }, [searchParams]);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("名前を入力してください");
      return false;
    }
    
    const eventId = searchParams.get('id');
    const savedEvents = localStorage.getItem("events");

    if (savedEvents && eventId) {
      const events: EventData[] = JSON.parse(savedEvents);
      const updatedEvents = events.map((ev) => {
        if (ev.id === eventId) {
          const newParticipant: Participant = {
            id: crypto.randomUUID(), // UUIDでIDを生成
            name,
            comment,
            availability,
          };
          return {
            ...ev,
            participants: [...(ev.participants || []), newParticipant],
          };
        }
        return ev;
      });
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      navigate(`/attendancesheet?id=${eventId}`); // フォーム送信後に元の出欠表に戻る
    }
    return true;
  };

  return (
    <>
      <Header />
      <div className="flex justify-center bg-gray-50">
        <div className="text-[24px] space-y-2">
          <p className="underline underline-offset-8 font-bold">
            出欠を入力する&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          </p>
          <div className="space-x-4">
            <span className="text-[20px] font-bold bg-gray-500 text-white px-2 py-1">
              &nbsp;
            </span>
            <span className="text-[20px]  ">名前</span>
          </div>
          <input
            type="text"
            className=" w-[800px] h-[60px] bg-white px-4 py-2 border  rounded-md  placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="space-x-4">
            <span className="text-[20px] font-bold bg-gray-500 text-white px-2 py-1">
              &nbsp;
            </span>
            <span className="text-[20px]  ">日程候補</span>
          </div>
          <CandidateDatesInput
            candidateDates={candidateDates}
            onChange={setAvailability}
          />
          <div className="space-x-4">
            <span className="text-[20px] font-bold bg-gray-500 text-white px-2 py-1">
              &nbsp;
            </span>
            <span className="text-[20px]  ">コメント</span>
          </div>
          <input
            type="text"
            className=" w-[800px] h-[60px] bg-white px-4 py-2 border  rounded-md  placeholder-gray-400"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Modal onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default AttendanceInput;