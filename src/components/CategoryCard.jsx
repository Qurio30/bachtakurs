import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all"
      onClick={() => onClick(category)}
    >
      <div className={`h-2 ${category.color}`}></div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{category.icon}</div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {category.name}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {category.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Play className="w-4 h-4" />
            <span>{category.videos.length} Videos</span>
          </div>
          
          <div className="text-sm text-primary-600 font-medium">
            Jetzt lernen →
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
