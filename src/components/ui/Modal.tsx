import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  onSubmit: () => boolean;
  eventId: string|null;
};

const Modal: React.FC<ModalProps> = ({ onSubmit ,eventId}) => {
  const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    const isSuccess = onSubmit(); // handleSubmitの戻り値を受け取る
    if (isSuccess) {
      setIsOpen(true); // 成功した場合のみモーダルを開く
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="text-[50px] w-[900px] h-[100px] bg-green-500 px-4 py-2 border  rounded-md  text-white"
      >
        入力する
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50"></div>

          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-lg shadow-lg " // 画面中央に配置、z-50で最高層
          >
            <p>出欠の入力が完了しました</p>
              <button
                onClick={() => (closeModal(),navigate(`/attendancesheet?id=${eventId}`))}
                className="mt-4 bg-gray-300 p-2 rounded"
              >
                閉じる
              </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
