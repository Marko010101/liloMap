import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { MessageCircleQuestionMark } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; text: string };

export default function ChatBox({
  setQuestion,
  answer,
  setAnswer,
  onAsk,
  className,
  isLoading,
}: {
  question: string;
  setQuestion: (v: string) => void;
  answer: string;
  setAnswer: (v: string) => void;
  onAsk: (q: string) => Promise<void>;
  className?: string;
  isLoading: boolean;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!answer) return;
    setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
  }, [answer, setAnswer]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setQuestion(text);
    await onAsk(text);
  };

  return (
    <Card className={className}>
      <CardContent className="flex h-full min-h-0 flex-col p-2">
        <ScrollArea className="mb-2 min-h-0 flex-1 rounded-md border p-1">
          {messages.length === 0 ? (
            <div className="mt-65 flex h-full flex-col items-center justify-center gap-3 text-center text-green-900">
              <p>ჰკითხეთ AI-ს ინვოისებისა და სავაჭრო წერტილების შესახებ.</p>
              <MessageCircleQuestionMark className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex flex-col">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`my-1 flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-md p-2 break-words ${
                      m.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                    dangerouslySetInnerHTML={{ __html: m.text }}
                  />
                </div>
              ))}
              <div ref={endRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input row stays fixed at the bottom */}
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            rows={2}
            className="border-input bg-background placeholder:text-muted-foreground ring-offset-background focus-visible:ring-ring h-[60px] flex-1 resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? '...' : 'Send'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
