import React, { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { CITY_DATA } from '../../../lib/cityData';

export interface Location {
  province: string;
  city: string;
  district: string;
}

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocation: Location;
  onConfirm: (loc: Location) => void;
  title?: string;
}

// Using expanded dataset from cityData.ts
const LOCATIONS = CITY_DATA;

export const LocationPicker: React.FC<LocationPickerProps> = ({
  isOpen,
  onClose,
  initialLocation,
  onConfirm,
  title = '选择地区'
}) => {
  const [province, setProvince] = useState(initialLocation.province);
  const [city, setCity] = useState(initialLocation.city);
  const [district, setDistrict] = useState(initialLocation.district);

  // Available lists based on selection
  const provinces = Object.keys(LOCATIONS);
  const cities = LOCATIONS[province] ? Object.keys(LOCATIONS[province]) : [];
  const districts = (LOCATIONS[province] && LOCATIONS[province][city]) ? LOCATIONS[province][city] : [];

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      if (province !== initialLocation.province) setProvince(initialLocation.province);
      if (city !== initialLocation.city) setCity(initialLocation.city);
      if (district !== initialLocation.district) setDistrict(initialLocation.district);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialLocation]);

  const handleProvinceChange = (newProvince: string) => {
    setProvince(newProvince);
    const newCities = LOCATIONS[newProvince] ? Object.keys(LOCATIONS[newProvince]) : [];
    const newCity = newCities[0] || '';
    setCity(newCity);
    const newDistricts = (LOCATIONS[newProvince] && LOCATIONS[newProvince][newCity]) ? LOCATIONS[newProvince][newCity] : [];
    setDistrict(newDistricts[0] || '');
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const newDistricts = (LOCATIONS[province] && LOCATIONS[province][newCity]) ? LOCATIONS[province][newCity] : [];
    setDistrict(newDistricts[0] || '');
  };

  const handleConfirm = () => {
    onConfirm({ province, city, district });
    onClose();
  };

  return (
    <BottomSheet 
      isOpen={isOpen} 
      onClose={onClose} 
      onConfirm={handleConfirm}
      title={title}
    >
      <div className="flex h-48 relative">
        <div className="absolute top-1/2 left-0 right-0 h-10 -mt-5 bg-white/10 rounded-lg pointer-events-none" />

        <StringPickerColumn 
          items={provinces} 
          value={province} 
          onChange={handleProvinceChange} 
        />
        <StringPickerColumn 
          items={cities} 
          value={city} 
          onChange={handleCityChange} 
        />
        <StringPickerColumn 
          items={districts} 
          value={district} 
          onChange={setDistrict} 
        />
      </div>
    </BottomSheet>
  );
};

const StringPickerColumn = ({ items, value, onChange }: { 
  items: string[], 
  value: string, 
  onChange: (val: string) => void 
}) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide snap-y snap-mandatory py-20 text-center relative">
      {items.map(item => (
        <div 
          key={item}
          onClick={() => onChange(item)}
          className={`
            h-10 leading-10 snap-center cursor-pointer transition-all truncate px-1
            ${item === value ? 'text-white font-bold text-base' : 'text-gray-600 text-sm'}
          `}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
