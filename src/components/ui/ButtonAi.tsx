import { MessageCircle } from 'lucide-react';

type ButtonAiProps = {
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChatOpen: boolean;
};

const ButtonAi: React.FC<ButtonAiProps> = ({ onOpen, isChatOpen }) => {
  return (
    <button
      type="button"
      onClick={() => onOpen((v) => !v)}
      aria-label="Toggle AI Data Chat"
      aria-controls="datachat-panel"
      aria-expanded={isChatOpen}
      className="fixed right-5 bottom-5 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/90 px-4 py-3 shadow-lg ring-1 ring-black/5 backdrop-blur hover:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">AI Chat</span>
    </button>
  );
};

export default ButtonAi;
