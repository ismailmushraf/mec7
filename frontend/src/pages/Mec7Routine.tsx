// Mec7Routine.tsx
import React from 'react';
import { Activity } from 'lucide-react';
import WorkoutCard from '../components/workout/WorkoutCard';

// Sample data for 21 workouts
const workouts = [
  {
    title: "Sun Salutation",
    description: "A flowing sequence of 12 powerful yoga poses that energize your entire body.",
    benefits: ["Improves flexibility", "Boosts cardiovascular health", "Reduces stress"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual URLs
    videoType: "youtube" as const
  },
  {
    title: "Mountain Climbers",
    description: "Dynamic full-body exercise that targets core, shoulders, and legs simultaneously.",
    benefits: ["Burns calories rapidly", "Strengthens core", "Improves coordination"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Plank Hold",
    description: "Isometric core exercise that builds endurance and stability throughout your body.",
    benefits: ["Strengthens entire core", "Improves posture", "Builds mental toughness"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Jump Squats",
    description: "Explosive lower body exercise that combines strength training with cardio.",
    benefits: ["Builds leg power", "Increases heart rate", "Burns fat efficiently"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Push-up Variations",
    description: "Classic upper body exercise with modifications to target different muscle groups.",
    benefits: ["Builds chest strength", "Tones arms", "No equipment needed"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "High Knees",
    description: "High-intensity cardio move that engages your core and improves running form.",
    benefits: ["Improves cardiovascular fitness", "Strengthens hip flexors", "Burns calories"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Burpees",
    description: "Full-body exercise that combines strength and cardio for maximum calorie burn.",
    benefits: ["Works entire body", "Builds endurance", "Improves mobility"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  // Add 14 more workouts to complete the 21...
  {
    title: "Lunges",
    description: "Unilateral leg exercise that improves balance and strengthens lower body.",
    benefits: ["Targets glutes and quads", "Improves balance", "Corrects muscle imbalances"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Russian Twists",
    description: "Rotational core exercise that targets obliques and improves rotational strength.",
    benefits: ["Strengthens obliques", "Improves rotational power", "Enhances core stability"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Bicycle Crunches",
    description: "Dynamic ab exercise that targets both upper and lower abs effectively.",
    benefits: ["Works entire core", "Improves coordination", "Burns belly fat"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Wall Sit",
    description: "Isometric exercise that builds lower body endurance and mental toughness.",
    benefits: ["Builds quad endurance", "Low impact", "Improves posture"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Jumping Jacks",
    description: "Classic cardio exercise that warms up the entire body quickly.",
    benefits: ["Full body warm-up", "Improves coordination", "Boosts mood"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Tricep Dips",
    description: "Bodyweight exercise targeting the back of the arms for toned triceps.",
    benefits: ["Tones arms", "Builds upper body strength", "Can be done anywhere"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Side Plank",
    description: "Lateral core stability exercise that strengthens obliques and improves balance.",
    benefits: ["Targets obliques", "Improves balance", "Reduces back pain"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Box Jumps",
    description: "Plyometric exercise that builds explosive power in the lower body.",
    benefits: ["Builds explosive power", "Improves athleticism", "Burns calories"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Flutter Kicks",
    description: "Swimming-inspired ab exercise that targets lower abs and hip flexors.",
    benefits: ["Targets lower abs", "Improves core endurance", "Low back friendly"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Bear Crawl",
    description: "Primal movement that engages entire body while improving coordination.",
    benefits: ["Full body workout", "Improves mobility", "Builds functional strength"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Diamond Push-ups",
    description: "Advanced push-up variation that intensely targets triceps and inner chest.",
    benefits: ["Builds arm strength", "Targets inner chest", "Increases push-up difficulty"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Leg Raises",
    description: "Core exercise that specifically targets lower abdominal muscles.",
    benefits: ["Strengthens lower abs", "Improves hip flexibility", "Reduces lower back pain"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Shadow Boxing",
    description: "Cardio exercise that improves coordination while burning calories.",
    benefits: ["Improves hand-eye coordination", "Stress relief", "Full body cardio"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  },
  {
    title: "Cool Down Stretches",
    description: "Essential stretching routine to improve flexibility and prevent injury.",
    benefits: ["Improves flexibility", "Reduces muscle soreness", "Promotes relaxation"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoType: "youtube" as const
  }
];

const Mec7Routine: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-10 h-10 text-[#15B1F1]" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Mec7 Routine
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master all 21 workouts of the Mec7 fitness program. Each exercise is designed to build strength, 
            improve flexibility, and boost your overall fitness.
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              title={workout.title}
              description={workout.description}
              benefits={workout.benefits}
              videoUrl={workout.videoUrl}
              videoType={workout.videoType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mec7Routine;
