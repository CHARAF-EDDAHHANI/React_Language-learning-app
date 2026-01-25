import { Grid } from "@mui/material";
import SessionBoard from "../component/SessionBoard";
import QuizBoard from "../component/QuizBoard"
import AssignmentBoard from "../component/AssignmentBoard";
import { useSession } from "../hooks/useSession";
import { useQuiz } from "../hooks/useQuiz";
import { useAssignment } from "../hooks/useAssignment";

export default function TeacherDashboard() {
  const { createSession, loading: sessionLoading } = useSession();
  const { createQuiz, loading:quizLoading} = useQuiz();
  const { createAssignment, loading: assignmentLoading} = useAssignment();

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12}>
        <SessionBoard
          onCreateSession={createSession}
          loading={sessionLoading}
        />
        <QuizBoard
          onCreateQuiz={createQuiz}
          loading={quizLoading}
        />
        <AssignmentBoard
        onCreateAssignment={createAssignment}
        loading={assignmentLoading}
        />
      </Grid>
    </Grid>
  );
}
