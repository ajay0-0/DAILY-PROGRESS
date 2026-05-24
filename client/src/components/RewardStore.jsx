import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiUnlock, FiX } from 'react-icons/fi';

/**
 * Reward Store Component
 * Displays unlockable rewards based on daily progress tiers
 * with smooth animations and interactions
 */

const RewardStore = ({ 
  dailyProgress = 0, 
  virtualWallet = 0,
  unlockedRewards = [],
  onClaimReward = () => {}
}) => {
  const [selectedReward, setSelectedReward] = useState(null);

  const rewards = [
    {
      id: 'supercar',
      tier: 100,
      name: 'Virtual Supercar',
      emoji: '🏎️',
      price: 500,
      description: 'Unlock at 100% daily progress. Experience the pinnacle of luxury and achievement.',
      color: 'from-red-600 to-red-800',
      borderColor: 'border-red-500',
      lightColor: 'text-red-400'
    },
    {
      id: 'rolex',
      tier: 90,
      name: 'Virtual Rolex Watch',
      emoji: '⌚',
      price: 300,
      description: 'Unlock at 90%+ progress. Timeless elegance for your consistent hard work.',
      color: 'from-yellow-600 to-yellow-800',
      borderColor: 'border-yellow-500',
      lightColor: 'text-yellow-400'
    },
    {
      id: 'apple',
      tier: 80,
      name: 'Premium Apple Products',
      emoji: '🍎',
      price: 200,
      description: 'Unlock at 80%+ progress. Innovation meets lifestyle excellence.',
      color: 'from-slate-600 to-slate-800',
      borderColor: 'border-slate-500',
      lightColor: 'text-slate-400'
    },
    {
      id: 'luxury',
      tier: 70,
      name: 'Luxury Shirts & Perfumes',
      emoji: '👔',
      price: 100,
      description: 'Unlock at 70%+ progress. Style and sophistication are calling.',
      color: 'from-emerald-600 to-emerald-800',
      borderColor: 'border-emerald-500',
      lightColor: 'text-emerald-400'
    }
  ];

  const isRewardUnlocked = (reward) => {
    return dailyProgress >= reward.tier;
  };

  const isRewardClaimed = (rewardId) => {
    return unlockedRewards.includes(rewardId);
  };

  const getRewardStatus = (reward) => {
    if (isRewardClaimed(reward.id)) {
      return { status: 'claimed', label: '✓ Claimed', color: 'text-emerald-400' };
    }
    if (isRewardUnlocked(reward)) {
      return { status: 'unlocked', label: '🎁 Available', color: 'text-yellow-400' };
    }
    return { status: 'locked', label: `Locked @ ${reward.tier}%`, color: 'text-gray-500' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Reward Store</h2>
        <p className="text-sm text-gray-400">Unlock luxury rewards with consistent daily progress</p>
      </div>

      {/* Progress Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-gradient-to-r from-blue-900/50 to-blue-800/30 rounded-lg border border-blue-700/50 backdrop-blur-sm"
      >
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Today's Progress:</span>
            <motion.span 
              className="text-xl font-bold text-emerald-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {dailyProgress}%
            </motion.span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
              animate={{ width: `${dailyProgress}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="text-xs text-gray-400">
            {dailyProgress >= 70 
              ? '🎉 Great! You have unlocked rewards!' 
              : `${100 - dailyProgress}% more to unlock rewards`}
          </p>
        </div>
      </motion.div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {rewards.map((reward, idx) => {
            const { status, label, color } = getRewardStatus(reward);
            const isUnlocked = isRewardUnlocked(reward);

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                onClick={() => isUnlocked && setSelectedReward(reward)}
                className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  isUnlocked
                    ? `bg-gradient-to-br ${reward.color} ${reward.borderColor} shadow-lg hover:shadow-xl`
                    : 'bg-gray-800/50 border-gray-700/50 opacity-60'
                }`}
              >
                {/* Lock/Unlock Badge */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: isUnlocked ? 0 : 10 }}
                    transition={{ duration: 0.6, repeat: !isUnlocked ? Infinity : 0 }}
                  >
                    {isUnlocked ? (
                      <FiUnlock className={`w-6 h-6 ${color}`} />
                    ) : (
                      <FiLock className="w-6 h-6 text-gray-500" />
                    )}
                  </motion.div>
                </div>

                {/* Reward Content */}
                <div className="space-y-3">
                  {/* Emoji */}
                  <motion.div 
                    className="text-4xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {reward.emoji}
                  </motion.div>

                  {/* Name & Status */}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {reward.name}
                    </h3>
                    <p className={`text-sm mt-1 font-semibold ${color}`}>
                      {label}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {reward.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <span className="text-xs text-gray-300">
                      {reward.tier}% Unlock
                    </span>
                    <span className="font-bold text-emerald-300">
                      ${reward.price}V
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Reward Detail Modal */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReward(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-gradient-to-br ${selectedReward.color} rounded-xl p-8 max-w-md w-full border-2 ${selectedReward.borderColor} shadow-2xl`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedReward(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-white" />
              </button>

              {/* Content */}
              <div className="text-center space-y-4">
                <motion.div 
                  className="text-7xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {selectedReward.emoji}
                </motion.div>

                <h2 className="text-3xl font-bold text-white">
                  {selectedReward.name}
                </h2>

                <p className="text-gray-200 text-lg">
                  {selectedReward.description}
                </p>

                <div className="space-y-2">
                  <div className="text-2xl font-bold text-emerald-300">
                    ${selectedReward.price}V
                  </div>
                  <p className="text-xs text-gray-300">
                    Unlock at {selectedReward.tier}% progress
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setSelectedReward(null)}
                    className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                  {isRewardUnlocked(selectedReward) && !isRewardClaimed(selectedReward.id) && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onClaimReward(selectedReward.id);
                        setSelectedReward(null);
                      }}
                      className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-emerald-500/50"
                    >
                      Claim Reward
                    </motion.button>
                  )}
                  {isRewardClaimed(selectedReward.id) && (
                    <div className="flex-1 px-4 py-3 bg-gray-700/50 text-white rounded-lg font-semibold text-center">
                      ✓ Claimed
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RewardStore;
