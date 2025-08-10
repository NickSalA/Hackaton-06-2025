"use client";
import React from "react";
import type { Lesson } from "@prisma/client";
import LessonCard from "./LessonCard";
import { useRouter } from "next/navigation";


interface LessonsListProps {
  lessons: Lesson[];
  progressMap?: Record<string, string>; // lessonId -> status
  onSelectLesson?: (lesson: Lesson) => void;
}


const LessonsList: React.FC<LessonsListProps> = ({ lessons, progressMap = {}, onSelectLesson }) => {
  const router = useRouter();
  // Progressive unlocking: habilita la primera y la siguiente solo si la anterior está COMPLETED
  let unlocked = true;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {lessons.map((lesson, idx) => {
        let enabled = false;
        if (idx === 0) {
          enabled = true;
        } else {
          const prevLesson = lessons[idx - 1];
          enabled = progressMap[prevLesson.id] === "COMPLETED";
        }
        // Si la lección ya está completada, también se puede acceder
        if (progressMap[lesson.id] === "COMPLETED") enabled = true;
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
