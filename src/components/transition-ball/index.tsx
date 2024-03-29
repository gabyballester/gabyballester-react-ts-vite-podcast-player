import "./styles.scss";

export const TransitionBall = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div>
      <div className={`ball ${isLoading ? "loading" : ""}`} />
    </div>
  );
};
