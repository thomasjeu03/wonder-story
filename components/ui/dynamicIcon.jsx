import React from 'react';
import * as Icons from 'lucide-react';

const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2 }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) {
        return null;
    }

    return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
};

export default DynamicIcon;