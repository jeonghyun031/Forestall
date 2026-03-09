import React, { useState } from 'react'
import { Quiz } from './components/Quiz/Quiz'
import { TopicList } from './components/TopicList/TopicList'
import { FillTheBlank } from './components/FillTheBlank/FillTheBlank'

const initialTopics = [
  {
    id: 'step-1',
    step: '1단계',
    title: '개념-단어 연결 짓기',
    completed: true,
  },
  {
    id: 'step-2',
    step: '2단계',
    title: '장비-용도 알아가기',
    completed: true,
  },
  {
    id: 'step-3',
    step: '3단계',
    title: '돌발! OX 퀴즈 맞추기',
    completed: false,
  },
  {
    id: 'step-4',
    step: '4단계',
    title: '빈칸을 채워보자!',
    completed: false,
  }
];

export const App = () => {
  const [view, setView] = useState('list'); // 'list', 'quiz', or 'fillTheBlank'
  const [topics, setTopics] = useState(initialTopics);
  const [currentTopicId, setCurrentTopicId] = useState(null);

  const handleSelectTopic = (topic) => {
    console.log('Selected topic:', topic);
    setCurrentTopicId(topic.id);
    if (topic.id === 'step-4') {
      setView('fillTheBlank');
    } else {
      setView('quiz');
    }
  };

  const handleReturnToList = () => {
    setView('list');
    setCurrentTopicId(null);
  };

  const markTopicCompleted = (id) => {
    setTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === id ? { ...topic, completed: true } : topic
      )
    );
  };

  return (
    <>
      {view === 'list' && <TopicList topics={topics} onSelectTopic={handleSelectTopic} />}
      {view === 'quiz' && <Quiz onReturnToList={handleReturnToList} onComplete={() => markTopicCompleted(currentTopicId)} />}
      {view === 'fillTheBlank' && <FillTheBlank onReturnToList={handleReturnToList} onComplete={() => markTopicCompleted(currentTopicId)} />}
    </>
  )
}
export default App