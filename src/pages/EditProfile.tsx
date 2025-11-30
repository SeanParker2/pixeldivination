import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ProfileField } from '../components/profile/ProfileField';
import { DatePicker } from '../components/profile/picker/DatePicker';
import { LocationPicker } from '../components/profile/picker/LocationPicker';
import { GenderPicker } from '../components/profile/picker/GenderPicker';
import { useUserStore } from '../stores/useUserStore';
import { formatDate } from '../lib/dateUtils';

export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUserStore();
  
  // Local state for pickers visibility
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBirthLocPicker, setShowBirthLocPicker] = useState(false);
  const [showCurrentLocPicker, setShowCurrentLocPicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  // Temporary state for nickname input
  const [nickname, setNickname] = useState(profile.nickname);
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    updateProfile({ nickname });
    setShowToast(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const formatLocation = (loc: { province: string; city: string; district: string }) => {
    return `${loc.province} ${loc.city} ${loc.district}`;
  };

  const genderLabel = {
    male: '男性',
    female: '女性',
    other: '保密'
  }[profile.gender];

  return (
    <MobileContainer hideHeader={false} className="bg-[#161622]">
      {showToast && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-lg z-[60] font-pixel border border-white/20 backdrop-blur-sm animate-fade-in">
          保存成功
        </div>
      )}
      <div className="pt-4 px-4 pb-24">
        <h1 className="text-xl text-white font-pixel mb-6 text-center">Magic Lightning</h1>

        <div className="flex flex-col">
          {/* Nickname (Input) */}
          <div className="flex items-center justify-between py-4 border-b border-white/5">
            <span className="text-gray-400 text-sm font-pixel">昵称</span>
            <input 
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="bg-transparent text-right text-white text-sm font-medium focus:outline-none"
              placeholder="请输入昵称"
            />
          </div>

          <ProfileField 
            label="性别" 
            value={genderLabel} 
            onClick={() => setShowGenderPicker(true)} 
          />

          <ProfileField 
            label="出生日期" 
            value={formatDate(profile.birthDate)} 
            onClick={() => setShowDatePicker(true)} 
          />

          <ProfileField 
            label="出生地" 
            value={formatLocation(profile.birthLocation)} 
            onClick={() => setShowBirthLocPicker(true)} 
          />

          <ProfileField 
            label="现居地" 
            value={formatLocation(profile.currentLocation)} 
            onClick={() => setShowCurrentLocPicker(true)} 
          />
        </div>

        {/* Save Button */}
        <div className="fixed bottom-8 left-4 right-4">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity font-pixel"
          >
            保存档案
          </button>
        </div>
      </div>

      {/* Pickers */}
      <DatePicker 
        isOpen={showDatePicker} 
        onClose={() => setShowDatePicker(false)} 
        initialDate={profile.birthDate}
        onSelect={(date) => updateProfile({ birthDate: date })}
      />

      <LocationPicker
        isOpen={showBirthLocPicker}
        onClose={() => setShowBirthLocPicker(false)}
        initialLocation={profile.birthLocation}
        onSelect={(loc) => updateProfile({ birthLocation: loc })}
        title="选择出生地"
      />

      <LocationPicker
        isOpen={showCurrentLocPicker}
        onClose={() => setShowCurrentLocPicker(false)}
        initialLocation={profile.currentLocation}
        onSelect={(loc) => updateProfile({ currentLocation: loc })}
        title="选择现居地"
      />

      <GenderPicker
        isOpen={showGenderPicker}
        onClose={() => setShowGenderPicker(false)}
        initialValue={profile.gender}
        onSelect={(val) => updateProfile({ gender: val })}
      />

    </MobileContainer>
  );
};

export default EditProfile;
