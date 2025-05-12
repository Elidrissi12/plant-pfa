import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreVertical, 
  Image, 
  Smile, 
  Send, 
  Filter,
  UserPlus,
  Bookmark,
  Calendar,
  TrendingUp
} from 'lucide-react';
import type { Post } from '../types';
import { mockPosts } from '../data/mockData';

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  
  // Function to "like" a post (in a real app, this would call an API)
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };
  
  // Function to submit a new post
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) return;
    
    // In a real app, this would be an API call
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: 'current-user',
      userName: 'Vous',
      userImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: newPostContent,
      images: [],
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      tags: []
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Communauté</h1>
        <p className="text-gray-600">
          Partagez vos expériences et obtenez des conseils de la communauté.
        </p>
      </div>
      
      {/* Create New Post */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <form onSubmit={handleSubmitPost}>
          <div className="flex items-start gap-3">
            <img 
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150" 
              alt="Your profile" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-grow">
              <textarea
                placeholder="Partagez vos expériences ou posez une question..."
                className="input min-h-[100px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-2">
                  <button type="button" className="btn-sm btn-outline">
                    <Image size={18} className="mr-1" />
                    Photo
                  </button>
                  <button type="button" className="btn-sm btn-outline">
                    <Smile size={18} className="mr-1" />
                    Sentiment
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="btn-sm btn-primary"
                  disabled={!newPostContent.trim()}
                >
                  <Send size={18} className="mr-1" />
                  Publier
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {/* Filters/Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b overflow-x-auto scrollbar-hide">
          <button 
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'trending' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('trending')}
          >
            <TrendingUp size={18} className="mr-2" />
            Tendances
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'recent' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('recent')}
          >
            <Calendar size={18} className="mr-2" />
            Récents
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'following' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('following')}
          >
            <UserPlus size={18} className="mr-2" />
            Abonnements
          </button>
          <button 
            className={`px-4 py-3 font-medium flex items-center ${
              activeTab === 'saved' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark size={18} className="mr-2" />
            Sauvegardés
          </button>
          <button 
            className="px-4 py-3 font-medium flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 ml-auto"
          >
            <Filter size={18} className="mr-2" />
            Filtrer
          </button>
        </div>
      </div>
      
      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={post.userImage} 
                  alt={post.userName} 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{post.userName}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString('fr-FR', { 
                      day: 'numeric', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical size={20} />
              </button>
            </div>
            
            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
              
              {/* Post Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Post Images */}
            {post.images.length > 0 && (
              <div className={`grid ${
                post.images.length === 1 ? 'grid-cols-1' : 
                post.images.length === 2 ? 'grid-cols-2' : 
                post.images.length >= 3 ? 'grid-cols-3' : ''
              } gap-1`}>
                {post.images.map((image, i) => (
                  <img 
                    key={i} 
                    src={image} 
                    alt={`Post image ${i+1}`} 
                    className={`w-full h-60 object-cover ${
                      post.images.length === 1 ? 'col-span-3' : ''
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* Post Actions */}
            <div className="px-4 py-3 border-t flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button 
                  className="flex items-center space-x-1 text-gray-500 hover:text-primary-600"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart size={20} className={post.likes > 0 ? 'fill-primary-500 text-primary-500' : ''} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
                  <MessageSquare size={20} />
                  <span>{post.comments.length}</span>
                </button>
              </div>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-600">
                <Share2 size={20} />
                <span className="hidden sm:inline">Partager</span>
              </button>
            </div>
            
            {/* Comments section */}
            {post.comments.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t">
                <h4 className="font-medium text-sm mb-3">Commentaires</h4>
                <div className="space-y-3">
                  {post.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <img 
                        src={comment.userImage} 
                        alt={comment.userName} 
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <h5 className="font-medium text-sm">{comment.userName}</h5>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                          <span>{new Date(comment.createdAt).toLocaleString('fr-FR', { 
                            day: 'numeric', 
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                          <button>J'aime</button>
                          <button>Répondre</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {post.comments.length > 2 && (
                  <button className="text-primary-600 font-medium text-sm mt-3 hover:underline">
                    Voir tous les {post.comments.length} commentaires
                  </button>
                )}
                
                <div className="mt-3 flex items-center space-x-3">
                  <img 
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150" 
                    alt="Your profile" 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Ajouter un commentaire..."
                      className="input pr-10 py-1.5 text-sm"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;