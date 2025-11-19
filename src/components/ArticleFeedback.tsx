import React, { useState } from 'react';

interface ArticleFeedbackProps {
  articleId: string;
}

export default function ArticleFeedback({ articleId }: ArticleFeedbackProps) {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'helpful' | 'not-helpful' | null>(null);

  const handleFeedback = (type: 'helpful' | 'not-helpful') => {
    // In a real implementation, you would send this to your analytics or API
    console.log(`Article ${articleId} marked as ${type}`);
    
    // For now, just update the UI
    setFeedbackType(type);
    setFeedbackSubmitted(true);
    
    // You could also store this in localStorage to remember user's feedback
    try {
      localStorage.setItem(`article-feedback-${articleId}`, type);
    } catch (error) {
      console.error('Error saving feedback to localStorage:', error);
    }
  };

  if (feedbackSubmitted) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-700 font-medium">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="text-center py-6 border-t border-gray-200 mt-8">
      <p className="text-gray-700 font-medium mb-4">Was this article helpful?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleFeedback('helpful')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          Yes
        </button>
        <button
          onClick={() => handleFeedback('not-helpful')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-red-50 hover:border-red-500 hover:text-red-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
            />
          </svg>
          No
        </button>
      </div>
    </div>
  );
}
