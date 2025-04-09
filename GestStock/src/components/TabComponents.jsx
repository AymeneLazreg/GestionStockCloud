import React, { useState } from 'react';

// Composant Tab
export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      {React.Children.map(children, (child, index) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, {
            activeTab,
            handleTabClick,
          });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, {
            activeTab,
            index,
          });
        }
        return null;
      })}
    </div>
  );
};

// Composant TabsList
export const TabsList = ({ activeTab, handleTabClick, children }) => {
  return (
    <div className="tabs-list">
      {React.Children.map(children, (child, index) => {
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, {
            isActive: activeTab === index,
            onClick: () => handleTabClick(index),
          });
        }
        return null;
      })}
    </div>
  );
};

// Composant TabsTrigger (l'élément cliquable)
export const TabsTrigger = ({ children, onClick, isActive }) => {
  return (
    <div
      className={`tab-trigger ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Composant TabsContent (contenu de l'onglet)
export const TabsContent = ({ children, activeTab, index }) => {
  return activeTab === index ? <div className="tab-content">{children}</div> : null;
};
