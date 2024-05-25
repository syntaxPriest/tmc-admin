import React from 'react';
import { TypographyStyle } from '../../styles/reusable/index';


interface TypoProps {
    text: string;
    fontSize?: string;
    fontWeight?: number;
    color?: string;
    lineHeight?: string;
    align?: string;
    margin?: string;
    top?: string;
    className?: string;
    mobileFontSize?: string;
}

const Typography = ({text, color, fontSize, fontWeight, lineHeight, align, top, margin, className, mobileFontSize} : TypoProps) => {
    return (
        <TypographyStyle
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            align={align}
            margin={margin}
            top={top}
            className={className}
            mobileFontSize={mobileFontSize}
        >
            {text}
        </TypographyStyle>
    )
}

export default Typography;