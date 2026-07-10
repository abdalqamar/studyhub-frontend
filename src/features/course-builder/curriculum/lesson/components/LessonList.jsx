import LessonItem from "./LessonItem";

// Mirrors SectionList: a dedicated list component so Lesson follows the
// exact same List/Item/Form shape as Section, instead of SectionItem
// mapping over lessons inline.
const LessonList = ({ lessons, sectionId, courseId, onDeleteRequest }) => {
  if (!lessons?.length) {
    return (
      <p className="text-text-3 text-xs text-center py-2">
        No lectures yet — add the first one below
      </p>
    );
  }

  return (
    <>
      {lessons.map((lesson, index) => (
        <LessonItem
          key={lesson._id}
          lesson={lesson}
          lectureIndex={index}
          sectionId={sectionId}
          courseId={courseId}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </>
  );
};

export default LessonList;
