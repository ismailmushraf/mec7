import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Clock, ArrowLeft, Heart, 
  Share2, MessageCircle, Send, ChevronLeft, ChevronRight,
  User, ThumbsUp
} from 'lucide-react';
import type { ShowcaseEvent, Comment } from '../types/types';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<ShowcaseEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // Sample event data - replace with API call
  useEffect(() => {
    // Mock data - replace with actual API call
    const sampleEvent: ShowcaseEvent = {
      id: parseInt(id || '1'),
      name: "Republic Day Fitness Marathon 2024",
      date: "26 January 2024",
      description: "A grand celebration combining fitness and patriotism with over 500 participants joining for a special Republic Day workout marathon.",
      detailedContent: `
        The Republic Day Fitness Marathon 2024 was a spectacular event that brought together fitness enthusiasts from across the city. The event began at dawn with the hoisting of the national flag, followed by the singing of the national anthem by all participants.

        The workout sessions were specially designed to incorporate patriotic themes, with exercises arranged in formations representing the tricolor. Professional trainers led the crowd through high-energy routines set to motivational patriotic music.

        One of the highlights was the appearance of national-level athletes who shared their fitness journeys and motivated participants to adopt fitness as a lifestyle. The event also featured multiple workout stations catering to different fitness levels, ensuring everyone could participate comfortably.

        The marathon concluded with a community breakfast where participants shared their experiences and networked with fellow fitness enthusiasts. Many participants expressed their desire to make this an annual tradition, combining their love for the nation with their commitment to health and fitness.
      `,
      participantsCount: 523,
      location: "Peruvallur Ground",
      duration: "3 hours",
      coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
      images: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200",
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200"
      ],
      highlights: [
        "500+ participants from all age groups",
        "Tricolor-themed workout sessions",
        "Guest appearance by national athletes",
        "Community breakfast celebration",
        "Prize distribution for best performers",
        "Free health checkup camp",
        "Live DJ and entertainment"
      ],
      organizers: ["Mec7 Fitness Team", "Local Sports Authority", "District Administration"],
      comments: [
        {
          id: 1,
          author: "Priya Sharma",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
          content: "What an amazing event! The energy was incredible and the tricolor theme made it so special. Can't wait for next year!",
          timestamp: "2 days ago",
          likes: 24,
          replies: [
            {
              id: 2,
              author: "Rahul Kumar",
              content: "Totally agree! The organization was top-notch.",
              timestamp: "1 day ago",
              likes: 5
            }
          ]
        },
        {
          id: 3,
          author: "Anita Desai",
          content: "This was my first time participating in such a large fitness event. The atmosphere was so motivating!",
          timestamp: "3 days ago",
          likes: 18
        }
      ]
    };
    
    setEvent(sampleEvent);
    setComments(sampleEvent.comments);
  }, [id]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (event?.images.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (event?.images.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      content: newComment,
      timestamp: "Just now",
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.name,
        text: event?.description,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#15B1F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <section className="relative h-[400px] overflow-hidden">
        <img 
          src={event.coverImage} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/events/showcase')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {event.date}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {event.participantsCount} Participants
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {event.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="sticky top-16 z-10 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  isLiked 
                    ? 'bg-red-50 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length} Comments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Story */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Event Story</h2>
                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                  {event.detailedContent}
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                
                {/* Main Image Display */}
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={event.images[currentImageIndex]} 
                    alt={`Event photo ${currentImageIndex + 1}`}
                    className="w-full h-[400px] object-cover"
                  />
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {event.images.length}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-6 gap-2">
                  {event.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative rounded-lg overflow-hidden ${
                        idx === currentImageIndex ? 'ring-2 ring-[#15B1F1]' : ''
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-20 object-cover hover:opacity-80 transition-opacity"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Comments</h2>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this event..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#15B1F1] resize-none"
                                                rows={3}
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="mt-2 flex items-center gap-2 px-4 py-2 bg-[#15B1F1] text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        {comment.avatar ? (
                          <img 
                            src={comment.avatar} 
                            alt={comment.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{comment.author}</h4>
                            <span className="text-sm text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-[#15B1F1] transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{comment.likes}</span>
                            </button>
                            <button className="text-sm text-gray-500 hover:text-[#15B1F1] transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-8 mt-4 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="font-semibold text-sm">{reply.author}</h5>
                                    <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-700">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Event Highlights */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Event Highlights</h3>
                <ul className="space-y-3">
                  {event.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#15B1F1] rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organizers */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Organized By</h3>
                <div className="space-y-3">
                  {event.organizers.map((organizer, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#15B1F1]/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#15B1F1]" />
                      </div>
                      <span className="font-medium">{organizer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Stats */}
              <div className="bg-gradient-to-br from-[#15B1F1] to-blue-600 text-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Event Impact</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold">{event.participantsCount}</div>
                    <div className="text-white/80">Total Participants</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{event.images.length}</div>
                    <div className="text-white/80">Event Photos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{comments.length}</div>
                    <div className="text-white/80">Community Comments</div>
                  </div>
                </div>
              </div>

              {/* Share Event */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Share This Event</h3>
                <div className="flex gap-3">
                  <button className="flex-1 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5 mx-auto" />
                  </button>
                  <button className="flex-1 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <MessageCircle className="w-5 h-5 mx-auto" />
                  </button>
                  <button className="flex-1 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Heart className="w-5 h-5 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
