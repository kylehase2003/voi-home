interface LoadingSpinnerProps {
  message?: string;
  isDarkTheme?: boolean;
}

const LoadingSpinner = ({ message = "Loading...", isDarkTheme = false }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
        <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className={`animate-pulse transition-colors duration-500 ${isDarkTheme ? "text-white/70" : "text-muted-foreground"}`}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
