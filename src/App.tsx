import React, { useState } from 'react';
import BingoCard from './components/BingoCard';
import { Share2, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'investment' | 'life'>(
    'investment'
  );
  const [investmentStatus, setInvestmentStatus] = useState<
    ('none' | 'learning' | 'doing')[]
  >(new Array(25).fill('none'));
  const [lifeGoals, setLifeGoals] = useState<boolean[]>(
    new Array(25).fill(false)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const investmentItems = [
    '股票',
    '加密貨幣',
    '定期存款',
    '基金',
    '美股',
    '房地產',
    'ETF',
    '記帳',
    '期貨交易',
    '股票配息',
    '貸款',
    '儲蓄險',
    '理財App',
    '外幣',
    '信託',
    '退休基金',
    '資產配置',
    '黃金投資',
    '保險',
    '數位錢包',
    '當沖',
    '緊急預備金',
    'P2P借貸',
    '債券',
    '定額定投',
  ];

  const lifeItems = [
    '環遊世界',
    '收購一家企業',
    '買豪宅',
    '私人島嶼',
    '偶像見面會VVIP',
    '豪華遊艇',
    '私人飛機',
    '專屬管家',
    '實現被動收入',
    '私人主廚',
    '創建自己的品牌',
    '交到好友',
    '財富自由',
    '提早退休',
    '豪華派對',
    '夢想家庭',
    '持續健康與活力',
    '學新語言',
    '中樂透',
    '投資成功',
    '完成學業',
    '贏得比賽',
    '養寵物',
    '移民',
    '開設慈善基金',
  ];

  const handleShare = () => {
    const shareText =
      activeCard === 'investment'
        ? `我的投資理財賓果卡！\n想學習: ${investmentItems
            .filter((_, i) => investmentStatus[i] === 'learning')
            .join(', ')}\n正在進行: ${investmentItems
            .filter((_, i) => investmentStatus[i] === 'doing')
            .join(', ')}`
        : `我的頂峰人生賓果卡！\n我的目標: ${lifeItems
            .filter((_, i) => lifeGoals[i])
            .join(', ')}`;

    if (navigator.share) {
      navigator
        .share({
          title: '我的賓果卡',
          text: shareText,
          url: window.location.href,
        })
        .then(() => {
          console.log('分享成功');
        })
        .catch((error) => {
          console.log('分享失敗:', error);
        });
    } else {
      alert(
        '您的瀏覽器不支持分享功能，但您可以複製以下文字分享：\n\n' + shareText
      );
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleReset = () => {
    setInvestmentStatus(new Array(25).fill('none'));
    setLifeGoals(new Array(25).fill(false));
    setIsCompleted(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        activeCard === 'investment'
          ? 'bg-gradient-to-r from-blue-400 to-purple-500'
          : 'bg-gradient-to-r from-pink-400 to-yellow-400'
      }`}
    >
      <h1 className="text-4xl font-bold text-white mb-6">賓果卡遊戲</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeCard === 'investment'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setActiveCard('investment')}
          >
            投資理財
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeCard === 'life' ? 'bg-purple-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveCard('life')}
          >
            頂峰人生
          </button>
        </div>
        {activeCard === 'investment' ? (
          <BingoCard
            items={investmentItems}
            selectedCells={investmentStatus}
            onCellClick={(index) => {
              const newStatus = [...investmentStatus];
              newStatus[index] =
                newStatus[index] === 'none'
                  ? 'learning'
                  : newStatus[index] === 'learning'
                  ? 'doing'
                  : 'none';
              setInvestmentStatus(newStatus);
            }}
            cellColors={{
              learning: 'bg-blue-200',
              doing: 'bg-green-200',
              none: 'bg-gray-100',
            }}
            isCompleted={isCompleted}
          />
        ) : (
          <BingoCard
            items={lifeItems}
            selectedCells={lifeGoals}
            onCellClick={(index) => {
              const newGoals = [...lifeGoals];
              if (newGoals[index] || newGoals.filter(Boolean).length < 10) {
                newGoals[index] = !newGoals[index];
                setLifeGoals(newGoals);
              } else {
                alert('頂峰人生最多只能選擇10個目標！');
              }
            }}
            cellColors={{
              selected: 'bg-purple-200',
              unselected: 'bg-gray-100',
            }}
            isCompleted={isCompleted}
          />
        )}
        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
            onClick={handleShare}
          >
            <Share2 className="mr-2" size={20} />
            分享賓果卡
          </button>
          {isCompleted ? (
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded flex items-center"
              onClick={handleReset}
            >
              <RefreshCw className="mr-2" size={20} />
              重新開始
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleComplete}
            >
              完成
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
