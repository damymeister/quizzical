import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLightMode, setDarkMode } from '../Redux/actions/themeActions';
export default function ToggleButton() {
  const themeMode = useSelector(state => state.mode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (themeMode === 'light') {
      dispatch(setDarkMode());
    } else {
      dispatch(setLightMode());
    }
  };
  return (
    <label className="toggle-button">
      <input
        type="checkbox"
        checked={themeMode === 'dark'}
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label>
  );
};


