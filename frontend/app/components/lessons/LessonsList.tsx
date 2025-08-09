"use client";
import React from "react";
import type { Lesson } from "../../data/lessons";
import LessonCard from "./LessonCard";
import { useRouter } from "next/navigation";

interface LessonsListProps {
  lessons: Lesson[];
  onSelectLesson?: (lesson: Lesson) => void;
}

const LessonsList: React.FC<LessonsListProps> = ({ lessons, onSelectLesson }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onClick={onSelectLesson ? () => onSelectLesson(lesson) : () => router.push(`/panel/lesson/${lesson.id}`)}
        />
      ))}
    </div>
  );
};

export default LessonsList;
