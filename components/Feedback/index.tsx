import { useState, useEffect, useRef, ReactNode } from 'react';
import emailjs from 'emailjs-com';

import { Button, AccordionContent } from 'components/styled';
import { Container, Input, Email } from './styles';
import { Loader } from 'pages/styles';

export interface FeedbackProps {
  feedbackHint: ReactNode;
  metaData: string;
}

let waitToNext = false;

async function sendEmail(feedback: string, metaData: string, from: string) {
  return emailjs.send(
    'service_myyfhk2',
    'template_6mzv68t',
    { feedback, metaData, from },
    'user_Qvh1SpLlghHF8sSPelau2'
  );
}

export default function Feedback({ feedbackHint, metaData }: FeedbackProps) {
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(waitToNext);
  const waitTs = useRef(null);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ts = setTimeout(() => {
      setWait(false);
    }, 5000);

    return () => {
      clearTimeout(ts);
      clearTimeout(waitTs.current);
    };
  }, []);

  const send = async () => {
    if (!feedbackValue || wait) {
      return;
    }

    try {
      setLoading(true);
      await sendEmail(feedbackValue, metaData, email);
      setFeedbackOpen(false);
      setLoading(false);

      setWait(true);
      waitToNext = true;

      waitTs.current = setTimeout(() => {
        setWait(false);
        waitToNext = false;
      }, 10000);
    } catch (e) {
      console.error(e);
      alert('Coś poszło nie tak. Spróbuj za chwilę jeszcze raz!');
    }
  };

  return (
    <Container>
      <Button
        $fontSize={0.85}
        onClick={() => setFeedbackOpen((isOpen) => !isOpen)}
        disabled={wait}
      >
        {wait ? 'Dzięki za wysłanie feedbacku!' : feedbackHint}
      </Button>
      <AccordionContent $isOpen={feedbackOpen} $maxHeight={300}>
        <Input
          value={feedbackValue}
          placeholder="Piszesz wiadomość bezprośrednio do autora strony. 
            Jeśli wolisz wysłać emaila śmiało pisz na kspacja@gmail.com..."
          onChange={(event) => {
            setFeedbackValue(event.target.value);
          }}
          disabled={loading}
        />
        <Email
          value={email}
          placeholder="Jeśli chcesz, abym Ci opisał zostaw email, link do twittera albo do fb..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          disabled={loading}
        />
        <Loader $loading={loading} />
        <Button onClick={send} disabled={loading}>
          Wyślij
        </Button>
      </AccordionContent>
    </Container>
  );
}
