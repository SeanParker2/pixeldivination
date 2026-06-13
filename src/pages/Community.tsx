import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Send, Plus, Loader2 } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import api from '../lib/api';
import { useUserStore } from '../stores/useUserStore';
import { useToastStore } from '../stores/useToastStore';

interface Post {
  id: string;
  userId: string;
  content: string;
  postType: string;
  imageUrl?: string;
  userNickname: string;
  userZodiac?: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  userLiked: boolean;
}

const ZODIAC_SYMBOLS: Record<string, string> = {
  '白羊座': '♈', '金牛座': '♉', '双子座': '♊', '巨蟹座': '♋',
  '狮子座': '♌', '处女座': '♍', '天秤座': '♎', '天蝎座': '♏',
  '射手座': '♐', '摩羯座': '♑', '水瓶座': '♒', '双鱼座': '♓',
};

const POST_TYPES = [
  { id: 'all', label: '全部' },
  { id: 'tarot', label: '塔罗' },
  { id: 'astrology', label: '占星' },
  { id: 'bazi', label: '八字' },
  { id: 'general', label: '日常' },
];

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  useUserStore();
  const showToast = useToastStore(s => s.addToast);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeType, setActiveType] = useState('all');
  const [showCompose, setShowCompose] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: any = { page: 1, limit: 20 };
      if (activeType !== 'all') params.postType = activeType;
      const res: any = await api.get('/community/posts', { params });
      setPosts(res.items || []);
    } catch {
      // Silent fail
    } finally {
      setIsLoading(false);
    }
  }, [activeType]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = async (postId: string) => {
    try {
      const res: any = await api.post(`/community/posts/${postId}/like`);
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            userLiked: res.liked,
            likeCount: res.liked ? p.likeCount + 1 : p.likeCount - 1,
          };
        }
        return p;
      }));
    } catch {
      showToast('操作失败', 'error');
    }
  };

  const handlePost = async () => {
    if (!newContent.trim()) return;
    setIsPosting(true);
    try {
      await api.post('/community/posts', {
        content: newContent.trim(),
        postType: 'general',
      });
      setNewContent('');
      setShowCompose(false);
      showToast('发布成功！', 'success');
      fetchPosts();
    } catch {
      showToast('发布失败', 'error');
    } finally {
      setIsPosting(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  };

  return (
    <MobileContainer hideHeader className="bg-[#020617] relative overflow-hidden">
      <div className="scanlines" />
      <div className="vignette" />

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-white/60 hover:text-white p-1">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl text-white font-pixel">星座圈</h1>
            <p className="text-xs text-gray-500">分享你的占卜心得</p>
          </div>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="w-8 h-8 rounded-full bg-pixel-gold/20 border border-pixel-gold/30 flex items-center justify-center text-pixel-gold hover:bg-pixel-gold/30 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {POST_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
              activeType === type.id
                ? 'bg-pixel-gold/20 text-pixel-gold border border-pixel-gold/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="relative z-10 px-4 pb-8 overflow-y-auto h-[calc(100%-120px)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-pixel-gold" size={24} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">还没有帖子</p>
            <p className="text-gray-600 text-xs mt-1">成为第一个分享的人吧！</p>
          </div>
        ) : (
          <div className="space-y-3 mt-2">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4"
              >
                {/* Post Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pixel-gold/30 to-purple-500/30 flex items-center justify-center text-sm">
                    {post.userZodiac ? ZODIAC_SYMBOLS[post.userZodiac] || '☆' : '☆'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{post.userNickname}</p>
                    <p className="text-gray-500 text-[10px]">{post.userZodiac || '未知星座'} · {formatTime(post.createdAt)}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-200 text-sm leading-relaxed mb-3">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 text-xs transition-colors ${
                      post.userLiked ? 'text-pink-400' : 'text-gray-500 hover:text-pink-400'
                    }`}
                  >
                    <Heart size={14} fill={post.userLiked ? 'currentColor' : 'none'} />
                    <span>{post.likeCount || ''}</span>
                  </button>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MessageCircle size={14} />
                    <span>{post.commentCount || ''}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {showCompose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowCompose(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md bg-[#1E1E2E] border-t border-white/10 rounded-t-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-sm">发帖</span>
                <button
                  onClick={handlePost}
                  disabled={!newContent.trim() || isPosting}
                  className="px-4 py-1.5 rounded-full bg-pixel-gold text-black text-xs font-bold disabled:opacity-50 flex items-center gap-1"
                >
                  {isPosting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                  发布
                </button>
              </div>
              <textarea
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="分享你的占卜心得、星座感悟..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm placeholder:text-gray-600 focus:border-pixel-gold/50 focus:outline-none resize-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};

export default CommunityPage;
