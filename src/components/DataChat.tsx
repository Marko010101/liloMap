import { useState } from 'react';
import OpenAI from 'openai';
import { X } from 'lucide-react';
import storeData from '../data/store';
import invoices from '../data/invoices';
import ChatBox from './ChatBox';

type DataChatProps = {
  open: boolean;
  onClose: () => void;
};

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const mockData = [{ storeData }, { invoices }];

export default function DataChat({ open, onClose }: DataChatProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onAsk = async (q: string) => {
    try {
      setIsLoading(true);
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
                      You are a helpful data analyst. 
                      Analyze the provided JSON data and answer questions about it clearly and briefly.
                      - Keep answers under <b>3 sentences</b> unless calculations are absolutely required.
                      - Use <b>HTML bold tags</b> (<b>...</b>) to highlight important names, numbers, or results.
                      - Do <b>not</b> list every record — summarize only the key findings.
                      - If something is unclear from the data, briefly say "თქვენი მონაცემები არ არის საკმარისი პასუხის გასაცემად."
                    `,
          },
          {
            role: 'user',
            content: `Data:\n${JSON.stringify(mockData, null, 2)}\n\nQuestion: ${q}`,
          },
        ],
        temperature: 0.2,
      });

      setAnswer(response.choices[0]?.message?.content || 'No response');
    } catch {
      setAnswer(
        '⚠️ Error calling the model. Check API key/billing and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop (mobile & tablet) */}
      <div
        className={`fixed inset-0 z-[100] bg-black/30 transition-opacity ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        } lg:hidden`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Slide-in panel */}
      <aside
        id="datachat-panel"
        className={`fixed top-0 right-0 z-[70] h-screen w-full border-l bg-white shadow-xl transition-transform duration-300 ease-in-out md:w-[320px] lg:w-[320px] ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col`} // <-- flex col
        role="dialog"
        aria-modal="true"
        aria-label="AI Data Chat Panel"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/80 px-4 pt-3 backdrop-blur">
          <h2 className="text-base font-semibold">AI Data Chat 💬</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI Data Chat"
            className="inline-flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content area fills remainder and allows inner scrolling */}
        <div className="min-h-0 flex-1">
          <ChatBox
            question={question}
            setQuestion={setQuestion}
            answer={answer}
            setAnswer={setAnswer}
            onAsk={onAsk}
            isLoading={isLoading}
            className="h-full rounded-none border-0 shadow-none"
          />
        </div>
      </aside>
    </>
  );
}
