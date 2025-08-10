"use client";
import React from "react";
import type { Lesson } from "@prisma/client";
import LessonCard from "./LessonCard";
import { useRouter } from "next/navigation";

interface LessonsListProps {
  lessons: Lesson[];
  onSelectLesson?: (lesson: Lesson) => void;
}


const LessonsList: React.FC<LessonsListProps> = ({ lessons, onSelectLesson }) => {
  const router = useRouter();
  // Progressive unlocking: only the first lesson and previous completed ones are enabled
  // For demo, only the first lesson is enabled. Replace logic with real progress as needed.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {lessons.map((lesson, idx) => {
        // Only the first lesson is enabled; others are disabled
        const enabled = idx === 0;
        return (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            number={idx + 1}
            onClick={onSelectLesson ? () => onSelectLesson(lesson) : () => router.push(`/panel/lesson/${lesson.id}`)}
            enabled={enabled}
          />
        );
      })}
    </div>
  );
};

export default LessonsList;
